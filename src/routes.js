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
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                    style={{ paddingLeft: 10 }}
                >
                    <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, paddingLeft: 10 }}>&#xf0c9;</Text>
                </TouchableOpacity>
            ),
        })
    }
)

const AllMembersNavigator = createStackNavigator({
    AllMembers: {
        screen: AllMembers
    },

},
    {
        initialRouteName: 'AllMembers',
        defaultNavigationOptions: ({ navigation }) => ({
            title: 'BCSE - All Members',
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                    style={{ paddingLeft: 10 }}
                >
                    <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, paddingLeft: 10 }}>&#xf0c9;</Text>
                </TouchableOpacity>
            ),
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
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                    style={{ paddingLeft: 10 }}
                >
                    <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, paddingLeft: 10 }}>&#xf0c9;</Text>
                </TouchableOpacity>
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
            title: 'BCSE - Monthly Contributions',
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                    style={{ paddingLeft: 10 }}
                >
                    <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, paddingLeft: 10 }}>&#xf0c9;</Text>
                </TouchableOpacity>
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
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                    style={{ paddingLeft: 10 }}
                >
                    <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, paddingLeft: 10 }}>&#xf0c9;</Text>
                </TouchableOpacity>
            ),
        })
    }
)

const TabNavigator = createBottomTabNavigator({
    Members: {
        screen: AllMembersNavigator,
        navigationOptions: {
            tabBarLabel: 'Members',
            tabBarIcon: ({ tintColor }) => <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, color: tintColor }}>&#xf0c0;</Text>,
        }
    },
    Contributors: {
        screen: ContributorStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Contributors',
            tabBarIcon: ({ tintColor }) => <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, color: tintColor }}>&#xf0d6;</Text>,
        }
    },
    Monthly: {
        screen: MonthlyContributionsNavigator,
        navigationOptions: {
            tabBarLabel: 'Monthly',
            tabBarIcon: ({ tintColor }) => <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, color: tintColor }}>&#xf080;</Text>,
        }
    },
    Events: {
        screen: EventsStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor }) => <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, color: tintColor }}>&#xf133;</Text>,
        }
    },
    Bills: {
        screen: BillsNavigator,
        navigationOptions: {
            tabBarLabel: 'Bills',
            tabBarIcon: ({ tintColor }) => <Text style={{ fontFamily: fonts.solidIcons, fontSize: 20, color: tintColor }}>&#xf09d;</Text>,
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
                fontSize: 12,
                // paddingTop: 10,
                paddingBottom: 2,
            },
            style: {
                // height: 55,
                backgroundColor: '#fff',
                // paddingBottom: 4,
                // paddingTop: 15,
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