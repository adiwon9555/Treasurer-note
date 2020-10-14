import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import fonts from '../../utils/fonts';
import {normalize} from '../utils/utils';

export default (MarkedItemActionBox = props => {
  const {
    cancelSelection,
    markAll,
    deleteMember,
    onMailPress,
    markAllEgf,
  } = props;
  const {
    actionitemContainer,
    actionButtonContainer,
    actionButtonIcon,
    actionButtonLabel,
  } = styles;

  //   const onWatsAppPress = () => {
  //     if (member.phone)
  //       Linking.openURL(`https://api.whatsapp.com/send?phone=${member.phone}`);
  //   };

  //   const onMailPress = () => {
  //     if (member.email) Linking.openURL(`mailto:${member.email}`);
  //   };

  return (
    <View style={actionitemContainer}>
      <TouchableOpacity
        onPress={markAll}
        // activeOpacity={member.phone ? 0.2 : 1}
        style={actionButtonContainer}>
        <Text
          style={[
            {
              fontFamily: fonts.solidIcons,
            },
            actionButtonIcon,
          ]}>
          &#xf00c;
        </Text>
        <Text style={[actionButtonLabel]}>Mark all</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={markAllEgf}
        // activeOpacity={member.phone ? 0.2 : 1}
        style={actionButtonContainer}>
        <Text
          style={[
            {
              fontFamily: fonts.solidIcons,
            },
            actionButtonIcon,
          ]}>
          &#xf500;
        </Text>
        <Text style={[actionButtonLabel]}>All egf</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onMailPress}
        // activeOpacity={member.email ? 0.2 : 1}
        style={actionButtonContainer}>
        <Text
          style={[
            actionButtonIcon,
            {
              fontFamily: fonts.regularIons,
              color: '#e32245',
            },
          ]}>
          &#xf0e0;
        </Text>
        <Text style={[actionButtonLabel]}>Mail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionButtonContainer} onPress={deleteMember}>
        <Text style={[{fontFamily: fonts.regularIons}, actionButtonIcon]}>
          &#xf2ed;
        </Text>
        <Text style={actionButtonLabel}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionButtonContainer} onPress={cancelSelection}>
        <Text style={[{fontFamily: fonts.solidIcons}, actionButtonIcon]}>
          &#xf00d;
        </Text>
        <Text style={actionButtonLabel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = {
  actionitemContainer: {
    flexDirection: 'row',
    padding: normalize(5),
    borderWidth: normalize(0.7),
    borderColor: '#DDD',
    justifyContent: 'space-evenly',
    backgroundColor: '#Dee',
  },
  actionButtonContainer: {
    alignItem: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    textAlign: 'center',
    fontSize: normalize(28),
    // color: '#7e807e',
    // color: 'black'
    color: '#444d46',
  },
  actionButtonLabel: {
    textAlign: 'center',
    color: '#444d46',
    // color: 'black',
  },
};
