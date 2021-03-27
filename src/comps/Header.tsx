import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HeaderProps} from '../types/Components';
import {StyleSheet} from 'react-native';
import {Colors} from '@utils/Colors';
import {} from 'react-native-safe-area-context';
import IconView from '@comps/IconView';
import style from '@utils/Style';
import {useTheme} from '@react-navigation/native';
const Header = (props: HeaderProps) => {
  const {textStyle, text, onPressBack, leftIcon} = props;
  const {rightIcon, rightIconStyle = {}, onPressRight} = props;
  const {colors} = useTheme();
  return (
    <View style={[style.row, {}]}>
      <IconView
        name={leftIcon ?? 'arrow-left'}
        style={{fontSize: 28, color: colors.text}}
        onPress={onPressBack}
      />
      <Text
        style={[styles.text, textStyle, {color: colors.text}]}
        numberOfLines={1}>
        {text ?? ''}
      </Text>
      {rightIcon?.length && (
        <IconView
          name={rightIcon ?? 'delte'}
          style={[{fontSize: 28, color: colors.primary}, rightIconStyle]}
          onPress={onPressRight}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 18,
    paddingHorizontal: 16,
  },
});
