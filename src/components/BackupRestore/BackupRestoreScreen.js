import React, {useCallback, useEffect, useRef, useState} from 'react';
import configureStore from './../../configureStore';
import Loader from './../utils/Loader';
import {
  Text,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  FlatList,
} from 'react-native';
import {isEmpty} from '../utils/utils';
import ActionItem from './ActionItem';
import BackupUtils, {ACTION_TYPE} from './BackupUtils';
import GoogleSignInUtils from './GoogleSignInUtils';
import {updateMemberList} from '../../actions/MemberAction';

export default function BackupRestoreScreen() {
  const accessToken = useRef('');
  const [content, setContent] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    BackupUtils.checkPermission();
  }, []);
  const restore = useCallback(async () => {
    setLoader(true);
    const isSignedIn = await GoogleSignInUtils.isSignedIn();
    try {
      if (!isSignedIn || isEmpty(accessToken.current)) {
        await GoogleSignInUtils.initialGoogle();
        accessToken.current = await GoogleSignInUtils.getAccessToken();
      }

      const data = await BackupUtils.checkFile(accessToken.current);
      console.log('@aditya new content', data);
      if (!isEmpty(data)) {
        const {store} = configureStore();
        //Restoring MemberList
        const parsedData = JSON.parse(data);
        console.log('@aditya parseddata', parsedData);
        const memberList = parsedData?.MemberReducer?.memberList;
        console.log('@aditya memberList', memberList);
        store.dispatch(updateMemberList(memberList));
        ToastAndroid.show('Data Restored Succesfully', ToastAndroid.SHORT);

        setContent(data);
        setLoader(false);
      } else {
        setLoader(false);
        ToastAndroid.show('Content is Empty', ToastAndroid.SHORT);
        setContent(null);
      }
    } catch (e) {
      // alert('Encountered Error');
      setLoader(false);
      ToastAndroid.show('Encountered Error getting data', ToastAndroid.SHORT);
      console.log('Encountered error', e);
    }
  }, []);

  const backup = useCallback(async () => {
    setLoader(true);
    const isSignedIn = await GoogleSignInUtils.isSignedIn();
    try {
      if (!isSignedIn || isEmpty(accessToken.current)) {
        await GoogleSignInUtils.initialGoogle();
        accessToken.current = await GoogleSignInUtils.getAccessToken();
      }
      const {store} = configureStore();
      const storeData = store.getState();

      const storeDataToSave = {
        MemberReducer: {
          memberList: [...storeData.MemberReducer.memberList],
        },
      };
      // const content = [
      //   {
      //     id: 1213,
      //     text: 'transaction memo list',
      //     name: 'keto feto',
      //   },
      //   {
      //     id: 2,
      //     text: 'transaction memo list',
      //     name: '2',
      //   },
      // ];

      BackupUtils.createFile(accessToken.current, storeDataToSave);
      console.log('@aditya store', storeDataToSave);
      ToastAndroid.show('Data backed up Succesfully', ToastAndroid.SHORT);
      setLoader(false);
    } catch (e) {
      // alert('Encountered Error');
      setLoader(false);
      ToastAndroid.show('Encountered Error during backup', ToastAndroid.SHORT);
      console.log('Encountered error', e);
    }
  }, []);
  const deleteFile = useCallback(async () => {
    setLoader(true);
    const isSignedIn = await GoogleSignInUtils.isSignedIn();
    try {
      if (!isSignedIn || isEmpty(accessToken.current)) {
        await GoogleSignInUtils.initialGoogle();
        accessToken.current = await GoogleSignInUtils.getAccessToken();
      }
      const response = BackupUtils.deleteFile(accessToken.current);
      console.log('@aditya delete response', response);
      setLoader(false);
    } catch (e) {
      // alert('Encountered Error');
      setLoader(false);
      ToastAndroid.show('Encountered Error deleting data', ToastAndroid.SHORT);
      console.log('Encountered error', e);
    }
  }, []);
  const onActionPress = useCallback(
    (action) => {
      switch (action) {
        case ACTION_TYPE.BACK_UP:
          backup();
          break;
        case ACTION_TYPE.RESTORE:
          restore();
          break;
        case ACTION_TYPE.DELETE_FILE:
          deleteFile();
          break;
        case ACTION_TYPE.SIGN_OUT:
          GoogleSignInUtils.signOut();
          break;
      }
    },
    [backup, restore, deleteFile],
  );
  return (
    <ScrollView style={styles.container}>
      {loader && <Loader />}
      <FlatList
        data={BackupUtils.ACTIONS}
        keyExtractor={(item) => `${item.action}`}
        renderItem={({item}) => (
          <ActionItem item={item} onActionPress={onActionPress} />
        )}
      />
      {/* <Text style={styles.textData}>{content}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textData: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
});
