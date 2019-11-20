import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import fonts from '../../utils/fonts';
import { normalize } from './utils'


export default AddSearchOptionsHeaderRight = ({ navigation, openAddModal }) => {
    const { iconContainer, iconStyle } = styles;
    return (
        <View style={iconContainer}>
            <TouchableOpacity
                onPress={navigation.openDrawer}
                style={{}}
            >

                <Text style={iconStyle}>&#xf002;</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={openAddModal}
                style={{}}
            >

                <Text style={iconStyle}>&#xf055;</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    iconContainer: {
        paddingRight: normalize(15),
        flexDirection: 'row',
    },
    iconStyle: {
        fontFamily: fonts.solidIcons,
        fontSize: normalize(24),
        color: 'gray',
        margin: normalize(10),
    }
}