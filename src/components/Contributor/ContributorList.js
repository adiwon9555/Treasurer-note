import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';

export default class ContributorList extends Component {
  //   static navigationOptions = ({navigationOptions, navigation}) => {
  //     return {
  //       headerRight: <AddSearchOptionsHeaderRight navigation={navigation} />,
  //     };
  //   };

  render() {
    return (
      <View>
        <Text>a</Text>
        <Button
          onPress={this.props.navigation.openDrawer}
          title="Open Drawer"
        />
      </View>
    );
  }
}
