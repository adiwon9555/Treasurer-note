import React, {useEffect, useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import Contacts, {checkPermission} from 'react-native-contacts';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import GoBackIconHeaderLeft, {ICONSTYLE} from '../utils/GoBackIconHeaderLeft';
import {normalize} from '../utils/utils';

const ImportContact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = () => {
      Contacts.getAll((err, _contacts) => {
        if (err === 'denied') {
          console.log('Error Retrieving contacts', err);
          alert('Error Retrieving contacts');
        } else {
          console.log('@aditya contacts', _contacts);
          setContacts([..._contacts]);
        }
      });
    };
    const checkPermission = (permission, init) => {
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (err === 'denied') {
            console.log('Error Retrieving contacts', err);
            alert('Error Retrieving contacts');
          } else {
            checkPermission(permission);
          }
        });
      }
      if (permission === 'authorized') {
        getContacts();
      }
      if (permission === 'denied') {
        if (init) {
          Contacts.requestPermission((err, permission) => {
            if (err === 'denied') {
              console.log('Error Retrieving contacts', err);
              alert('Error Retrieving contacts');
            } else {
              checkPermission(permission);
            }
          });
        } else {
          ToastAndroid.show(
            'Please allow Permission to view Contacts',
            ToastAndroid.SHORT,
          );
          navigation.goBack();
        }
      }
    };
    Contacts.checkPermission((err, permission) => {
      if (err) {
        console.log('Error Retrieving contacts', err);
        alert('Error Retrieving contacts');
      } else {
        checkPermission(permission, true);
      }
    });
    // Contacts.getAll()
    //   .then((_contacts) => {
    //     console.log('@aditya contacts', _contacts);
    //     setContacts([..._contacts]);
    //   })
    //   .catch((err) => {
    //     console.log('Error Retrieving contacts', err);
    //     alert('Error Retrieving contacts');
    //   });
  }, [navigation]);
  return (
    <View>
      {contacts.length >= 1 &&
        contacts.map((contact) => {
          return (
            <Text>
              {contact.givenName + ' - ' + contact.phoneNumbers[0].number}
            </Text>
          );
        })}
    </View>
  );
};

ImportContact.navigationOptions = ({navigationOptions, navigation}) => {
  return {
    title: 'BCSE - Import Contacts',
    headerStyle: {height: normalize(55)},
    headerTitleStyle: {fontSize: normalize(20)},
    headerLeft: (
      <GoBackIconHeaderLeft
        navigation={navigation}
        iconStyle={ICONSTYLE.CROSS}
      />
    ),
    headerRight: (
      <AddSearchOptionsHeaderRight
        navigation={navigation}
        searchIcon={navigation.getParam('searchIcon', true)}
        toggleSearch={navigation.getParam('toggleSearch', () => {})}
      />
    ),
  };
};

export default ImportContact;
