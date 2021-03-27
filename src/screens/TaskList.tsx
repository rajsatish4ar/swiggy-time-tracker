import Style from '@utils/Style';
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import TaskCard from '@comps/cards/TaskCard';
import {TaskType, TaskCardType} from '../types/Task';
import {useTheme} from '@react-navigation/native';
import Root from '@utils/Root';
import EmptyView from '@comps/EmptyView';
import Button from '@comps/Button';

const TaskList = props => {
  const {colors} = useTheme();
  const data: TaskType[] = new Array(15).fill({});

  const renderItem = ({item, index}: TaskCardType) => {
    return (
      <TaskCard
        item={item}
        index={index}
        onPressItem={() => {
          Root.navigate('TaskDetails');
        }}
      />
    );
  };
  return (
    <View style={Style.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={EmptyView}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
      />
      <Button
        iconOnly
        iconName="plus"
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default TaskList;
const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 27,
    position: 'absolute',
    bottom: 40,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {fontSize: 24, color: 'white'},
});
