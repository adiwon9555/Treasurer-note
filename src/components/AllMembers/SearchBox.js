import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {normalize} from '../utils/utils';
import fonts from '../../utils/fonts';

export default SearchBox = ({
  placeholder,
  value,
  onChangeText,
  closeSearch
}) => {
  const {inputCard, inputIcon, textInputStyle,iconContainer} = styles;

  return (
    <View style={inputCard}>
      <Text style={[inputIcon,{flex: 1,}]}>&#xf002;</Text>
      <TextInput
        style={textInputStyle}
        placeholder={placeholder}
        value={value}
        autoFocus
        onChangeText={value => onChangeText(value)}
      />
      <TouchableOpacity onPress={closeSearch} style={iconContainer}>
      <Text style={inputIcon}>&#xf00d;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  inputCard: {
    marginTop: normalize(5, 1),
    paddingLeft: normalize(10,1),
    marginBottom: normalize(3,0.1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'red',
    borderBottomWidth: normalize(1),
  },
  inputIcon: {
    fontFamily: fonts.solidIcons,
    fontSize: normalize(24),
    color: 'black',
    // flex: 1,
  },
  iconContainer:{
    flex: 1,
  },
  textInputStyle: {
    flex: 7,
    fontSize: normalize(18),
  },
};
