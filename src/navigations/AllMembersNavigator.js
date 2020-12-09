import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AllMembers from './../components/AllMembers/AllMembers';
import AddMember from './../components/AllMembers/AddMember';
import CameraScreen from '../components/utils/CameraScreen';
import ImportContact from '../components/AllMembers/ImportContact';

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

const Stack = createStackNavigator();

export const getTabBarVisible = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'AllMembers';
  if (routeName === 'AllMembers') {
    return true;
  } else {
    return false;
  }
};

export default function AllMembersNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: getTabBarVisible(route),
  });
  return (
    <Stack.Navigator initialRouteName="AllMembers">
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="AllMembers" component={AllMembers} />
      <Stack.Screen name="AddMember" component={AddMember} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ImportContact" component={ImportContact} />
    </Stack.Navigator>
  );
}

// const AllMembersNavigator = createStackNavigator(
//   {
//     AllMembers: {
//       screen: AllMembers,
//     },
//     AddMember: {
//       screen: AddMember,
//     },
//     CameraScreen: {
//       screen: CameraScreen,
//     },
//     ImportContact: {
//       screen: ImportContact,
//     },
//   },
//   {
//     initialRouteName: 'AllMembers',
//     defaultNavigationOptions: ({navigation}) => ({}),
//     navigationOptions: ({navigation}) => ({
//       tabBarVisible: navigation.state ? !(navigation.state.index > 0) : false,
//     }),
//   },
// );

// export default AllMembersNavigator;
