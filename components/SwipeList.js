import * as React from 'react';
import { View, Text, Dimensions} from 'react-native';
import db from '../config';
import { Icon, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class SwipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotification: this.props.allNotification,
    };
  }
  updateMarkAsRead = (notification) => {
    db.collection('AllNotification').doc(notification.docId).update({
      "notificationStatus": 'read',
    });
  };
  renderItem = (data) => {
    return (
      <ListItem
        title={data.item.bookName}
        subtitle={data.item.message}
        bottomDivider
        titleStyle={{ color: 'blue', fontWeight: 'bold' }}
        leftElement={<Icon name="book" type="font-awesome" color="white" />}
      />
    );
  };
  renderHiddenItem = () => {
    <View>
      <View>
        <Text></Text>
      </View>
    </View>;
  };
  onSwipeValueChange = (swipeData) => {
    var allNotification = this.state.allNotification;
    const { key, value } = swipeData;

    if (value < Dimensions.get('window').width) {
      const newData = [...allNotification];
      const prevIndex = allNotification.findIndex((item) => item.key === key);
      this.updateMarkAsRead(allNotification[prevIndex]);
      newData.splice(prevIndex, 1);
      this.setState({
        allNotification: newData,
      });
    }
  };
  render() {
    return (
      <View>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotification}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
        />
      </View>
    );
  }
}
