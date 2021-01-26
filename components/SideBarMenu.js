import * as React from "react";
import {StyleSheet,Text,View,TouchableOpacity} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";
 
export default class SideBarMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.6}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={{flex:0.4}}>
                    <TouchableOpacity style={styles.button} onPress={
                        ()=>{
                            this.props.navigation.navigate("WelcomeScreen");
                            firebase.auth().signOut()
                    }}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
var styles=StyleSheet.create({
    container:{
        flex:1,
       
    }
    
    ,button:{
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
