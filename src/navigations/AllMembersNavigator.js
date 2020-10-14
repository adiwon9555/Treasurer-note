import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import AllMembers from './../components/AllMembers/AllMembers';
import AddMember from './../components/AllMembers/AddMember';
import AddSearchOptionsHeaderRight from '../components/utils/AddSearchOptionsHeaderRight';
import CameraScreen from '../components/utils/CameraScreen';
// import CameraScreen from './../components/utils/CameraScreen';

// const CameraScreen = () => {
//   return (
//     <View><Text>a</Text></View>
//   )
// }
// CameraScreen.navigationOptions = ({ navigationOptions, navigation }) => {
//   return ({
//       header: null,
//   })
// }
export default AllMembersNavigator = createStackNavigator(
  {
    AllMembers: {
      screen: AllMembers,
    },
    AddMember: {
      screen: AddMember,
    },
    CameraScreen: {
      screen: CameraScreen,
    },
  },
  {
    initialRouteName: 'AllMembers',
    defaultNavigationOptions: ({navigation}) => ({}),
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state ? !(navigation.state.index > 0) : false,
    }),
  },
);
