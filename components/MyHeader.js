import * as React from "react";
import {Header,Icon,Badge} from "react-native-elements"
import db from "../config"

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:""
        }
    }
    getNumberOfNtification=()=>{
        db.collection("AllNotification").where("notificationStatus","==","unread").onSnapshot((SnapShot)=>{
            var unreadNotification=SnapShot.docs.map((doc)=>doc.data())
            this.setState({
                value:unreadNotification.length
            })
        })
    }
    componentDidMount(){
        this.getNumberOfNotification();
    }
render(){
    return(
            <Header 
                leftComponent={<Icon name="bars" type="font-awesome" color="white" onPress={()=>{
                    props.navigation.toggleDrawer()
                }}/>}
                centerComponent={{text:"Book Santa",style:{color:"white",fontSize:20,fontWeight:"bold"}}}
                rightComponent={
                <View>
                <Icon name="bell" type="font-awesome" color="white" onPress={()=>{
                    props.navigation.navigate("notificationScreen")
                }}/>
                <Badge value={this.state.value} containerStyle={{position:"absolute",top:-4, right:-4}}/>
                </View>
                }
                
                backgroundColor="navy"
            />

    )
}
}
