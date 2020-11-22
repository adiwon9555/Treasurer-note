import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Menu, {MenuItem} from 'react-native-material-menu';
import {POP_SOURCE} from './utils';

class MenuPopUpGeneral extends React.PureComponent {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  onItemPress = (index) => {
    this._menu.hide();
    this.props.onPress(index);
  };

  showMenu = () => {
    console.log('@aditya showMenu');
    this._menu.show();
  };

  renderMenuItems = (source) => {
    switch (source) {
      case POP_SOURCE.MORE_MENU_HEADER:
        return this.props.actions.map((item, index) => (
          <MenuItem
            onPress={() => {
              this.onItemPress(index);
            }}
            key={index}>
            {item}
          </MenuItem>
        ));
      case POP_SOURCE.PHONE_CODE:
        return this.props.actions.map((item, index) => (
          <MenuItem
            onPress={() => {
              this.onItemPress(item.value);
            }}
            key={index}>
            {item.value}
          </MenuItem>
        ));
    }
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <Menu ref={this.setMenuRef} button={this.props.render(this.showMenu)}>
          <ScrollView style={styles.scrollViewStyle}>
            {this.renderMenuItems(this.props.source)}
          </ScrollView>
          {/* <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem> */}
        </Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  scrollViewStyle: {maxHeight: 250},
});

export default MenuPopUpGeneral;
