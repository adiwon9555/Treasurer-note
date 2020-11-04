import React, {Component} from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

export default class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
    };
  }

  onError() {
    console.log('Popup Error');
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress,
      );
    }
  };

  render() {
    return (
      <View style={styles.popUpContainer}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={this.props.iconStyle} ref={this.onRef}>
            &#xf142;
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  onRef = (icon) => {
    if (!this.state.icon) {
      this.setState({icon});
    }
  };
}

const styles = StyleSheet.create({
  popUpContainer: {
    // width: 100,
  },
});
