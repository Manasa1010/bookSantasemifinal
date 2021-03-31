import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import  BookDonateScreen  from '../screens/BookDonateScreen';
import  ReceiverDetailScreen  from '../screens/receiverDetailscreen';

export const AppStackNavigator = createStackNavigator(
  {
    BookDonateScreen: {
      screen: BookDonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetailScreen: { screen: ReceiverDetailScreen },
  },
  { initialRouteName: 'BookDonateScreen' }
);
