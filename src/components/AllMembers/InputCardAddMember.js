import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {CodeForAndroid, normalize} from '../utils/utils';
import fonts from '../../utils/fonts';
import CustomPicker from '../utils/CustomPicker';

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

const EGF_LIST = [
  {
    item: 'HSR',
    value: 'HSR',
  },
  {
    item: 'Kormangala',
    value: 'Kormangala',
  },
  {
    item: 'BTM',
    value: 'BTM',
  },
  {
    item: 'Begur',
    value: 'Begur',
  },
];

const InputCardAddMember = ({
  type,
  placeholder,
  value,
  onChangeText,
  editable,
}) => {
  const [selectedPhoneCode, setCode] = useState('+91');
  const [phone, setPhone] = useState('');
  useMemo(() => {
    if (type.type === CARD_INPUT_TYPE.PHONE.type) {
      value && value.charAt(0) === '+'
        ? setCode(value.substr(0, value.indexOf(' ')))
        : setCode('+91');
      value && value.charAt(0) === '+'
        ? setPhone(value.substring(value.indexOf(' ') + 1))
        : setPhone(value);
    }
  }, [value, type]);

  const onCodeSelect = useCallback((val) => {
    setCode(val);
  }, []);

  const onChangeTextInternal = useCallback(
    (val) => {
      if (type.type === CARD_INPUT_TYPE.PHONE.type) {
        val = selectedPhoneCode + ' ' + val;
        onChangeText(val, type.type);
      }
      onChangeText(val, type.type);
    },
    [onChangeText, selectedPhoneCode, type],
  );

  const {inputCard, inputIcon, textInputStyle} = styles;

  return (
    <View style={inputCard}>
      {getIcon(type.type)}
      {type.type === CARD_INPUT_TYPE.EGF.type ? (
        <View style={textInputStyle}>
          {/* <Text>Select EGF</Text> */}
          <CustomPicker
            enabled={editable}
            selectedValue={value ? value : ''}
            mode={'dropdown'}
            noItemLabel={'Select Egf'}
            prompt={type.type}
            onValueChange={onChangeTextInternal}
            itemStyle={styles.pickerItem}
            list={EGF_LIST}
            style={!editable && {color: 'gray'}}
          />
        </View>
      ) : type.type === CARD_INPUT_TYPE.PHONE.type ? (
        <View style={styles.phoneContainer}>
          <CustomPicker
            enabled={editable}
            mode={'dropdown'}
            selectedValue={selectedPhoneCode}
            list={CodeForAndroid}
            style={[styles.customPickerStyle, !editable && {color: 'gray'}]}
            onValueChange={onCodeSelect}
            itemStyle={styles.pickerItem}
          />
          <TextInput
            keyboardType={type.keyboardType}
            style={styles.phoneInputStyle}
            placeholder={editable ? placeholder : ''}
            value={phone}
            onChangeText={onChangeTextInternal}
            editable={editable}
          />
        </View>
      ) : (
        <TextInput
          keyboardType={type.keyboardType}
          style={textInputStyle}
          placeholder={editable ? placeholder : ''}
          value={value}
          onChangeText={onChangeTextInternal}
          editable={editable}
        />
      )}
    </View>
  );
};

const getIcon = (type) => {
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
  phoneContainer: {
    flex: 7,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4c5466',
    borderBottomWidth: 1,
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  customPickerStyle: {
    color: '#000000',
    width: 110,
    // backgroundColor: '#f0f1f5',
    height: 40,
    fontSize: normalize(16),
    // textAlign: 'center',
    paddingLeft: 10,
    justifyContent: 'flex-end',

    alignItems: 'center',
  },
  phoneInputStyle: {
    paddingLeft: 12,
    fontSize: normalize(18),
    flex: 1,
  },
};

export default InputCardAddMember;
