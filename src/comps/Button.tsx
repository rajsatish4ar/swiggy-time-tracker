import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ButtonPorps} from '../types/Components';
import {StyleSheet} from 'react-native';
import {Colors} from '@utils/Colors';
import {useTheme} from '@react-navigation/native';
import IconView from './IconView';
import style from '@utils/Style';
const Button = (props: ButtonPorps) => {
  const {style, textStyle, text, onPress, iconName, iconOnly} = props;
  const {enable} = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.primary}, style]}
      activeOpacity={0.7}
      disabled={!enable}
      onPress={onPress}>
      {iconOnly ? (
        <IconView name={iconName} style={[styles.text, textStyle]} />
      ) : (
        <Text style={[styles.text, {color: colors.text}, textStyle]}>
          {text ?? 'Login'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
