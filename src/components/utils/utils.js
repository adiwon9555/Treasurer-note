import {  Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scale = size => width / 340 * size;
export const normalize = (size, factor = 0.2) => size + ( scale(size) - size ) * factor;
