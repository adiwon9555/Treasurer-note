import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileList from './components/Profile/ProfileList';
import AddProfile from './components/Profile/AddProfile';
import ContributorList from './components/Contributor/ContributorList';
import MonthlyContributions from './components/MonthlyContributions/MonthlyContributions';
import Bills from './components/Bills/Bills';
import UpcomingEvents from './components/Events/UpcomingEvents';
import PassedEvents from './components/Events/PassedEvents';
import fonts from './utils/fonts';
import AllMembers from './components/AllMembers/AllMembers';
import DrawerIconHeaderLeft from './components/utils/DrawerIconHeaderLeft';
import AddSearchOptionsHeaderRight from './components/utils/AddSearchOptionsHeaderRight';
import AddMember from './components/AllMembers/AddMember';
import { normalize } from '../src/components/utils/utils'

const DrawerNavigator = initialComponent => createDrawerNavigator({
    Home: initialComponent,
    ProfileList: {
        screen: ProfileList
    },
    AddProfile: {
        screen: AddProfile
    }
})
const EventsTopNavigator = createMaterialTopTabNavigator({
    UpcomingEvents: {
        screen: UpcomingEvents
    },
    PassedEvents: {
        screen: PassedEvents
    }
})

const ContributorStackNavigator = createStackNavigator({
    ContributorList: {
        screen: ContributorList
    },

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: 'BCSE - Contributors',
            headerStyle: { height: normalize(55) },
            headerTitleStyle: { fontSize: normalize(20) },
            headerLeft: (
                <DrawerIconHeaderLeft navigation={navigation} />
            ),
        })
    }
)

const AllMembersNavigator = createStackNavigator({
    AllMembers: {
        screen: AllMembers
    },
    AddMember: {
        screen: AddMember
    }

},
    {
        initialRouteName: 'AllMembers',
        defaultNavigationOptions: ({ navigation }) => ({
            
        })
    }
)
const EventsStackNavigator = createStackNavigator({
    AllEvents: {
        screen: EventsTopNavigator
    },

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: 'BCSE - Events',
            headerStyle: { height: normalize(55) },
            headerTitleStyle: { fontSize: normalize(20) },
            headerLeft: (
                <DrawerIconHeaderLeft navigation={navigation} />
            ),
            headerRight: (
                <AddSearchOptionsHeaderRight navigation={navigation} />
            ),
        })
    }
)
const MonthlyContributionsNavigator = createStackNavigator({
    MonthlyContributions: {
        screen: MonthlyContributions
    },

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: 'BCSE - Statements',
            headerStyle: { height: normalize(55) },
            headerTitleStyle: { fontSize: normalize(20) },
            headerLeft: (
                <DrawerIconHeaderLeft navigation={navigation} />
            ),
        })
    }
)
const BillsNavigator = createStackNavigator({
    AllBills: {
        screen: Bills
    },

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            title: 'BCSE - Bills',
            headerStyle: { height: normalize(55) },
            headerTitleStyle: { fontSize: normalize(20) },
            headerLeft: (
                <DrawerIconHeaderLeft navigation={navigation}/>
            ),
        })
    }
)

const TabNavigator = createBottomTabNavigator({
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

    })



const AppContainer = createAppContainer(DrawerNavigator(TabNavigator));

export default class Routes extends Component {

    render() {
        return (
            <AppContainer></AppContainer>
        );
    }
}

const styles = {
    tabIconStyle: {
        fontFamily: fonts.solidIcons,
        fontSize: normalize(20),
    }
}