import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Card } from 'react-native-elements';
export default class ReceiverDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam('details')['userId'],
      requestId: this.props.navigation.getParam('details')['requestId'],
      bookName: this.props.navigation.getParam('details')['bookName'],
      reasonToRequest: this.props.navigation.getParam('details')[
        'reasonToRequest'
      ],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverRequestDocId: '',
    };
  }
  addNotification = () => {
    var message = this.state.userId + ' is interested to donate the book';
    db.collection('AllNotification').add({
      targetedUserId: this.state.receiverId,
      donorId: this.state.userId,
      requestId: this.state.requestId,
      bookName: this.state.bookName,
      notificationStatus: 'unread',
      message: message,
    });
  };
  getReceiverDetails() {
    db.collection('User')
      .where('email', '==', this.state.receiverId)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().firstName,
            receiverContact: doc.data().phoneNo,
            receiverAddress: doc.data().address,
          });
        });
      });
  }
  componentDidMount() {
    this.getReceiverDetails();
  }
  updateBookStatus = () => {
    db.collection('allDonations').add({
      bookName: this.state.bookName,
      requestId: this.state.requestId,
      requestedBy: this.state.receiverName,
      donorId: this.state.userId,
      requestStatus: 'donorInterested',
    });
  };
  render() {
    return (
      <View>
        <Text>ReceiverDetailScreen</Text>
        <Card>
          <Text>{this.state.receiverName}</Text>
        </Card>
        <Card>
          <Text>{this.state.receiverContact}</Text>
        </Card>
        <Card>
          <Text>{this.state.receiverAddress}</Text>
        </Card>
        <View>
          {this.state.receiverId !== this.state.userId ? (
            <TouchableOpacity
              onPress={() => {
                this.updateBookStatus();
                this.addNotification();
                this.props.navigation.navigate('MyDonateScreen');
              }}>
              <Text>I want to donate</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
