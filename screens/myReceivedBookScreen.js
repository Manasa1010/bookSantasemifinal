import * as React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class MyReceivedBookScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      receivedBookList: [],
    };
    this.requestRef = null;
  }
  getBookList = () => {
    this.requestRef = db.collection('BookRequest').where("userId","==",this.state.userId)
    .where("bookStatus","==","received")
    .onSnapshot((snapShot) => {
      var receivedBookList = snapShot.docs.map((doc) => doc.data());
      this.setState({
        receivedBookList: receivedBookList,
      });
    });
  };
  
  componentDidMount() {
    this.getBookList();
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.bookName}
        subtitle={item.reasonToRequest}
        titleStyle={{ color: 'blue', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ReceiverDetailScreen', {
                details: item,
              });
            }}>
            <Text>Donate</Text>
          </TouchableOpacity>
        }
      />
    );
  };
  render() {
    return (
      <View>
        <MyHeader title="donate screen" navigation={this.props.navigation} />
        <View>
          {this.state.receivedBookList.length === 0 ? (
            <View>
              <Text>Loading.......</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.receivedBookList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
