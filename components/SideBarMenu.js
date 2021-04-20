import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import {Avatar} from "react-native-elements";
import * as ImagePicker from "expo-image-picker"
import db from "../config"

export default class SideBarMenu extends React.Component {
    constructor(){
        super();
        this.state={
            uri:"",
            name:"",
            userId:firebase.auth().currentUser.email,
            image:"#"
        }
    }
    selectPicture=async()=>{
        const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!cancelled){
            this.setState({
                image:uri
            })
            this.uploadImage(uri,this.state.userId)
        }
    }
    uploadImage=async(uri,imageName)=>{
        var responce=await fetch(uri)
        var blob=await responce.blob()
        var ref=firebase.storage().ref().child("user_profiles/"+imageName)
        return ref.put(blob).then((responce)=>{
            this.fetchImage(imageName)
        })
    }
    fetchImage=(imageName)=>{
        var ref=firebase.storage().ref().child("user_profiles/"+imageName) 
        ref.getDownloadURL().then((url)=>{
            this.setState({
                image:url
            })
        }).catch(error=>{
            this.setState({
                image:"#"
            })
        })
    }
    getUserProfile() {
        db.collection('User')
          .where('email', '==', this.state.userId)
          
          .onSnapshot((snapShot) => {
            snapShot.forEach((doc) => {
              this.setState({
               name:doc.data().firstName + " "+ doc.data().lastName
              });
            });
          });
      }
      componentDidMount(){
          this.fetchImage(this.state.userId)
          this.getUserProfile();
      }

  render() {
    return ( 
      <View style={styles.container}>
          <View>
              <Avatar
              
              rounded
              source={{
                  uri:this.state.image
              }}
              size="medium"
              onPress={()=>{
                  this.selectPicture();

              }}
              showEditButton
              containerStyle={styles.imageContainer}

              />
              <Text>{this.state.name}</Text>
          </View>
        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>
        <View style={{ flex: 0.4 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
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
