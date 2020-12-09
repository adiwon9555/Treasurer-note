import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MonthlyContributions from './../components/MonthlyContributions/MonthlyContributions';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import {normalize} from './../components/utils/utils';

const Stack = createStackNavigator();

export default function MonthlyContributionsNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="MonthlyContributions"
      setOptions={{
        title: 'BCSE - Statements',
        headerStyle: {height: normalize(55)},
        headerTitleStyle: {fontSize: normalize(20)},
        headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
      }}>
      <Stack.Screen
        name="MonthlyContributions"
        component={MonthlyContributions}
      />
    </Stack.Navigator>
  );
}

// const MonthlyContributionsNavigator = createStackNavigator(
//   {
//     MonthlyContributions: {
//       screen: MonthlyContributions,
//     },
//   },
//   {
//     defaultNavigationOptions: ({navigation}) => ({
//       title: 'BCSE - Statements',
//       headerStyle: {height: normalize(55)},
//       headerTitleStyle: {fontSize: normalize(20)},
//       headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
//     }),
//   },
// );

// export default MonthlyContributionsNavigator;
