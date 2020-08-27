import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MonthlyContributions from './../components/MonthlyContributions/MonthlyContributions';
import DrawerIconHeaderLeft from './../components/utils/DrawerIconHeaderLeft';
import { normalize } from './../components/utils/utils'

export default MonthlyContributionsNavigator = createStackNavigator({
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