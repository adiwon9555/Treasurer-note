import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GoBackIconHeaderLeft, { ICONSTYLE } from '../utils/GoBackIconHeaderLeft';
import InputCardAddMember, { CARD_INPUT_TYPE } from './InputCardAddMember';
import { normalize } from '../utils/utils'
import fonts from '../../utils/fonts';
import { addMember } from '../../actions/MemberAction'
const { USERNAME, EGF, PHONE, EMAIL, NOTES } = CARD_INPUT_TYPE;

class AddMember extends Component {
    constructor() {
        super();
        this.state = {
            [USERNAME.type]: '',
            [EGF.type]: '',
            [PHONE.type]: '',
            [EMAIL.type]: '',
            [NOTES.type]: '',
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ saveMember: this.saveMember })
    }
    saveMember = () => {
        const {
            [USERNAME.type]: userName,
            [EGF.type]: egf,
            [PHONE.type]: phone,
            [EMAIL.type]: email,
            [NOTES.type]: notes,
        } = this.state;

        const member = {
            egf,
            data: {
                id: this.uuidv4(),
                userName,
                image: '',
                phone,
                email,
                notes,
                egf
            }
        }
        this.props.addMember(member);
        this.props.navigation.goBack();
    }
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    static navigationOptions = ({ navigation }) => {
        return (
            {
                title: 'BCSE - Add Member',
                headerStyle: { height: normalize(55) },
                headerTitleStyle: { fontSize: normalize(20) },
                headerRight: (
                    <TouchableOpacity
                        onPress={navigation.getParam('saveMember')}
                        style={{ paddingRight: 15 }}
                    >

                        <Text style={{ color: 'green', fontSize: normalize(20) }}>Save</Text>
                    </TouchableOpacity>

                ),
                headerLeft: (
                    <GoBackIconHeaderLeft navigation={navigation} iconStyle={ICONSTYLE.CROSS} />
                ),
            }
        )
    }
    onInputChange = (value, type) => {
        this.setState({
            [type]: value
        })
    }
    render() {

        const {
            mainContainer,
            addImageIcon,
            inputCard,
            inputIcon,
            imageContainer,
            imageWrapper,
            textInputStyle,
        } = styles;
        return (
            <ScrollView style={mainContainer}>
                <View style={imageContainer}>
                    <View style={imageWrapper}>
                        <Text style={[addImageIcon, {}]}>&#xf083;</Text>
                    </View>
                </View>
                {/* <View style={inputCard}>
                    <Text style={inputIcon}>&#xf007;</Text>
                    <TextInput style={textInputStyle} placeholder='Full name' ></TextInput>
                </View> */}
                <InputCardAddMember
                    type={USERNAME}
                    placeholder='Full Name'
                    onChangeText={this.onInputChange}
                    value={this.state[USERNAME.type]}
                />

                <InputCardAddMember
                    type={EGF}
                    placeholder='EGF Name'
                    onChangeText={this.onInputChange}
                    value={this.state[EGF.type]}
                />

                <InputCardAddMember
                    type={PHONE}
                    placeholder='Phone'
                    onChangeText={this.onInputChange}
                    value={this.state[PHONE.type]}
                />

                <InputCardAddMember
                    type={EMAIL}
                    placeholder='Email'
                    value={this.state[EMAIL.type]}
                    onChangeText={this.onInputChange}
                />

                <InputCardAddMember
                    type={NOTES}
                    placeholder='Notes'
                    onChangeText={this.onInputChange}
                    value={this.state[NOTES.type]}
                />

            </ScrollView>
        )
    }

}

export default connect('', { addMember })(AddMember);

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
        padding: normalize(20),
        borderRadius: normalize(40),
    },
    addImageIcon: {
        fontFamily: fonts.solidIcons,
        fontSize: normalize(30),
        color: '#fff',
    },
    inputCard: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputIcon: {
        fontFamily: fonts.solidIcons,
        fontSize: normalize(24),
        color: 'gray',
        flex: 1,
    },
    textInputStyle: {
        flex: 7,
        fontSize: normalize(18),
        borderColor: 'gray',
        borderBottomWidth: normalize(1)
    }
}