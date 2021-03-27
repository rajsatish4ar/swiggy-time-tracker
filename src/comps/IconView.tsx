import React from 'react';
import {IconProps} from '../../types/Components';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '@utils/Colors';
const IconView = (props: IconProps) => {
  const {name, style, onPress} = props;
  return (
    <Icon
      name={name}
      onPress={() => onPress && onPress()}
      style={[styles.logoIcon, style]}
    />
  );
};

export default IconView;

export const styles = StyleSheet.create({
  logoIcon: {fontSize: 36, color: Colors.color_555755},
});
