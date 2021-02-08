import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfileList from './../components/Profile/ProfileList';
import AddProfile from './../components/Profile/AddProfile';
import TabNavigator from './TabNavigator';
import {Text, NativeModules} from 'react-native';
import BackupRestoreNavigator from './BackupRestoreNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen name="ProfileList" component={ProfileList} />
      <Drawer.Screen name="AddProfile" component={AddProfile} />
      <Drawer.Screen
        name="BackupRestoreNavigator"
        component={BackupRestoreNavigator}
        options={{
          title: 'Backup & Restore',
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Chats"
        onPress={() => {
          props.navigation.closeDrawer();
          NativeModules.ActivityStarter.navigateToChatActivity();
        }}
      />
    </DrawerContentScrollView>
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
