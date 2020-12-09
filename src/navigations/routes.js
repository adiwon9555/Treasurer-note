import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

export default class Routes extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}
