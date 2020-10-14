import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ContributorList from './../components/Contributor/ContributorList';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import {normalize} from '../components/utils/utils';

const ContributorStackNavigator = createStackNavigator(
  {
    ContributorList: {
      screen: ContributorList,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      title: 'BCSE - Contributors',
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20)},
      headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
    }),
  },
);

export default ContributorList;
