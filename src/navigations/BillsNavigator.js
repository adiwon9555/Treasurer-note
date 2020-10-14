import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Bills from './../components/Bills/Bills';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import {normalize} from '../src/../components/utils/utils';

const BillsNavigator = createStackNavigator(
  {
    AllBills: {
      screen: Bills,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      title: 'BCSE - Bills',
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20)},
      headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
    }),
  },
);

export default BillsNavigator;
