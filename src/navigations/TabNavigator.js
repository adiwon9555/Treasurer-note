import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { normalize } from './../components/utils/utils'
import AllMembersNavigator from './AllMembersNavigator';
import ContributorStackNavigator from './ContributorStackNavigator';
import MonthlyContributionsNavigator from './MonthlyContributionsNavigator';
import EventsStackNavigator from './EventsStackNavigator';
import BillsNavigator from './BillsNavigator';
import fonts from '../utils/fonts';

export default TabNavigator = createBottomTabNavigator({
  Members: {
      screen: AllMembersNavigator,
      navigationOptions: {
          tabBarLabel: 'Members',
          tabBarIcon: ({ tintColor }) => <Text style={[styles.tabIconStyle, { color: tintColor }]}>&#xf0c0;</Text>,
      }
  },
  Contributors: {
      screen: ContributorStackNavigator,
      navigationOptions: {
          tabBarLabel: 'Contributors',
          tabBarIcon: ({ tintColor }) => <Text style={[styles.tabIconStyle, { color: tintColor }]}>&#xf0d6;</Text>,
      }
  },
  Monthly: {
      screen: MonthlyContributionsNavigator,
      navigationOptions: {
          tabBarLabel: 'Monthly',
          tabBarIcon: ({ tintColor }) => <Text style={[styles.tabIconStyle, { color: tintColor }]}>&#xf080;</Text>,
      }
  },
  Events: {
      screen: EventsStackNavigator,
      navigationOptions: {
          tabBarLabel: 'Events',
          tabBarIcon: ({ tintColor }) => <Text style={[styles.tabIconStyle, { color: tintColor }]}>&#xf133;</Text>,
      }
  },
  Bills: {
      screen: BillsNavigator,
      navigationOptions: {
          tabBarLabel: 'Bills',
          tabBarIcon: ({ tintColor }) => <Text style={[styles.tabIconStyle, { color: tintColor }]}>&#xf09d;</Text>,
      }
  }
}, {
      initialRouteName: 'Members',
      tabBarOptions: {
          indicatorStyle: {
              // borderBottomColor: 'orange',
          },
          // activeTintColor: '#e6632f',
          // inactiveTintColor: '#9b9b9b',
          labelStyle: {
              fontSize: normalize(12),
              // paddingTop: 10,
              paddingBottom: normalize(5),
          },
          style: {
              height: normalize(55),
              backgroundColor: '#fff',
              // paddingBottom: 4,
              paddingTop: normalize(5),
          },
      }

  }
)

const styles = {
  tabIconStyle: {
      fontFamily: fonts.solidIcons,
      fontSize: normalize(20),
  }
}
