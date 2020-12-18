import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileList from './../components/Profile/ProfileList';
import AddProfile from './../components/Profile/AddProfile';
import TabNavigator from './TabNavigator';
import BackupRestoreScreen from '../components/BackupRestore/BackupRestoreScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="TabNavigator">
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="ProfileList" component={ProfileList} />
      <Drawer.Screen name="AddProfile" component={AddProfile} />
      <Drawer.Screen name="BackupRestore" component={BackupRestoreScreen} />
    </Drawer.Navigator>
  );
}

// const DrawerNavigator = (initialComponent) =>
//   createDrawerNavigator({
//     Home: initialComponent,
//     ProfileList: {
//       screen: ProfileList,
//     },
//     AddProfile: {
//       screen: AddProfile,
//     },
//   });

// export default DrawerNavigator;
