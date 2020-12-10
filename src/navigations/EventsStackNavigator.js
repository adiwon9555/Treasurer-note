import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
// import AddSearchOptionsHeaderRight from './../components/utils/AddSearchOptionsHeaderRight';
import {normalize} from './../components/utils/utils';
import EventsTopNavigator from './EventsTopNavigator';

const Stack = createStackNavigator();

export default function EventsStackNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="EventsTopNavigator"
      screenOptions={{
        title: 'BCSE - Events',
        headerStyle: {height: normalize(55)},
        headerTitleStyle: {fontSize: normalize(20)},
        headerLeft: () => <DrawerIconHeaderLeft navigation={navigation} />,
      }}>
      <Stack.Screen name="EventsTopNavigator" component={EventsTopNavigator} />
    </Stack.Navigator>
  );
}

// const EventsStackNavigator = createStackNavigator(
//   {
//     AllEvents: {
//       screen: EventsTopNavigator,
//     },
//   },
//   {
//     defaultNavigationOptions: ({navigation}) => ({
//       title: 'BCSE - Events',
//       headerStyle: {height: normalize(55)},
//       headerTitleStyle: {fontSize: normalize(20)},
//       headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
//       headerRight: <AddSearchOptionsHeaderRight navigation={navigation} />,
//     }),
//   },
// );

// export default EventsStackNavigator;
