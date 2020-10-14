import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import GoBackIconHeaderLeft, {ICONSTYLE} from '../utils/GoBackIconHeaderLeft';
import InputCardAddMember, {CARD_INPUT_TYPE} from './InputCardAddMember';
import {normalize, isEmpty} from '../utils/utils';
import fonts from '../../utils/fonts';
import {addMember, editMember} from '../../actions/MemberAction';
import {SaveExcel} from '../export-excel/Playground';
import ImageViewScreen from '../utils/ImageViewScreen';
const {USERNAME, EGF, PHONE, EMAIL, NOTES, IMAGE} = CARD_INPUT_TYPE;

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [USERNAME.type]: '',
      [EGF.type]: '',
      [PHONE.type]: '',
      [EMAIL.type]: '',
      [NOTES.type]: '',
      [IMAGE.type]: '',
      editable: true,
      showImage: false,
    };
    props.navigation.setParams({
      saveMember: this.saveMember,
      setEditableTrue: this.setEditableTrue,
      editable: this.state.editable,
    });
  }
  static navigationOptions = ({navigation}) => {
    const member = navigation.getParam('member');
    const editable = navigation.getParam(
      'editable',
      member == null ? true : false,
    );
    const title = member != null ? 'BCSE - Member Info' : 'BCSE - Add Member';
    return {
      title,
      headerStyle: {height: normalize(55)},
      headerTitleStyle: {fontSize: normalize(20)},
      headerRight: (
        <TouchableOpacity
          onPress={
            editable
              ? navigation.getParam('saveMember')
              : navigation.getParam('setEditableTrue')
          }
          style={{paddingRight: 15}}>
          <Text style={{color: 'green', fontSize: normalize(20)}}>
            {navigation.getParam('saveMember', '') == '' ||
            navigation.getParam('setEditableTrue', '') == ''
              ? 'Load..'
              : editable
              ? 'Save'
              : 'Edit'}
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <GoBackIconHeaderLeft
          navigation={navigation}
          iconStyle={ICONSTYLE.CROSS}
        />
      ),
    };
  };
  componentDidMount() {
    const member = (this.editMember = this.props.navigation.getParam(
      'member',
      null,
    ));
    if (member != null) {
      this.oldegf = member.egf;
      this.setState({
        [USERNAME.type]: member.userName,
        [EGF.type]: member.egf,
        [PHONE.type]: member.phone,
        [EMAIL.type]: member.email,
        [NOTES.type]: member.notes,
        [IMAGE.type]: member.image,
        editable: false,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editable != prevState.editable) {
      this.props.navigation.setParams({editable: this.state.editable});
    }
    const newImageParam = this.props.navigation.getParam('imagePath', '');
    const oldImageParam = prevProps.navigation.getParam('imagePath', '');
    if (newImageParam !== oldImageParam) {
      this.setState({
        [IMAGE.type]: newImageParam,
      });
    }
  }

  setEditableTrue = () => {
    this.setState({
      editable: true,
    });
  };

  saveMember = () => {
    const {
      [USERNAME.type]: userName,
      [EGF.type]: egf,
      [PHONE.type]: phone,
      [EMAIL.type]: email,
      [IMAGE.type]: image,
      [NOTES.type]: notes,
    } = this.state;

    const member = {
      egf,
      data: {
        id: this.editMember ? this.editMember.id : this.uuidv4(),
        userName,
        image,
        phone,
        email,
        notes,
        egf,
      },
    };
    if (this.editMember != null) {
      this.props.editMember({member, oldegf: this.oldegf});
    } else {
      this.props.addMember(member);
    }
    this.props.navigation.goBack();
  };
  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  onInputChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  };
  changeImageClick = () => {
    const profileIcon = {uri: this.state[IMAGE.type]};
    if (!this.state.editable && !isEmpty(profileIcon.uri)) {
      this.setState({
        showImage: true,
      });
    } else if (this.state.editable) {
      this.props.navigation.navigate('CameraScreen');
    }
  };
  onModalClose = () => {
    this.setState({
      showImage: false,
    });
  };
  render() {
    const profileIcon = {uri: this.state[IMAGE.type]};
    const {
      mainContainer,
      addImageIcon,
      imageContainer,
      imageWrapper,
      userImage,
      fillerText,
    } = styles;
    return (
      <ScrollView style={mainContainer}>
        <View style={imageContainer}>
          <TouchableOpacity
            onPress={this.changeImageClick}
            disabled={!this.state.editable && isEmpty(profileIcon.uri)}>
            <ImageBackground source={profileIcon} style={imageWrapper}>
              {!this.state.editable && isEmpty(profileIcon.uri) ? (
                <Text style={[addImageIcon, {fontSize: normalize(30)}]}>
                  &#xf007;
                </Text>
              ) : (
                (this.state.editable || isEmpty(profileIcon.uri)) && (
                  <Text style={[addImageIcon, {}]}>&#xf083;</Text>
                )
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* <View style={inputCard}>
                    <Text style={inputIcon}>&#xf007;</Text>
                    <TextInput style={textInputStyle} placeholder='Full name' ></TextInput>
                </View> */}
        <InputCardAddMember
          type={USERNAME}
          placeholder="Full Name"
          onChangeText={this.onInputChange}
          value={this.state[USERNAME.type]}
          editable={this.state.editable}
        />

        <InputCardAddMember
          type={EGF}
          placeholder="EGF Name"
          onChangeText={this.onInputChange}
          value={this.state[EGF.type]}
          editable={this.state.editable}
        />

        <InputCardAddMember
          type={PHONE}
          placeholder="Phone"
          onChangeText={this.onInputChange}
          value={this.state[PHONE.type]}
          editable={this.state.editable}
        />

        <InputCardAddMember
          type={EMAIL}
          placeholder="Email"
          value={this.state[EMAIL.type]}
          onChangeText={this.onInputChange}
          editable={this.state.editable}
        />

        <InputCardAddMember
          type={NOTES}
          placeholder="Notes"
          onChangeText={this.onInputChange}
          value={this.state[NOTES.type]}
          editable={this.state.editable}
        />
        {this.state.showImage && (
          <ImageViewScreen
            navigation={this.props.navigation}
            profileIcon={profileIcon}
            onModalClose={this.onModalClose}
          />
        )}
      </ScrollView>
    );
  }
}

export default connect('', {addMember, editMember})(AddMember);

const styles = {
  mainContainer: {
    margin: normalize(20),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#0077be',
    borderRadius: normalize(40),
    overflow: 'hidden',
    width: normalize(80),
    height: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageIcon: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(25),
    color: '#fff',
  },
  userImage: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(80),
    borderColor: 'rgba(51, 51, 51, 0.1)',
    borderWidth: 2,
    // marginLeft: normalize(17),
  },
  fillerText: {
    paddingVertical: normalize(7),
    width: normalize(30),
  },
};
