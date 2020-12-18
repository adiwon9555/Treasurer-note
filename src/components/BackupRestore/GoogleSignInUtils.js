import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {isEmpty} from '../utils/utils';

const initialGoogle = async () => {
  await GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.appdata'],
    webClientId:
      '1081885423727-84d3202dmqs57bffcus341tnk2bmuue9.apps.googleusercontent.com',
    shouldFetchBasicProfile: true,
    offlineAccess: true,
  });

  const user = await signIn();
  console.log('@aditya initialGoogle', user);
  // const {idToken, accessToken} = await GoogleSignin.getTokens();
  // set api token
  // setApiToken(user.accessToken);
};

const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // this.setState({user: null}); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

const revokeAccess = async () => {
  try {
    await GoogleSignin.revokeAccess();
    console.log('deleted');
  } catch (error) {
    console.error(error);
  }
};
const isSignedIn = async () => {
  return await GoogleSignin.isSignedIn();
};

const firebaseAuthenticate = async (idToken) => {
  //Authenticate using Firebase
  if (!isEmpty(idToken)) {
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
  }
};

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (!isEmpty(userInfo.idToken)) {
      firebaseAuthenticate(userInfo.idToken);
    }
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow', error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already', error);
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated', error);
      // play services not available or outdated
    } else {
      console.log('some other error happened', error);
      // some other error happened
    }
  }
};

const getAccessToken = async () => {
  const {idToken, accessToken} = await GoogleSignin.getTokens();
  return accessToken;
};

const GoogleSignInUtils = {
  initialGoogle,
  signIn,
  signOut,
  isSignedIn,
  getAccessToken,
};

export default GoogleSignInUtils;
