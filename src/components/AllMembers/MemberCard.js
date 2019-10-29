import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import fonts from '../../utils/fonts';


export default MemberCard = ({ member, selected, setSelected }) => {
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
                onPress={() => setSelected(member.id)}
            >
                <View style={cardContainer}>
                    <View style={userIconContainer}>
                        <Text style={userIcon}>&#xf2bd;</Text>
                    </View>
                    <View style={labelContainer}>
                        <Text style={label}>{member.name}</Text>
                    </View>
                    <TouchableOpacity style={infoButtonContainer}>
                        <Text style={infoButton}>&#xf05a;</Text>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
            {selected && <View style={bottomCardContainer}>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.solidIcons }, actionButtonIcon]}>&#xf879;</Text>
                    <Text style={actionButtonLabel}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.brandIcons }, actionButtonIcon]}>&#xf232;</Text>
                    <Text style={actionButtonLabel}>Watsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.regularIons }, actionButtonIcon]}>&#xf0e0;</Text>
                    <Text style={actionButtonLabel}>Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.regularIons }, actionButtonIcon]}>&#xf2ed;</Text>
                    <Text style={actionButtonLabel}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={actionButtonContainer}>
                    <Text style={[{ fontFamily: fonts.solidIcons }, actionButtonIcon]}>&#xf234;</Text>
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
        borderRadius: 10,
        elevation: 2,
        borderColor: '#ddd',
        borderWidth: 0.2,

    },
    bottomCardContainer: {
        flexDirection: 'row',
        padding: 5,
        borderTopWidth: 0.7,
        borderColor: '#DDD',
        justifyContent: 'space-evenly',
    },
    actionButtonContainer: {
        alignItem: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        textAlign: 'center',
        fontSize: 28,
    },
    actionButtonLabel: {
        textAlign: 'center',
    },
    cardContainerClickable: {
        padding: 10,
        borderRadius: 5,

    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    userIconContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        borderRadius: 20,
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
        fontSize: 40,
    },
    labelContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    label: {
        fontSize: 22,
    },
    infoButtonContainer: {
        alignItem: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    infoButton: {
        textAlign: 'center',
        color: '#000',
        fontFamily: fonts.solidIcons,
        fontSize: 30,
    }

}