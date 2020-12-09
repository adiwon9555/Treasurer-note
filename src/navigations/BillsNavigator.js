import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllBills from './../components/Bills/Bills';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import {normalize} from '../src/../components/utils/utils';

const Stack = createStackNavigator();

export default function BillsNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="AllBills"
      setOptions={{
        title: 'BCSE - Bills',
        headerStyle: {height: normalize(55)},
        headerTitleStyle: {fontSize: normalize(20)},
        headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
      }}>
      <Stack.Screen name="AllBills" component={AllBills} />
    </Stack.Navigator>
  );
}

// const BillsNavigator = createStackNavigator(
//   {
//     AllBills: {
//       screen: Bills,
//     },
//   },
//   {
//     defaultNavigationOptions: ({navigation}) => ({
//       title: 'BCSE - Bills',
//       headerStyle: {height: normalize(55)},
//       headerTitleStyle: {fontSize: normalize(20)},
//       headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
//     }),
//   },
// );

// export default BillsNavigator;
