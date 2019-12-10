import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';
import fonts from '../../utils/fonts';
import { normalize } from '../utils/utils'


export default MemberCard = (props) => {
    const { member, selected, setSelected, deleteMember, navigation } = props;
    const {
        cardContainer,
        userIconContainer,
        userIcon,
        label,
        labelContainer,
        infoButton,
        infoButtonContainer,
        cardContainerClickable,
        entireCardView,
        onClickStyleCard,
        bottomCardContainer,
        actionButtonContainer,
        actionButtonIcon,
        actionButtonLabel,
    } = styles;
    const DISABLED_COLOR = '#D3D3D3';

    const onCallPress = () => {
        if(member.phone)
            Linking.openURL(`tel:${member.phone}`);
    }

    const onWatsAppPress = () => {
        if(member.phone)
            Linking.openURL(`https://api.whatsapp.com/send?phone=${member.phone}`)
    }

    const onMailPress = () => {
        if(member.email)
            Linking.openURL(`mailto:${member.email}`)
    }

    const onInfoClick = () => {
        navigation.navigate('AddMember',{member});
    }
    // const [cardOpen, setCardOpen] = useState(false);
    return (

        <View style={selected ? onClickStyleCard : entireCardView}>
            <TouchableHighlight style={cardContainerClickable}
                underlayColor={'#DDDDDD'}
                onPress={() => setSelected(member.id, member.egf)}
            >
                <View style={cardContainer}>
                    <View style={userIconContainer}>
                        <Text style={userIcon}>&#xf2bd;</Text>
                    </View>
                    <View style={labelContainer}>
                        <Text style={label}>{member.userName}</Text>
                    </View>
                    <TouchableOpacity onPress={onInfoClick} style={infoButtonContainer}>
                        <Text style={infoButton}>&#xf05a;</Text>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>

            {selected && <View style={bottomCardContainer}>
                <TouchableOpacity onPress={onCallPress} activeOpacity={member.phone ? 0.2 : 1} style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.solidIcons, color: (member.phone ? '#444d46' : DISABLED_COLOR ) }, actionButtonIcon]}>&#xf879;</Text>
                    <Text style={[actionButtonLabel,{color: member.phone ? '#444d46' : DISABLED_COLOR}]}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onWatsAppPress} activeOpacity={member.phone ? 0.2 : 1} style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.brandIcons, color: (member.phone ?  'green' : DISABLED_COLOR ) }, actionButtonIcon]}>&#xf232;</Text>
                    <Text style={[actionButtonLabel,{color: member.phone ? '#444d46' : DISABLED_COLOR}]}>Watsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onMailPress} activeOpacity={member.email ? 0.2 : 1} style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.regularIons, color: (member.email ? '#e32245' : DISABLED_COLOR ) }, actionButtonIcon]}>&#xf0e0;</Text>
                    <Text style={[actionButtonLabel,{color: member.email ? '#444d46' : DISABLED_COLOR}]}>Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer} onPress={deleteMember}>
                    <Text style={[{ fontFamily: fonts.regularIons, color: '#7e807e' }, actionButtonIcon]}>&#xf2ed;</Text>
                    <Text style={actionButtonLabel}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.solidIcons, color: '#5b6778' }, actionButtonIcon]}>&#xf234;</Text>
                    <Text style={actionButtonLabel}>Add</Text>
                </TouchableOpacity>
            </View>}

        </View>
    );
}

const styles = {
    entireCardView: {

    },
    onClickStyleCard: {
        borderRadius: normalize(10),
        elevation: normalize(2),
        borderColor: '#ddd',
        borderWidth: normalize(0.2),

    },
    bottomCardContainer: {
        flexDirection: 'row',
        padding: normalize(5),
        borderTopWidth: normalize(0.7),
        borderColor: '#DDD',
        justifyContent: 'space-evenly',
    },
    actionButtonContainer: {
        alignItem: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        textAlign: 'center',
        fontSize: normalize(28),
    },
    actionButtonLabel: {
        textAlign: 'center',
        color: '#444d46',
    },
    cardContainerClickable: {
        padding: normalize(10),
        borderRadius: normalize(5),

    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    userIconContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        borderRadius: normalize(20),
        // width: 40,
        // height: 40,
        flex: 1,
    },
    userIcon: {
        textAlign: 'center',
        // width: 40,
        // height: 40,
        color: 'orange',
        fontFamily: fonts.solidIcons,
        fontSize: normalize(40),
    },
    labelContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        flex: 3,
    },
    label: {
        fontSize: normalize(22),
        color: '#465446',
    },
    infoButtonContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    infoButton: {
        textAlign: 'center',
        color: '#0077be',
        fontFamily: fonts.solidIcons,
        fontSize: normalize(30),
    }

}