
import * as  React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./screens/WelcomScreen";
import {createAppContainer,createSwitchNavigator } from "react-navigation";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator"

export default class App extends React.Component{
render() {
  return (
    <AppContainer/>
  );
}
}
var SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppDrawerNavigator:{screen:AppDrawerNavigator}
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
var AppContainer=createAppContainer(SwitchNavigator);











