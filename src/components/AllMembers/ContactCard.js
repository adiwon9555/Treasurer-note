import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import fonts from '../../utils/fonts';
import {isEmpty, normalize} from '../utils/utils';

const ContactCard = React.memo((props) => {
  const {setSelected, markItem, markedItems, contact} = props;
  const profileIcon = {uri: contact.thumbnailPath};
  const marked = markedItems.includes(contact.recordID);
  return (
    <TouchableHighlight
      style={marked ? styles.memberMarked : styles.cardContainerClickable}
      underlayColor={'#DDDDDD'}
      onPress={() =>
        markedItems.length > 0
          ? markItem(contact.recordID)
          : setSelected(contact)
      }
      onLongPress={() => markItem(contact.recordID)}>
      <View style={styles.cardContainer}>
        <View style={styles.userIconContainer}>
          <ImageBackground style={styles.userImage} source={profileIcon}>
            {(!contact.hasThumbnail || isEmpty(profileIcon.uri)) && (
              <Text style={[styles.userIcon, {}]}>&#xf007;</Text>
            )}
          </ImageBackground>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{contact.displayName}</Text>
          <Text style={styles.labelPhone}>
            {contact.phoneNumbers[0]?.number}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  memberMarked: {
    backgroundColor: '#DDD',
    padding: normalize(10),
    borderRadius: normalize(5),
  },
  cardContainerClickable: {
    padding: normalize(10),
    borderRadius: normalize(5),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userIconContainer: {
    justifyContent: 'center',
    borderRadius: normalize(20),
    // width: 40,
    // height: 40,
    flex: 1,
  },
  userIcon: {
    textAlign: 'center',
    lineHeight: normalize(39),
    // width: 40,
    // height: 40,
    color: 'white',
    fontFamily: fonts.solidIcons,
    fontSize: normalize(27),
  },
  labelContainer: {
    justifyContent: 'center',
    flex: 3,
  },
  label: {
    fontSize: normalize(20),
    color: '#465446',
  },
  labelPhone: {
    fontSize: normalize(14),
    color: '#465446',
  },
  userImage: {
    backgroundColor: 'orange',
    overflow: 'hidden',
    // flex: 1,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
    borderColor: 'rgba(51, 51, 51, 0.1)',
    borderWidth: 1,
    marginLeft: normalize(17),
  },
});

export default ContactCard;
