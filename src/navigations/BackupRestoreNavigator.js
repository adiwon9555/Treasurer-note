import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GoBackIconHeaderLeft, {
  ICONSTYLE,
} from './../components/utils/GoBackIconHeaderLeft';
import {normalize} from '../src/../components/utils/utils';
import BackupRestoreScreen from '../components/BackupRestore/BackupRestoreScreen';

const Stack = createStackNavigator();

export default function BackupRestoreNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="AllBills"
      screenOptions={{
        title: 'Backup & Restore',
        headerStyle: {height: normalize(55)},
        headerTitleStyle: {fontSize: normalize(20)},
        headerLeft: () => (
          <GoBackIconHeaderLeft
            navigation={navigation}
            iconStyle={ICONSTYLE.ARROW}
          />
        ),
      }}>
      <Stack.Screen
        name="BackupRestoreScreen"
        component={BackupRestoreScreen}
      />
    </Stack.Navigator>
  );
}
