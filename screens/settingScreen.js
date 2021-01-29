import * as React from "react";
import {TextInput,View,Text,TouchableOpacity,StyleSheet, Alert} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader"

export default class SettingScreen extends  React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
           
            firstName:"",
            lastName:"",
            address:"",
            phoneNo:"",
            docId:""
        }
    }
    getUserDetails(){
        db.collection("User").where("email","==",this.state.email).get().then(
            (snapShot)=>{
                snapShot.forEach((doc)=>{
                    var data=doc.data()
                    this.setState={
                        firstName:data.firstName,
                        lastName:data.lastName,
                        address:data.address,
                        phoneNo:data.phoneNo,
                        docId:doc.id
                    }
                })
            }
        )
    }
    componentDidMount(){
        this.getUserDetails();
    }
    updateUserDetail=()=>{
        db.collection("User").doc(this.state.docId).update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phoneNo:this.state.phoneNo
        })

    }
render(){
    return(
        <View>
            <MyHeader/>
            <Text>UpdateProfile</Text>
            <TextInput placeholder="firstName"
                                style={styles.inputBox}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            firstName:text
                                        })
                                    }
                                }
                                value={this.state.firstName}
                           />
                           <TextInput placeholder="lastName"
                                style={styles.inputBox}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            lastName:text
                                        })
                                    }
                                }
                                value={this.state.lastName}
                           />
                           <TextInput placeholder="address"
                            style={styles.inputBox}
                            onChangeText={
                                (text)=>{
                                    this.setState({
                                        address:text
                                    })
                                }
                            }
                           value={this.state.address}
                           />
                           <TextInput placeholder="phoneNo"
                            style={styles.inputBox}
                            onChangeText={
                                (text)=>{
                                    this.setState({
                                        phoneNo:text
                                    })
                                }
                            }
                            keyboardType={"numeric"}
                            value={this.state.phoneNo}
                           />
                             <TouchableOpacity style={styles.button} onPress={()=>{
                              this.updateUserDetail()
                          }}>
                                <Text style={styles.buttonText}>Update</Text>
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
        width:"80%",
       fontSize:20,
        borderWidth:2,
        padding:15,
        textAlign:"center",
        margin:15
    },button:{
        width:"50%",
       borderRadius:5,
       alignItems:"center",
       justifyContent:"center",
        borderWidth:2,
        padding:15,
        backgroundColor:"pink",
        margin:15
    },
    buttonText:{
        fontSize:20
    },
    heading:{
        fontSize:20,
        fontWeight:"bold"
    }
})