import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-community/picker';

export default class CustomPicker extends PureComponent {
  static propTypes = {
    ...PropTypes.Picker,
    list: PropTypes.array,
  };
  render() {
    const {list, selectedValue, noItemLabel} = this.props;
    return (
      <Picker {...this.props}>
        {list.map((val, index) => {
          return (
            <Picker.Item key={val.value} label={val.item} value={val.value} />
          );
        })}
        {!selectedValue && (
          <Picker.Item label={noItemLabel || 'Select Item'} value="" />
        )}
      </Picker>
    );
  }
}
