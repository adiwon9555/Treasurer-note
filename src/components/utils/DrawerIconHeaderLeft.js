import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import fonts from '../../utils/fonts';
import { normalize } from './utils'

export default DrawerIconHeaderLeft = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={navigation.openDrawer}
            style={{ paddingLeft: normalize(10) }}
        >
            <Text style={styles.drawerBarIconStyle}>&#xf0c9;</Text>
        </TouchableOpacity>
    )
}

const styles = {
    drawerBarIconStyle: {
        fontFamily: fonts.solidIcons,
        fontSize: normalize(20),
        paddingLeft: normalize(10),
    }
}