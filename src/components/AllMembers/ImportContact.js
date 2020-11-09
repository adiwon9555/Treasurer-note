import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {Text, ToastAndroid, View} from 'react-native';
import Contacts from 'react-native-contacts';
import {FlatList} from 'react-native-gesture-handler';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import GoBackIconHeaderLeft, {ICONSTYLE} from '../utils/GoBackIconHeaderLeft';
import {normalize} from '../utils/utils';
import ContactCard from './ContactCard';
import MarkedItemActionBox from './MarkedItemActionBox';
import SearchBox from './SearchBox';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

const ImportContact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, startRefresh] = useState(false);
  const [markedItems, setMarkedItems] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const onRefresh = () => {
    startRefresh(() => !refresh);
    setLoading(true);
  };
  const renderItem = useCallback(
    ({item}) => {
      const setSelected = (contact) => {
        const member = {
          userName: contact.displayName,
          egf: '',
          phone: contact.phoneNumbers[0]?.number,
          email: contact.emailAddresses[0]?.email,
          notes: '',
          image: contact.thumbnailPath,
        };
        navigation.navigate('AddMember', {member, fromContact: true});
      };
      const markItem = (id) => {
        let marked = markedItems.includes(id);
        if (marked) {
          setMarkedItems((items) => items.filter((mid) => mid !== id));
        } else {
          setMarkedItems((items) => [...items, id]);
        }
      };
      return (
        <ContactCard
          setSelected={setSelected}
          contact={item}
          markItem={markItem}
          markedItems={markedItems}
        />
      );
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [markedItems],
  );
  useEffect(() => {
    const getContacts = () => {
      Contacts.getAll((err, _contacts) => {
        if (err === 'denied') {
          console.log('Error Retrieving contacts', err);
          alert('Error Retrieving contacts');
        } else {
          console.log('@aditya contacts', _contacts);
          const sortedContacts = _contacts.sort(
            (a, b) => a.displayName - b.displayName,
          );
          setContacts([...sortedContacts]);
          setLoading(false);
        }
      });
    };
    const checkPermission = (permission, init) => {
      console.log('@aditya  init', permission);
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (err === 'denied') {
            console.log('Error Retrieving contacts', err);
            alert('Error Retrieving contacts');
          } else {
            console.log('@aditya ');
            checkPermission(permission);
          }
        });
      }
      if (permission === 'authorized') {
        console.log('@aditya authorized', permission);
        getContacts();
      }
      if (permission === 'denied') {
        console.log('@aditya denied');
        if (init) {
          console.log('@aditya denied init', permission);
          Contacts.requestPermission((err, permission) => {
            if (err === 'denied') {
              console.log('Error Retrieving contacts', err);
              alert('Error Retrieving contacts');
            } else {
              console.log('@aditya denied init1');
              checkPermission(permission);
            }
          });
        } else {
          console.log('@aditya denied else');
          ToastAndroid.show(
            'Please allow Permission to view Contacts',
            ToastAndroid.SHORT,
          );
          navigation.goBack();
        }
      }
    };

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ).then((granted) => {
        console.log('@aditya then android', granted);
        if (granted === 'granted') {
          getContacts();
        } else {
          console.log('@aditya denied else');
          // ToastAndroid.show(
          //   'Allow Permission in Settings to view Contacts',
          //   ToastAndroid.SHORT,
          // );
          alert(
            'Please allow Permission for Treasurer app in Settings Page to view Contacts',
          );
          navigation.goBack();
        }
      });
    } else {
      Contacts.checkPermission((err, permission) => {
        if (err) {
          console.log('Error Retrieving contacts', err);
          alert('Error Retrieving contacts');
        } else {
          checkPermission(permission, true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const cancelSelection = useCallback(() => {
    setMarkedItems([]);
  }, []);
  const markAll = useCallback(() => {
    setMarkedItems(contacts.map((contact) => contact.recordID));
  }, [contacts]);
  const addMembers = useCallback(() => {}, []);
  const toggleSearch = () => {
    setShowSearchBox((prevState) => !prevState);
    this.setState(
      {
        showSearchBox: !this.state.showSearchBox,
        filterText: '',
      },
      () => {
        this.props.navigation.setParams({
          searchIcon: !this.state.showSearchBox,
        });
      },
    );
  };

  return (
    <View>
      {showSearchBox && (
        <SearchBox
          placeholder="Search Member"
          onChangeText={this.onSearch}
          value={this.state.filterText}
          closeSearch={this.closeSearch}
        />
      )}
      {markedItems.length > 0 && (
        <MarkedItemActionBox
          cancelSelection={cancelSelection}
          markAll={markAll}
          addMembers={addMembers}
        />
      )}
      <FlatList
        data={contacts}
        keyExtractor={(item) => `${item.recordID}`}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
      />
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
        iconStyle={ICONSTYLE.ARROW}
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
