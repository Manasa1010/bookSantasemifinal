import * as React from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet,FlatList} from "react-native";
import db from "../config";
import firebase from "firebase";
import {ListItem} from "react-native-elements";
import MyHeader from "../components/MyHeader";

export default class BookDonateScreen extends React.Component{
   constructor(){
       super();
       this.state={
           userId:firebase.auth().currentUser.email,
           requestedBookList:[]
       }
       this.requestRef=null;

   } 
   getBookList=()=>{
      this.requestRef= db.collection("BookRequest").onSnapshot((snapShot)=>{
          var requestedBookList=snapShot.docs.map(doc=>doc.data())
          this.setState({
              requestedBookList:requestedBookList
          })
      })
      
   }  
    componentDidMount(){
        this.getBookList();
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
               <TouchableOpacity><Text>Donate</Text></TouchableOpacity>
           }
           />
       )
    }
    render(){
        return(
            <View>
                <MyHeader/>
               <View>{
                this.state.requestedBookList.length===0?(
                    <View>
                        <Text>Loading.......</Text>
                    </View>
                ):(
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedBookList}
                    renderItem={this.renderItem}
                    />
                )

                    }
                </View>
               

               
            </View>

        )
    }
} 
var styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    inputBox:{
        width:"80%",
        height:100,
        borderWidth:2,
        padding:15,
        textAlign:"center",
        margin:15
    },button:{
        width:"30%",
        height:80,
        borderWidth:2,
        padding:15,
        backgroundColor:"pink",
        margin:15
    },
    buttonText:{
        fontSize:25
    }
})