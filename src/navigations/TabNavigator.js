import React from 'react';
import {Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {normalize} from './../components/utils/utils';
import AllMembersNavigator from './AllMembersNavigator';
import ContributorStackNavigator from './ContributorStackNavigator';
import MonthlyContributionsNavigator from './MonthlyContributionsNavigator';
import EventsStackNavigator from './EventsStackNavigator';
import BillsNavigator from './BillsNavigator';
import fonts from '../utils/fonts';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Members"
      tabBarOptions={tabBarOptions}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        name="AllMembersNavigator"
        component={AllMembersNavigator}
        options={{
          tabBarLabel: 'Members',
          tabBarIcon: ({color}) => (
            <Text style={[{color}, styles.tabIconStyle]}>&#xf0c0;</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ContributorStackNavigator"
        component={ContributorStackNavigator}
        options={{
          tabBarLabel: 'Contributors',
          tabBarIcon: ({color}) => (
            <Text style={[styles.tabIconStyle, {color}]}>&#xf0d6;</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MonthlyContributionsNavigator"
        component={MonthlyContributionsNavigator}
        options={{
          tabBarLabel: 'Monthly',
          tabBarIcon: ({color}) => (
            <Text style={[styles.tabIconStyle, {color}]}>&#xf080;</Text>
          ),
        }}
      />
      <Tab.Screen
        name="EventsStackNavigator"
        component={EventsStackNavigator}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <Text style={[styles.tabIconStyle, {color}]}>&#xf133;</Text>
          ),
        }}
      />
      <Tab.Screen
        name="BillsNavigator"
        component={BillsNavigator}
        options={{
          tabBarLabel: 'Bills',
          tabBarIcon: ({color}) => (
            <Text style={[styles.tabIconStyle, {color}]}>&#xf09d;</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// const TabNavigato = createBottomTabNavigator(
//   {
//     Members: {
//       screen: AllMembersNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Members',
//         tabBarIcon: ({tintColor}) => (
//           <Text style={[styles.tabIconStyle, {color: tintColor}]}>
//             &#xf0c0;
//           </Text>
//         ),
//       },
//     },
//     Contributors: {
//       screen: ContributorStackNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Contributors',
// tabBarIcon: ({tintColor}) => (
//   <Text style={[styles.tabIconStyle, {color: tintColor}]}>
//     &#xf0d6;
//   </Text>
//         ),
//       },
//     },
//     Monthly: {
//       screen: MonthlyContributionsNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Monthly',
//         tabBarIcon: ({tintColor}) => (
//           <Text style={[styles.tabIconStyle, {color: tintColor}]}>
//             &#xf080;
//           </Text>
//         ),
//       },
//     },
//     Events: {
//       screen: EventsStackNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Events',
//         tabBarIcon: ({tintColor}) => (
//           <Text style={[styles.tabIconStyle, {color: tintColor}]}>
//             &#xf133;
//           </Text>
//         ),
//       },
//     },
//     Bills: {
//       screen: BillsNavigator,
//       navigationOptions: {
//         tabBarLabel: 'Bills',
//         tabBarIcon: ({tintColor}) => (
//           <Text style={[styles.tabIconStyle, {color: tintColor}]}>
//             &#xf09d;
//           </Text>
//         ),
//       },
//     },
//   },
//   {
//     initialRouteName: 'Members',
//     tabBarOptions: {
//       indicatorStyle: {
//         // borderBottomColor: 'orange',
//       },
//       // activeTintColor: '#e6632f',
//       // inactiveTintColor: '#9b9b9b',
//       labelStyle: {
//         fontSize: normalize(12),
//         // paddingTop: 10,
//         paddingBottom: normalize(5),
//       },
//       style: {
//         height: normalize(55),
//         backgroundColor: '#fff',
//         // paddingBottom: 4,
//         paddingTop: normalize(5),
//       },
//     },
//   },
// );

const tabBarOptions = {
  //   indicatorStyle: {
  //     // borderBottomColor: 'orange',
  //   },
  //   activeTintColor: '#e6632f',
  // inactiveTintColor: '#9b9b9b',
  labelStyle: {
    fontSize: normalize(12),
    // paddingTop: 10,
    paddingBottom: normalize(5),
  },
  style: {
    height: Platform.OS === 'ios' ? normalize(80) : normalize(55),
    backgroundColor: '#fff',
    // paddingBottom: 4,
    // paddingTop: normalize(5),
  },
};

const styles = {
  tabIconStyle: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(20),
    paddingTop: normalize(5),
  },
};
