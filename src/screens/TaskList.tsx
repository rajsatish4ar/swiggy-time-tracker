import Style from '@utils/Style';
import React from 'react';
import {View, TextInput, FlatList, StyleSheet} from 'react-native';
import TaskCard from '@comps/cards/TaskCard';
import {TaskType, TaskCardType} from '../types/Task';
import {useTheme} from '@react-navigation/native';
import Root from '@utils/Root';
import EmptyView from '@comps/EmptyView';
import Button from '@comps/Button';
import {useQuery} from '@apollo/client';
import {GET_TASKS} from '@utils/Queries';
import moment from 'moment';
import AppContext from '@comps/AppProvider';
const TaskList = props => {
  const newlyAddedItemId = props?.route?.params?.id;
  const {colors} = useTheme();
  const {toggleTheme} = React.useContext(AppContext);
  const inputRef = React.createRef<TextInput>();
  const {loading, error, data} = useQuery(GET_TASKS);
  const [taskList, setTaskList] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [query, setQuery] = React.useState('');
  React.useEffect(() => {
    if (loading) return Root.showLoader();
    if (!data && !error) return;
    if (!loading) {
      Root.hideLoader();
      setTaskList(data?.tasks ?? []);
      setTasks(data?.tasks ?? []);
    }
    if (error) Root.showToast(error?.message);
  }, [loading]);
  React.useEffect(() => {
    const data = props?.route?.params ?? {};
    //insert
    if (data?.id && data?.isInsert) {
      setTasks(list => [...list, data]);
      return setTaskList(list => [...list, data]);
    }
    // update
    if (data?.id && data?.isUpdate) {
      const list = [];
      taskList.map((item: TaskType, index) => {
        if (item.id === data?.id) {
          if (data.startTime)
            item.start_time = moment(data.startTime, '').format();
          if (data.endTime) item.end_time = moment(data.endTime).format();
          list.push({...item, ...data});
        } else list.push(item);
      });
      setTaskList([]);
      setTaskList(list);
      setTasks([]);
      setTasks(list);
      return;
    }
    // delet
    if (data?.id && data?.isDelete) {
      const list = taskList.filter((item, index) => item?.id !== data?.id);
      setTasks(list);
      setTaskList(list);
    }
  }, [newlyAddedItemId]);

  const onQuery = (q?: string) => {
    if (!q || q.trim().length == 0) {
      setTasks(taskList);
      return;
    }
    const list = taskList.filter((item, index) => {
      const txt = item?.title + item?.tags?.map((it, i) => it?.name ?? '') + '';
      return txt.toLowerCase().includes(q.toLowerCase());
    });
    setTasks(list);
  };

  const renderItem = ({item, index}: TaskCardType) => {
    return (
      <TaskCard
        item={item}
        index={index}
        onPressItem={() => {
          inputRef?.current?.clear();
          setTasks(taskList);
          Root.navigate('TaskDetails', item);
        }}
      />
    );
  };
  return (
    <View style={Style.container}>
      <TextInput
        ref={inputRef}
        placeholder={'Search here ...'}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onChangeText={q => {
          onQuery(q);
        }}
        underlineColorAndroid={'transparent'}
        placeholderTextColor={colors.text + '60'}
      />
      <FlatList
        data={tasks}
        extraData={tasks.length || taskList.length}
        renderItem={renderItem}
        ListEmptyComponent={EmptyView}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.id}
      />
      <Button
        iconOnly
        iconName="plus"
        style={styles.button}
        textStyle={[styles.buttonText, {color: colors.text}]}
        onPress={() => {
          inputRef?.current?.clear();
          setTasks(taskList);
          Root.navigate('TaskDetails');
        }}
      />
      <Button
        iconOnly
        iconName="brightness-4"
        style={styles.buttonLeft}
        textStyle={[styles.buttonText, {color: colors.text}]}
        onPress={() => {
          toggleTheme();
        }}
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
    zIndex: 1000,
  },
  buttonLeft: {
    width: 56,
    height: 56,
    borderRadius: 27,
    position: 'absolute',
    bottom: 40,
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 1000,
  },
  buttonText: {fontSize: 24, color: 'white'},
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 24,
    backgroundColor: 'white',
  },
});
