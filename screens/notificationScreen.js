import * as React from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet,FlatList} from "react-native";
import db from "../config";
import firebase from "firebase";
import {ListItem} from "react-native-elements";
import MyHeader from "../components/MyHeader";

export default class NotificationScreen extends React.Component{
   constructor(){
       super();
       this.state={
           userId:firebase.auth().currentUser.email,
          notificationList:[]
       }
       this.requestRef=null;

   } 
   getNotificationList=()=>{
      this.requestRef= db.collection("AllNotification").onSnapshot((snapShot)=>{
          var notificationList=snapShot.docs.map(doc=>doc.data())
          this.setState({
             notificationList:notificationList
          })
      })
      
   }  
    componentDidMount(){
        this.getNotificationList();
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
           subtitle={item.message}
           titleStyle={{color:"blue",fontWeight:"bold"}}
           rightElement={
               <TouchableOpacity onPress={()=>{
                
               }}><Text>Donate</Text></TouchableOpacity>
           }
           />
       )
    }
    render(){
        return(
            <View>
                <MyHeader title="Notification List" navigation={this.props.navigation}/>
               <View>{
                this.state.notificationList.length===0?(
                    <View>
                        <Text>Loading.......</Text>
                    </View>
                ):(
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.state.notificationList}
                    renderItem={this.renderItem}
                    />
                )

                    }
                </View>
               

               
            </View>

        )
    }
} 
