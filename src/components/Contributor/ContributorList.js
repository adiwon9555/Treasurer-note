import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class ContributorList extends Component {

    render() {
        return (
            <View>
                <Text>a</Text>
                <Button
                    onPress={this.props.navigation.openDrawer}
                    title='Open Drawer'
                />
            </View>
            
        );
    }
}

