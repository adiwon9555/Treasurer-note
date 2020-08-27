import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import fonts from './utils/fonts';
import { normalize } from '../src/components/utils/utils'
import DrawerNavigator from './navigations/DrawerNavigator';
import TabNavigator from './navigations/TabNavigator';


const AppContainer = createAppContainer(DrawerNavigator(TabNavigator));

export default class Routes extends Component {
    componentDidMount(){
        console.disableYellowBox = true;
    }
    render() {
        return (
            <AppContainer></AppContainer>
        );
    }
}

