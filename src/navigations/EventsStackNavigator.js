import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import AddSearchOptionsHeaderRight from './../components/utils/AddSearchOptionsHeaderRight';
import {normalize} from './../components/utils/utils';
import EventsTopNavigator from './EventsTopNavigator';

export default EventsStackNavigator = createStackNavigator(
  {
    AllEvents: {
      screen: EventsTopNavigator,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      title: 'BCSE - Events',
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20)},
      headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
      headerRight: <AddSearchOptionsHeaderRight navigation={navigation} />,
    }),
  },
);
