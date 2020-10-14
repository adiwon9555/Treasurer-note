import {createDrawerNavigator} from 'react-navigation-drawer';
import ProfileList from './../components/Profile/ProfileList';
import AddProfile from './../components/Profile/AddProfile';

const DrawerNavigator = (initialComponent) =>
  createDrawerNavigator({
    Home: initialComponent,
    ProfileList: {
      screen: ProfileList,
    },
    AddProfile: {
      screen: AddProfile,
    },
  });

export default DrawerNavigator;
