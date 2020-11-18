import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

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
    this._menu.show();
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <Menu
          ref={this.setMenuRef}
          button={
            <Text onPress={this.showMenu} style={this.props.iconStyle}>
              &#xf142;
            </Text>
          }>
          {this.props.actions.map((item, index) => (
            <MenuItem
              onPress={() => {
                this.onItemPress(index);
              }}
              key={index}>
              {item}
            </MenuItem>
          ))}
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
});

export default MenuPopUpGeneral;
