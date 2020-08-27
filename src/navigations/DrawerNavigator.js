import { createDrawerNavigator } from 'react-navigation-drawer';
import ProfileList from './../components/Profile/ProfileList';
import AddProfile from './../components/Profile/AddProfile';

export default DrawerNavigator = initialComponent => createDrawerNavigator({
  Home: initialComponent,
  ProfileList: {
      screen: ProfileList
  },
  AddProfile: {
      screen: AddProfile
  }
})