import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {acc} from 'react-native-reanimated';
import {isEmpty} from '../utils/utils';
import BackupUtils from './BackupUtils';
import GoogleSignInUtils from './GoogleSignInUtils';

export default function BackupRestoreScreen() {
  const accessToken = useRef('');
  const [content, setContent] = useState(null);
  useEffect(() => {
    BackupUtils.checkPermission();
  }, []);
  const getDataFromGoogleDrive = async () => {
    const isSignedIn = await GoogleSignInUtils.isSignedIn();
    try {
      if (!isSignedIn || isEmpty(accessToken.current)) {
        await GoogleSignInUtils.initialGoogle();
        accessToken.current = await GoogleSignInUtils.getAccessToken();
      }

      const data = await BackupUtils.checkFile(accessToken.current);
      console.log('@aditya new content', data);

      setContent([...JSON.parse(data)]);
    } catch (e) {
      alert('Encountered Error');
      console.log('Encountered error', e);
    }
  };

  const setDataFromGoogleDrive = async () => {
    const isSignedIn = await GoogleSignInUtils.isSignedIn();
    try {
      if (!isSignedIn || isEmpty(accessToken.current)) {
        await GoogleSignInUtils.initialGoogle();
        accessToken.current = await GoogleSignInUtils.getAccessToken();
      }
      const content = [
        {
          id: 1213,
          text: 'transaction memo list',
          name: 'keto feto',
        },
        {
          id: 2,
          text: 'transaction memo list',
          name: '2',
        },
      ];

      BackupUtils.createFile(accessToken.current, content);
    } catch (e) {
      alert('Encountered Error');
      console.log('Encountered error', e);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.buttonGetData}
        onPress={getDataFromGoogleDrive}>
        <Text style={styles.text}>Restore data</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttonGetData}
        onPress={setDataFromGoogleDrive}>
        <Text style={styles.text}>Backup Data</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttonGetData}
        onPress={GoogleSignInUtils.signOut}>
        <Text style={styles.text}>SignOut</Text>
      </TouchableHighlight>
      <Text style={styles.textData}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 10,
  },
  textData: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  buttonGetData: {
    backgroundColor: '#333',
    padding: 10,
    margin: 10,
  },
});
