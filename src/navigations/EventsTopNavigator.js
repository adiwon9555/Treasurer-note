import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UpcomingEvents from './../components/Events/UpcomingEvents';
import PassedEvents from './../components/Events/PassedEvents';

const TopBar = createMaterialTopTabNavigator();

export default function EventsTopNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <TopBar.Navigator>
      <TopBar.Screen name="UpcomingEvents" component={UpcomingEvents} />
      <TopBar.Screen name="PassedEvents" component={PassedEvents} />
    </TopBar.Navigator>
  );
}

// const EventsTopNavigator = createMaterialTopTabNavigator({
//   UpcomingEvents: {
//     screen: UpcomingEvents,
//   },
//   PassedEvents: {
//     screen: PassedEvents,
//   },
// });

// export default EventsTopNavigator;
