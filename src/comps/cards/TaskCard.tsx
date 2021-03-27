import {useTheme} from '@react-navigation/native';
import Style from '@utils/Style';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TaskCardType, TagType} from '../../types/Task';
import {getRandomColor} from '../../config/index';
import TagView from './TagView';

const TaskCard = (props: TaskCardType) => {
  const {item, index, onPressItem} = props;
  const {colors} = useTheme();
  const color = getRandomColor(index);
  const {tags = new Array(4).fill({name: 'fdfgf'})} = item;
  const tagList =
    tags.length > 2
      ? [tags[0], tags[1], {name: `${tags.length - 2} more >>`}]
      : tags;
  return (
    <TouchableOpacity
      style={[
        Style.row,
        styles.card,
        {
          backgroundColor: colors.card,
          borderBottomColor: color,
        },
      ]}
      onPress={() => onPressItem && onPressItem(item, index)}
      activeOpacity={0.6}>
      <View style={styles.content}>
        <Text style={{flex: 1}} numberOfLines={2}>
          This is title of the note This is title of the note
        </Text>
        <View style={[Style.row, {flex: 1}]}>
          {tagList.map((tag: TagType, index: number) => {
            return <TagView isSelected isViewOnly item={tag} index={index} />;
          })}
        </View>
      </View>
      <View style={[styles.rightCircle, {backgroundColor: color + '33'}]}>
        <Text numberOfLines={2} style={{color: colors.text}}>
          {'2\nm'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    maxHeight: 240,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
    borderBottomWidth: 1.5,
    justifyContent: 'space-around',
  },
  content: {flex: 1, justifyContent: 'space-around'},
  rightCircle: {
    width: 60,
    height: 60,

    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 8,
  },
});
