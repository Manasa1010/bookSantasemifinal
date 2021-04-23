import * as React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {RFValue} from "react-native-responsive-fontsize"

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNo: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }
  userSignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('BookDonatScreen');
      })
      .catch((error) => {
        return Alert.alert(error.message);
      });
  };
  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert('password Do Not Match');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('User').add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            isBookRequestActive: false,
          });
          return Alert.alert('User added successfully');
        })
        .catch((error) => {
          return Alert.alert(error.message);
        });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.isModalVisible}>
        <View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView>
              <Text>Registration</Text>
              <TextInput
                placeholder="firstName"
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
                value={this.state.firstName}
              />
              <TextInput
                placeholder="lastName"
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
                value={this.state.lastName}
              />
              <TextInput
                placeholder="address"
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
                value={this.state.address}
              />
              <TextInput
                placeholder="phoneNo"
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({
                    phoneNo: text,
                  });
                }}
                keyboardType={'numeric'}
                value={this.state.phoneNo}
              />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
                value={this.state.email}
              />
              <TextInput
                placeholder="PassWord"
                secureTextEntry={true}
                style={styles.inputBox}
                value={this.state.password}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                placeholder="confirmPassword"
                secureTextEntry={true}
                style={styles.inputBox}
                value={this.state.confirmPassword}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  });
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View>{this.showModal()}</View>
        <Text style={styles.heading}>BOOK SANTA</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
          value={this.state.email}
        />
        <TextInput
          placeholder="PassWord"
          secureTextEntry={true}
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.userSignIn(this.state.email, this.state.password);
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              isModalVisible: true,
            });
          }}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle:"italic",
    shadowColor:"#F875AA"
  },
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '80%',
    
    borderWidth: 2,
    padding: RFValue(5),
    textAlign: 'center',
    margin: 15,
    
    alignSelf:"center",
    
  },
  button: {
    width: '50%',
    alignItems:"center",
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: 'pink',
    margin: 15,
    alignSelf:"center",
    marginTop:20
  },
  buttonText: {
    fontSize: 15,
    textAlign:"center"
  },
});
