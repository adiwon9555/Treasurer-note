import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import fonts from '../../utils/fonts';
import {normalize} from '../utils/utils';
import {ACTION_TYPE} from './BackupUtils';

const renderIcon = (action) => {
  switch (action) {
    case ACTION_TYPE.BACK_UP:
      return <Text style={styles.actionIcon}>&#xf382;</Text>;
    case ACTION_TYPE.RESTORE:
      return <Text style={styles.actionIcon}>&#xf381;</Text>;
    case ACTION_TYPE.DELETE_FILE:
      return <Text style={styles.actionIcon}>&#xf1f8;</Text>;
    case ACTION_TYPE.SIGN_OUT:
      return <Text style={styles.actionIcon}>&#xf2f5;</Text>;
  }
};
export default function ActionItem({item, onActionPress}) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconView}>{renderIcon(item.action)}</View>
      <View style={styles.mainItemView}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionDescription}>{item.description}</Text>
        <TouchableOpacity
          onPress={() => onActionPress(item.action)}
          style={[styles.actionButton, {backgroundColor: item.buttonColor}]}>
          {/* // style={[styles.actionButton]}> */}
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: normalize(10),
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
  },
  actionIcon: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(23),
    paddingTop: normalize(2),
    opacity: 0.8,
    color: '#128C7E',
  },
  mainItemView: {
    flex: 5,
    justifyContent: 'flex-start',
  },
  actionTitle: {
    color: '#128C7E',
    opacity: 0.8,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  actionDescription: {
    color: 'gray',
    fontSize: normalize(15),
    paddingVertical: normalize(8),
  },
  actionButton: {
    // backgroundColor: '#25D366',
    // backgroundColor: '#128C7E',
    // opacity: 0.8,
    padding: normalize(8),
    width: normalize(90),
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
});
