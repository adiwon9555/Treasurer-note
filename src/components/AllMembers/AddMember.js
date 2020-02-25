import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import GoBackIconHeaderLeft, { ICONSTYLE } from '../utils/GoBackIconHeaderLeft';
import InputCardAddMember, { CARD_INPUT_TYPE } from './InputCardAddMember';
import { normalize } from '../utils/utils'
import fonts from '../../utils/fonts';
import { addMember, editMember } from '../../actions/MemberAction'
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
            editable: true,
        }
    }
    static navigationOptions = ({ navigation }) => {
        const member = navigation.getParam('member');
        const editable = navigation.getParam('editable', member == null ? true : false);
        const title = member != null ? 'BCSE - Member Info' : 'BCSE - Add Member';
        return (
            {
                title,
                headerStyle: { height: normalize(55) },
                headerTitleStyle: { fontSize: normalize(20) },
                headerRight: (
                    <TouchableOpacity
                        onPress={editable ? navigation.getParam('saveMember') : navigation.getParam('setEditableTrue')}
                        style={{ paddingRight: 15 }}
                    >

                        <Text style={{ color: 'green', fontSize: normalize(20) }}>{editable ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>

                ),
                headerLeft: (
                    <GoBackIconHeaderLeft navigation={navigation} iconStyle={ICONSTYLE.CROSS} />
                ),
            }
        )
    }
    componentDidMount() {
        this.props.navigation.setParams({ saveMember: this.saveMember, setEditableTrue: this.setEditableTrue, editable: this.state.editable })
        const member = this.editMember = this.props.navigation.getParam('member', null);
        if (member != null) {
            this.oldegf = member.egf;
            this.setState({
                [USERNAME.type]: member.userName,
                [EGF.type]: member.egf,
                [PHONE.type]: member.phone,
                [EMAIL.type]: member.email,
                [NOTES.type]: member.notes,
                editable: false,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.editable != prevState.editable) {
            this.props.navigation.setParams({ editable: this.state.editable })
        }
    }

    setEditableTrue = () => {
        this.setState({
            editable: true
        })
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
                id: this.editMember ? this.editMember.id : this.uuidv4(),
                userName,
                image: '',
                phone,
                email,
                notes,
                egf
            }
        }
        if (this.editMember != null) {
            this.props.editMember({member, oldegf: this.oldegf});
        } else {
            this.props.addMember(member);
        }
        this.props.navigation.goBack();
    }
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
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
            imageContainer,
            imageWrapper,
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
                    editable={this.state.editable}
                />

                <InputCardAddMember
                    type={EGF}
                    placeholder='EGF Name'
                    onChangeText={this.onInputChange}
                    value={this.state[EGF.type]}
                    editable={this.state.editable}
                />

                <InputCardAddMember
                    type={PHONE}
                    placeholder='Phone'
                    onChangeText={this.onInputChange}
                    value={this.state[PHONE.type]}
                    editable={this.state.editable}
                />

                <InputCardAddMember
                    type={EMAIL}
                    placeholder='Email'
                    value={this.state[EMAIL.type]}
                    onChangeText={this.onInputChange}
                    editable={this.state.editable}
                />

                <InputCardAddMember
                    type={NOTES}
                    placeholder='Notes'
                    onChangeText={this.onInputChange}
                    value={this.state[NOTES.type]}
                    editable={this.state.editable}
                />

            </ScrollView>
        )
    }

}

export default connect('', { addMember, editMember })(AddMember);

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
    }
}