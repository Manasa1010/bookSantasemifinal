import * as React from "react";
import {View,TextInput,TouchableOpacity,Text,StyleSheet} from "react-native";

export default class BookDonateScreen extends React.Component{
   
        
    
    render(){
        return(
            <View>
                <Text>Book donate Screen</Text>
               
               

               
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