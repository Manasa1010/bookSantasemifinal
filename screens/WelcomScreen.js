import * as React from "react";
import {TextInput,View,Text,TouchableOpacity,StyleSheet, Alert} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends  React.Component{
    constructor(){
        super();
        this.state={
            emailID:"",
            password:""
        }
    }
  userSignIn=(email,password)=>{
       firebase.auth().signInWithEmailAndPassword(email,password).then(
           ()=>{
               return Alert.alert("successfully logged in ")
           }
       )
       .catch(error=>{
           return Alert.alert(error.message)
       })
  }
    render(){
        return(
            <View style={styles.container}>
                <Text>BOOK SANTA</Text>
            <TextInput 
            placeholder="Email"
            keyboardType="email-address"
            style={styles.inputBox}
            onChangeText={
                (text)=>{
                    this.setState({
                        emailID:text
                    })
                }
            }value={this.state.emailID}
            />
            <TextInput 
            placeholder="PassWord"
            secureTextEntry={true}
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={
                (text)=>{
                    this.setState({
                        password:text
                    })
                }
            }/>
            <TouchableOpacity style={styles.button} onPress={()=>{
                this.userSignIn(this.state.emailID,this.state.password)
            }}>
                <Text>Login</Text>
                </TouchableOpacity>


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
        width:100,
        height:30,
        borderWidth:2,
        padding:5,
        textAlign:"center"
    },button:{
        width:100,
        height:30,
        borderWidth:2,
        padding:5,
        backgroundColor:"pink"
    }
})