import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      reasonToRequest: '',
      userId: firebase.auth().currentUser.email,
      isBookRequestActive:null,
      userDocId:"",
      bookStatus:"",
      requestId:"",
      docId:""
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (bookName, reasonToRequest) => {
    var requestId = this.createUniqueId();
    db.collection('BookRequest').add({
      userId: this.state.userId,
      bookName: bookName,
      reasonToRequest: reasonToRequest,
      requestId: requestId,
      bookStatus:"requested",
      date:firebase.firestore.FieldValue.serverTimestamp()
    });
   
    await this.getBookRequest()
    db.collection("User").where("email","==",this.state.userId).get().then(snapShot=>{
        snapShot.forEach((doc)=>{
            db.collection("User").doc(doc.id).update({
                isBookRequestActive:true
            })
        })
    })
    this.setState({
      bookName: '',
      reasonToRequest: '',
      requestId:requestId
    });
    return Alert.alert('RequestAddedSuccessfully');
    
  };
  updateBookRequestStatus=()=>{
    db.collection("BookRequest").doc(this.state.docId).update({
      bookStatus:"received"

    })
    db.collection("User").doc(this.state.userId).update({
      isBookRequestActive:false
    })
  }

  getBookRequestIsActive=()=>{
      db.collection("User").where("email","==",this.state.userId).onSnapshot(snapShot=>{
          snapShot.forEach((doc)=>{
              this.setState({
                   isBookRequestActive:doc.data().isBookRequestActive,
                   userDocId:doc.id
              })
          })
      })
  }
receivedBooks=(bookName)=>{
  db.doc.collection("ReceivedBooks").add({
      userId:this.state.userId,
      bookName:bookName,
      requestId:this.state.requestId,
      bookStatus:"received"
  })
}
  getBookRequest=()=>{
      db.collection("BookRequest").where("userId","==",this.state.userId).get().then(snapShot=>{
          snapShot.forEach((doc)=>{
              if(doc.data().bookStatus!=="received"){
                  this.setState({
                      requestId:doc.data().requestId,
                      bookName:doc.data().bookName,
                      bookStatus:doc.data().bookStatus,
                      docId:doc.id
                  })
              }
          })
      })
  }
  componentDidMount(){
      this.getBookRequestIsActive();
      this.getBookRequest();


  }
  sendNotification=()=>{
   
    db.collection("User").where("email","==",this.state.userId).get(),then((snapshot)=>{
        snapshot.forEach((doc)=>{
            var firstName=doc.data().firstName
            var lastName=doc.data().lastName
            db.collection("AllNotification").where("requestId","==",this,state.requestId).get().then(snapshot=>{
                snapshot.forEach((doc)=>{
                    var donorId=doc.data().donorId
                    var bookName=doc.data().bookName
                    db.collection("AllNotification").add({
                        targetedUserId:donorId,
                        message:firstName+" "+lastName+" received the book",
                        notificationStatus:"unread",
                        bookName:bookName
                    })
                })
            })
        })
    })
   
 }
  render() {
      if(this.state.isBookRequestActive==true){
        return(
            <View>
                <Text>book name:{this.state.bookName}</Text>
                <Text>book status:{this.state.bookStatus}</Text>
                <TouchableOpacity
            style={styles.button}
            onPress={() => {
                this.sendNotification();
                this.updateBookRequestStatus();
              this.receivedBooks(this.state.bookName)
            }}>
            <Text style={styles.buttonText}>I have Received the book</Text>
          </TouchableOpacity>
            </View>
        )
      }else{
    return (
      <View>
        <MyHeader
          title="Book Request Screen"
          navigation={this.props.navigation}
        />
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputBox}
            value={this.state.bookName}
            placeholder="bookName"
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            value={this.state.reasonToRequest}
            placeholder="reasonToRequest"
            onChangeText={(text) => {
              this.setState({
                reasonToRequest: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}>
            <Text style={styles.buttonText}>I want to request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '80%',
    height: 100,
    borderWidth: 2,
    padding: 15,
    textAlign: 'center',
    margin: 15,
  },
  button: {
    width: '30%',
    height: 80,
    borderWidth: 2,
    padding: 15,
    backgroundColor: 'pink',
    margin: 15,
  },
  buttonText: {
    fontSize: 25,
  },
});
