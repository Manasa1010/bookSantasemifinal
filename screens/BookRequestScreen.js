import * as React from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet} from "react-native";
import firebase from "firebase";
import db from "../config"

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
      this.state={
          bookName:"",
          reasonToRequest:"",
          userId:firebase.auth().currentUser.email
      }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addRequest=(bookName,reasonToRequest)=>{
       var requestId=this.createUniqueId()
       db.collection("BookRequest").add({
           userId:this.state.userId,
           bookName:bookName,
           reasonToRequest:reasonToRequest,
           requestId:requestId
       })
       this.setState(
           {
               bookName:"",
               reasonToRequest:""

           }
       )
       return Alert.alert("RequestAddedSuccessfully")
    }
    render(){
        return(
            <View>
                <Text>Book Request Screen</Text>
                <KeyboardAvoidingView>
                <TextInput style={styles.inputBox}

                 value ={this.state.bookName}
                placeholder="bookName"
                onChangeText={
                    (text)=>{
                        this.setState({
                            bookName:text
                        })   
                }
                
            }
                />
                 <TextInput style={styles.inputBox}
                 value ={this.state.reasonToRequest}
                placeholder="reasonToRequest"
                onChangeText={
                    (text)=>{
                        this.setState({
                            reasonToRequest:text
                        })   
                }
            }
              />
              <TouchableOpacity style={styles.button} onPres={
                  ()=>{
                      this.addRequest(this.state.bookName,this.state.reasonToRequest)
                  }
              }><Text style={styles.buttonText}>I want to request</Text></TouchableOpacity>
              </KeyboardAvoidingView>
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