import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl} from 'react-native';
import {Text, ToastAndroid, View} from 'react-native';
import Contacts from 'react-native-contacts';
import {FlatList} from 'react-native-gesture-handler';
import AddSearchOptionsHeaderRight from '../utils/AddSearchOptionsHeaderRight';
import GoBackIconHeaderLeft, {ICONSTYLE} from '../utils/GoBackIconHeaderLeft';
import {debounce, normalize} from '../utils/utils';
import ContactCard from './ContactCard';
import MarkedItemActionBox from './MarkedItemActionBox';
import SearchBox from './SearchBox';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {BackHandler} from 'react-native';

const ImportContact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, startRefresh] = useState(false);
  const [markedItems, setMarkedItems] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
    navigation.setParams({
      toggleSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const handleBackpress = () => {
      if (showSearchBox || markedItems.length > 0) {
        if (showSearchBox) {
          closeSearch();
        }
        if (markedItems.length > 0) {
          cancelSelection();
        }
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackpress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackpress);
    };
  }, [showSearchBox, closeSearch, cancelSelection, markedItems]);
  useEffect(() => {
    const getContacts = () => {
      Contacts.getAll((err, _contacts) => {
        if (err === 'denied') {
          console.log('Error Retrieving contacts', err);
          alert('Error Retrieving contacts');
        } else {
          console.log('@aditya contacts', _contacts);
          if (Platform.OS === 'ios') {
            _contacts = _contacts.map((contact) => ({
              ...contact,
              displayName:
                contact.givenName +
                ' ' +
                contact.middleName +
                ' ' +
                contact.familyName,
            }));
          }

          const sortedContacts = _contacts.sort((a, b) =>
            a.displayName > b.displayName
              ? 1
              : b.displayName > a.displayName
              ? -1
              : 0,
          );
          console.log('@aditya contacts', sortedContacts);
          setContacts([...sortedContacts]);
          setLoading(false);
        }
      });
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
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (err) {
          console.log('Error Retrieving contacts', err);
          alert('Error Retrieving contacts');
        }
        if (permission === 'undefined') {
          Contacts.requestPermission((err, permission) => {
            if (err) {
              console.log('Error Retrieving contacts', err);
              alert('Error Retrieving contacts');
            }
            if (permission === 'authorized') {
              console.log('@aditya authorized', permission);
              getContacts();
            }
            if (permission === 'denied') {
              console.log('@aditya denied else');
              alert(
                'Please allow Permission for Treasurer app in Settings Page to view Contacts',
              );
              navigation.goBack();
            }
          });
        }
        if (permission === 'authorized') {
          console.log('@aditya authorized', permission);
          getContacts();
        }
        if (permission === 'denied') {
          console.log('@aditya denied else');
          alert(
            'Please allow Permission for Treasurer app in Settings Page to view Contacts',
          );
          navigation.goBack();
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // const filter = memoizeOne((list, searchText) =>
  //   list.filter((item) =>
  //     item.displayName.toLowerCase().includes(searchText.toLowerCase()),
  //   ),
  // );
  const filter = useCallback(() => {
    return contacts.filter((item) =>
      item.displayName.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [contacts, filterText]);

  const cancelSelection = useCallback(() => {
    setMarkedItems([]);
  }, []);
  const markAll = useCallback(() => {
    setMarkedItems(contacts.map((contact) => contact.recordID));
  }, [contacts]);
  const addMembers = useCallback(() => {}, []);
  const toggleSearch = useCallback(() => {
    setShowSearchBox((prevState) => {
      navigation.setParams({
        searchIcon: !prevState,
      });
      return !prevState;
    });
    setFilterText('');
  }, [navigation]);

  // const onSearch = useCallback((value) => {
  //   // setSearchValue(value);
  //   return debounce(setFilterText, 1000);
  // }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(debounce(setFilterText, 10), []);

  const closeSearch = useCallback(() => {
    setShowSearchBox(false);
    navigation.setParams({
      searchIcon: true,
    });
    setFilterText('');
  }, [navigation]);
  const filteredList = filter();
  // useMemo(() => {
  //   setContacts((contacts) =>
  //     contacts.filter((item) =>
  //       item.displayName.toLowerCase().includes(filterText.toLowerCase()),
  //     ),
  //   );
  // }, [filterText]);
  return (
    <View>
      {showSearchBox && (
        <SearchBox
          placeholder="Search Member"
          onChangeText={onSearch}
          value={searchValue}
          closeSearch={closeSearch}
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
        data={filteredList}
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
