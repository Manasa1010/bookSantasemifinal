import * as React from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet,FlatList} from "react-native";
import db from "../config";
import firebase from "firebase";
import {ListItem} from "react-native-elements";
import MyHeader from "../components/MyHeader";

export default class MyDonationScreen extends React.Component{
   constructor(){
       super();
       this.state={
           userId:firebase.auth().currentUser.email,
           allDonations:[]
       }
       this.requestRef=null;

   } 
   sendNotification=(bookDetails,requestStatus)=>{
      var requestId=bookDetails.requestId
      var donorId=bookDetails.donorId
      db.collection("AllNotification").where("requestId","==",requestId)
      .where("donorId","==",donorId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            var message=""
            if(requestStatus==="bookSent"){
                message=this.state.userId+"sent the Book"
            }else{
                message=this.state.userId+"has snown interest in sending the book"
            }
            db.collection("AllNotification").doc(doc.id).update({
                message:message,
                notificationStatus:"unread",
                date:firebase.firestore.FieldValue.serverTimestamp()
            })
        })  
      })
   }
   sendBook=(bookDetails)=>{
       if(bookDetails.requestStatus==="bookSent"){
        db.collection("AllNotification").doc(bookDetails.docId).update({
            requestStatus:"donorInterested"
        })
        this.sendNotification(bookDetails,"donorInterested")
       }else {
           db.collection("AllNotification").doc(bookDetails.docId).update({
        requestStatus:"bookSent"
    })
    this.sendNotification(bookDetails,"bookSent")
   }
   }
   getAllDonations=()=>{
      this.requestRef= db.collection("allDonations").where("donorId","==",this.state.userId).onSnapshot((snapShot)=>{
          var allDonations=snapShot.docs.map(doc=>doc.data())
          this.setState({
              allDonations:allDonations
          })
      })
      
   }  
  componentDidMount(){
        this.getAllDonations();
    }
    componentWillUnmount(){
        this.requestRef();
    }
    keyExtractor=(item,index)=>{
        index.toString();
    }
    renderItem=({item,i})=>{
       return(
           <ListItem 
           key={i}
           title={item.bookName}
           subtitle={item.reasonToRequest}
           titleStyle={{color:"blue",fontWeight:"bold"}}
           rightElement={
               <TouchableOpacity onPress={()=>{
                  this.sendBook(item)
                 //this.props.navigation.navigate("ReceiverDetailScreen",{"details":item})
               }}><Text>SendBook</Text></TouchableOpacity>
           }
           bottomDivider
           />
       )
    }
    render(){
        return(
            <View>
                <MyHeader/>
               <View>{
                this.state.allDonations.length===0?(
                    <View>
                        <Text>Loading.......</Text>
                    </View>
                ):(
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonations}
                    renderItem={this.renderItem}
                    />
                )

                    }
                </View>
               

               
            </View>

        )
    }
} 