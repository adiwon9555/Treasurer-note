import {  Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scale = size => width / 340 * size;
export const normalize = (size, factor = 0.2) => size + ( scale(size) - size ) * factor;

export function isEmpty(obj) {
  // console.log(typeof(obj));
  if (obj !== null && obj !== undefined) {
    // for general objects
    if (typeof obj === 'string') {
      if (obj.trim() === '' || obj == 'null') {
        // for string
        return true;
      }

      return false;
    } else if (obj.length <= 0) {
      // for array
      return true;
    } else if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      const len = keys.length;
      if (len <= 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  return true;
}
