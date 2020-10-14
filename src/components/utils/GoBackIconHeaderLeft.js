import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import fonts from '../../utils/fonts';
import {normalize} from '../utils/utils';

export const ICONSTYLE = {
  CROSS: 'CROSS',
  ARROW: 'ARROW',
};

const renderIcon = (iconStyle, iconExtraStyles) => {
  switch (iconStyle) {
    case ICONSTYLE.CROSS:
      return (
        <Text style={[styles.drawerBarIconStyle, iconExtraStyles]}>
          &#xf00d;
        </Text>
      );
    default:
      return (
        <Text style={[styles.drawerBarIconStyle, iconExtraStyles]}>
          &#xf060;
        </Text>
      );
  }
};
export default (GoBackIconHeaderLeft = ({
  navigation,
  iconStyle,
  onPress,
  iconExtraStyles,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={
        onPress
          ? onPress
          : () => {
              navigation.goBack();
            }
      }
      style={[styles.iconContainer, containerStyle]}>
      {renderIcon(iconStyle, iconExtraStyles)}
    </TouchableOpacity>
  );
});

const styles = {
  iconContainer: {
    paddingLeft: normalize(10),
  },
  drawerBarIconStyle: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(23),
    paddingLeft: normalize(10),
    paddingTop: normalize(2),
  },
};
