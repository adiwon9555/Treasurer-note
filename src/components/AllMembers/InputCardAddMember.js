import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Picker} from 'react-native';
import {normalize} from '../utils/utils';
import fonts from '../../utils/fonts';

export const CARD_INPUT_TYPE = {
  USERNAME: {
    type: 'USERNAME',
    keyboardType: 'default',
  },
  PHONE: {
    type: 'PHONE',
    keyboardType: 'phone-pad',
  },
  EMAIL: {
    type: 'EMAIL',
    keyboardType: 'email-address',
  },
  EGF: {
    type: 'EGF',
    keyboardType: 'default',
  },
  NOTES: {
    type: 'NOTES',
    keyboardType: 'default',
  },
  SEARCH: {
    type: 'SEARCH',
    keyboardType: 'default',
  },
  IMAGE: {
    type: 'IMAGE',
    keyboardType: 'default',
  },
};
export default InputCardAddMember = ({
  type,
  placeholder,
  value,
  onChangeText,
  editable,
}) => {
  const {inputCard, inputIcon, textInputStyle} = styles;

  return (
    <View style={inputCard}>
      {getIcon(type.type)}
      {type.type === CARD_INPUT_TYPE.EGF.type ? (
        <View style={textInputStyle}>
          {/* <Text>Select EGF</Text> */}
          <Picker
            enabled={editable}
            selectedValue={value ? value : ''}
            mode={'dropdown'}
            prompt={type.type}
            onValueChange={value => onChangeText(value, type.type)}>
            <Picker.Item label="HSR" value="HSR" />
            <Picker.Item label="Kormangala" value="Kormangala" />
            <Picker.Item label="BTM" value="BTM" />
            <Picker.Item label="Begur" value="Begur" />
            {!value && <Picker.Item label="Select Egf" value="" />}
          </Picker>
        </View>
      ) : (
        <TextInput
          keyboardType={type.keyboardType}
          style={textInputStyle}
          placeholder={editable ? placeholder : ''}
          value={value}
          onChangeText={value => onChangeText(value, type.type)}
          editable={editable}
        />
      )}
    </View>
  );
};

const getIcon = type => {
  const {inputIcon} = styles;
  switch (type) {
    case CARD_INPUT_TYPE.USERNAME.type:
      return <Text style={inputIcon}>&#xf007;</Text>;
    case CARD_INPUT_TYPE.EMAIL.type:
      return <Text style={inputIcon}>&#xf2b6;</Text>;
    case CARD_INPUT_TYPE.PHONE.type:
      return <Text style={inputIcon}>&#xf879;</Text>;
    case CARD_INPUT_TYPE.EGF.type:
      return <Text style={inputIcon}>&#xf51d;</Text>;
    case CARD_INPUT_TYPE.NOTES.type:
      return <Text style={inputIcon}>&#xf328;</Text>;
    case CARD_INPUT_TYPE.SEARCH.type:
      return <Text style={inputIcon}>&#xf002;</Text>;
    default:
      return <Text style={inputIcon}>&#xf128;</Text>;
  }
};
const styles = {
  inputCard: {
    marginTop: normalize(20, 1),
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
    borderBottomWidth: normalize(1),
  },
};
