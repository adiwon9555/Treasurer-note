import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import fonts from '../../utils/fonts';
import { normalize } from '../utils/utils'


export default MemberCard = ({ member, selected, setSelected, deleteMember }) => {
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
                    <TouchableOpacity style={infoButtonContainer}>
                        <Text style={infoButton}>&#xf05a;</Text>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>

            {selected && <View style={bottomCardContainer}>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.solidIcons, color: '#444d46' }, actionButtonIcon]}>&#xf879;</Text>
                    <Text style={actionButtonLabel}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.brandIcons, color: 'green' }, actionButtonIcon]}>&#xf232;</Text>
                    <Text style={actionButtonLabel}>Watsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.regularIons, color: '#e32245' }, actionButtonIcon]}>&#xf0e0;</Text>
                    <Text style={actionButtonLabel}>Mail</Text>
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
        color: '#465446'
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