import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
export default class MonthlyContributions extends Component {

    static navigationOptions = ({ navigationOptions, navigation }) => {
        return ({
            headerRight: (
                <AddSearchOptionsHeaderRight navigation={navigation} />
            )
        })
    }

    render() {
        return (
            <View><Text>a</Text></View>
        );
    }
}