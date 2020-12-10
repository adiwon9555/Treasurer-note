import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContributorList from './../components/Contributor/ContributorList';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import {normalize} from '../components/utils/utils';

const Stack = createStackNavigator();

export default function ContributorStackNavigator({navigation, route}) {
  navigation.setOptions({
    tabBarVisible: route.state ? !(route.state.index > 0) : null,
  });
  return (
    <Stack.Navigator
      initialRouteName="ContributorList"
      screenOptions={{
        title: 'BCSE - Contributors',
        headerStyle: {height: normalize(55)},
        headerTitleStyle: {fontSize: normalize(20)},
        headerLeft: () => <DrawerIconHeaderLeft navigation={navigation} />,
      }}>
      <Stack.Screen name="ContributorList" component={ContributorList} />
    </Stack.Navigator>
  );
}

// const ContributorStackNavigator = createStackNavigator(
//   {
//     ContributorList: {
//       screen: ContributorList,
//     },
//   },
//   {
//     defaultNavigationOptions: ({navigation}) => ({
//       title: 'BCSE - Contributors',
//       headerStyle: {height: normalize(55)},
//       headerTitleStyle: {fontSize: normalize(20)},
//       headerLeft: <DrawerIconHeaderLeft navigation={navigation} />,
//     }),
//   },
// );

// export default ContributorStackNavigator;
