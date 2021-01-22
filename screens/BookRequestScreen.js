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
    render(){
        return(
            <View>
                <Text>Book Request Screen</Text>
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