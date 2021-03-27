import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TagViewType} from '../../types/Task';
import {useTheme} from '@react-navigation/native';
import IconView from '@comps/IconView';
import Style from '@utils/Style';

const TagView = (props: TagViewType) => {
  const {
    item,
    isViewOnly,
    isSelected,
    tagStyle = {},
    tagTextStyle = {},
  } = props;
  const {onPress, onDeletePress, index} = props;
  const {name} = item;
  const {colors} = useTheme();
  const bgColor = isSelected ? colors.primary : colors.primary + '50';
  return (
    <TouchableOpacity
      style={[
        styles.tagview,
        tagStyle,
        Style.row,
        {
          backgroundColor: bgColor,
        },
      ]}
      onPress={() => onPress && onPress(item, index)}>
      <Text style={[styles.tagText, tagTextStyle]} numberOfLines={1}>
        {name}
      </Text>
      {!isViewOnly && (
        <IconView
          name="close-circle"
          onPress={() => onDeletePress && onDeletePress(item, index)}
          style={[tagTextStyle, styles.tagDelete]}
        />
      )}
    </TouchableOpacity>
  );
};

export default TagView;
const styles = StyleSheet.create({
  tagDelete: {
    fontSize: 18,
    position: 'absolute',
    top: -6,
    right: 0,
    zIndex: 1000,
  },
  tagview: {
    width: 70,
    height: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    paddingVertical: 2,
  },
  tagText: {
    flex: 1,
    fontSize: 12,
    color: '#FFFFFF',
    textAlignVertical: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
});
