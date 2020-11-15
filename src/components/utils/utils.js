import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const scale = (size) => (width / 340) * size;
export const normalize = (size, factor = 0.2) =>
  size + (scale(size) - size) * factor;

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

export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const CodeForAndroid = [
  {
    item: '+91',
    value: '+91',
  },
  {
    item: '+971',
    value: '+971',
  },
  {
    item: '+973',
    value: '+973',
  },
  {
    item: '+880',
    value: '+880',
  },
  {
    item: '+975',
    value: '+975',
  },
  {
    item: '+267',
    value: '+267',
  },
  {
    item: '+55',
    value: '+55',
  },
  {
    item: '+1',
    value: '+1',
  },
  {
    item: '+420',
    value: '+420',
  },
  {
    item: '+45',
    value: '+45',
  },
  {
    item: '+20',
    value: '+20',
  },
  {
    item: '+358',
    value: '+358',
  },
  {
    item: '+33',
    value: '+33',
  },
  {
    item: '+49',
    value: '+49',
  },
  {
    item: '+852',
    value: '+852',
  },
  {
    item: '+61',
    value: '+61',
  },
  {
    item: '+62',
    value: '+62',
  },
  {
    item: '+353',
    value: '+353',
  },
  {
    item: '+972',
    value: '+972',
  },
  {
    item: '+81',
    value: '+81',
  },
  {
    item: '+965',
    value: '+965',
  },
  {
    item: '+60',
    value: '+60',
  },
  {
    item: '+960',
    value: '+960',
  },
  {
    item: '+230',
    value: '+230',
  },
  {
    item: '+977',
    value: '+977',
  },
  {
    item: '+31',
    value: '+31',
  },
  {
    item: '+64',
    value: '+64',
  },
  {
    item: '+47',
    value: '+47',
  },
  {
    item: '+968',
    value: '+968',
  },
  {
    item: '+63',
    value: '+63',
  },
  {
    item: '+974',
    value: '+974',
  },
  {
    item: '+7',
    value: '+7',
  },
  {
    item: '+966',
    value: '+966',
  },
  {
    item: '+65',
    value: '+65',
  },
  {
    item: '+82',
    value: '+82',
  },
  {
    item: '+34',
    value: '+34',
  },
  {
    item: '+46',
    value: '+46',
  },
  {
    item: '+255',
    value: '+255',
  },
  {
    item: '+66',
    value: '+66',
  },
  {
    item: '+43',
    value: '+43',
  },
  {
    item: '+44',
    value: '+44',
  },
  {
    item: '+1',
    value: '+1',
  },
  {
    item: '+84',
    value: '+84',
  },
];

export const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
