import {useTheme} from '@react-navigation/native';
import Style from '@utils/Style';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TaskCardType, TagType} from '../../types/Task';
import {getRandomColor} from '../../config/index';
import TagView from './TagView';
import moment from 'moment';
const TaskCard = (props: TaskCardType) => {
  const {item, index, onPressItem} = props;
  const {colors} = useTheme();
  const color = getRandomColor(index);
  const {tags = new Array(4).fill({name: 'fdfgf'})} = item;
  const tagList =
    tags.length > 2
      ? [tags[0], tags[1], {name: `${tags.length - 2} more >>`}]
      : tags;
  const {title, start_time, end_time} = item;
  const start = start_time ? moment(start_time).format('ll LT') : '';
  const end = end_time ? moment(end_time).format('ll LT') : '';
  let timediff = '';
  if (start?.length && end?.length) {
    const mstart = moment(start_time);
    const mend = moment(end_time);
    const diff = moment.duration(mend.diff(mstart));
    const asHour = Math.floor(diff.asHours());
    const asDay = Math.floor(diff.asDays());
    const asSec = Math.floor(diff.asSeconds());
    const asMinut = Math.floor(diff.asMinutes());
    const asMonth = Math.floor(diff.asMonths());
    const asYear = Math.floor(diff.asYears());
    if (asSec) timediff = asSec + '\nsec';
    if (asMinut) timediff = asMinut + '\nmin';
    if (asHour) timediff = asHour + '\nhour';
    if (asDay) timediff = asDay + '\nday';
    if (asMonth) timediff = asMonth + '\nmonth';
    if (asYear) timediff = asYear + '\nyear';
  }
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
          {title ?? ''}
        </Text>
        <View style={[Style.row, {flex: 1}]}>
          {tagList.map((tag: TagType, index: number) => {
            return <TagView isSelected isViewOnly item={tag} index={index} />;
          })}
        </View>
        {start?.length > 0 && (
          <Text style={{flex: 1}} numberOfLines={2}>
            {`Start Time ${start}`}
          </Text>
        )}
        {end_time?.length > 0 && (
          <Text style={{flex: 1}} numberOfLines={2}>
            {`End Time ${end}`}
          </Text>
        )}
      </View>
      {timediff.length > 0 && (
        <View style={[styles.rightCircle, {backgroundColor: color + '33'}]}>
          <Text
            numberOfLines={2}
            style={{color: colors.text, fontSize: 10, textAlign: 'center'}}>
            {`${timediff}`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskCard;
const styles = StyleSheet.create({
  card: {
    minHeight: 120,
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
