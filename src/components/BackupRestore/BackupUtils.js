import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import {isEmpty} from '../utils/utils';
import GdriveUtils from './GdriveUtils';

const downloadHeaderPath = RNFS.DocumentDirectoryPath + '/data.json'; // see more path directory https://github.com/itinance/react-native-fs#api

const BACKUP_FILE_NAME = 'data.json';
const STORAGE_FOLDER = 'appDataFolder';
export const ACTION_TYPE = {
  BACK_UP: 'BACK_UP',
  RESTORE: 'RESTORE',
  DELETE_FILE: 'DELETE_FILE',
  SIGN_OUT: 'SIGN_OUT',
};
const ACTIONS = [
  {
    action: 'BACK_UP',
    title: 'Backup Entire Data',
    description:
      'Back up your entire app data to your Google Drive. You can Restore them any time you want. Please Note that that new Backup data will replace previous one.',
    buttonText: 'BACK UP',
    buttonColor: '#25D366',
  },
  {
    action: 'RESTORE',
    title: 'Restore App Data',
    description:
      'Restoring will delete all your present data and replace with the previously backed up data from Google Drive. Please Note that this change is unrecoverable.',
    buttonText: 'RESTORE',
    buttonColor: 'red',
  },
  // {
  //   action: 'DELETE_FILE',
  //   title: 'Delete Backed up Data',
  //   description:
  //     'The Backup copy stored in your Google Drive will be permananty Deleted.',
  //   buttonText: 'DELETE',
  //   buttonColor: 'red',
  // },
  {
    action: 'SIGN_OUT',
    title: 'Google account Sign out',
    description: 'Your account linked with Treasurer App will be signed out.',
    buttonText: 'SIGN OUT',
    buttonColor: 'red',
  },
];

// check storage permission
const checkPermission = () => {
  PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ).then((writeGranted) => {
    console.log('writeGranted', writeGranted);
    if (!writeGranted) {
      requestWriteStoragePermission();
    }
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ).then((readGranted) => {
      console.log('readGranted', readGranted);
      if (!readGranted) {
        requestReadStoragePermission();
      }
    });
  });
};

/**
 * require write storage permission
 */
async function requestWriteStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write your android storage Permission',
        message: 'Write your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write storage');
    } else {
      console.log('Write Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

/**
 * * require read storage permission
 */
async function requestReadStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Read your android storage Permission',
        message: 'Read your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can Read storage');
    } else {
      console.log('Read Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

// download and read file to get data content in downloaded file
const downloadAndReadFile = (accessToken, file) => {
  const fromUrl = GdriveUtils.downloadFile(accessToken, file.id);
  let downloadFileOptions = {
    fromUrl: fromUrl,
    toFile: downloadHeaderPath,
  };
  downloadFileOptions.headers = Object.assign(
    {
      Authorization: `Bearer ${accessToken}`,
    },
    downloadFileOptions.headers,
  );

  console.log('downloadFileOptions', downloadFileOptions);

  return RNFS.downloadFile(downloadFileOptions).promise.then((res) => {
    console.log(res);
    return RNFS.readFile(downloadHeaderPath, 'utf8');
  });
  // .then((content) => {
  //   console.log(content);
  //   this.setState({
  //     data: content,
  //   });
  // })
  // .catch((err) => {
  //   console.log('error', err);
  // });
};

// check existed file
const checkFile = async (accessToken) => {
  return GdriveUtils.getFile(accessToken, BACKUP_FILE_NAME, STORAGE_FOLDER)
    .then((file) => {
      console.log('file', file);
      if (file) {
        return downloadAndReadFile(accessToken, file);
      } else {
        console.log('file no found');
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
};

// check existed file
const deleteFile = async (accessToken) => {
  return GdriveUtils.getFile(accessToken, BACKUP_FILE_NAME, STORAGE_FOLDER)
    .then((file) => {
      console.log('file', file);
      if (!isEmpty(file) && !isEmpty(file.id)) {
        return GdriveUtils.deleteFile(accessToken, file.id);
      } else {
        console.log('file no found');
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
};

// crete file to upload
const createFile = (accessToken, content) => {
  // const content = [
  //   {
  //     id: 1,
  //     text: 'transaction memo list',
  //     name: 'Rathi',
  //   },
  //   {
  //     id: 2,
  //     text: 'transaction memo list',
  //     name: 'Aditya',
  //   },
  // ];
  GdriveUtils.getFile(accessToken, BACKUP_FILE_NAME, STORAGE_FOLDER)
    .then((file) => {
      console.log('file', file);
      if (file) {
        GdriveUtils.uploadFile(
          accessToken,
          JSON.stringify(content),
          BACKUP_FILE_NAME,
          STORAGE_FOLDER,
          file.id,
        );
      } else {
        GdriveUtils.uploadFile(
          accessToken,
          JSON.stringify(content),
          BACKUP_FILE_NAME,
          STORAGE_FOLDER,
        );
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
};

const BackupUtils = {
  checkPermission,
  createFile,
  checkFile,
  downloadAndReadFile,
  deleteFile,
  ACTIONS,
};

export default BackupUtils;
