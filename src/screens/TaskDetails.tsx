import Header from '@comps/Header';
import Root from '@utils/Root';
import Style from '@utils/Style';
import React from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Button from '@comps/Button';
import {TaskCardType, TagType, TagViewType, TaskFromType} from '../types/Task';
import TagView from '@comps/cards/TagView';
import {deviceWidth} from '@utils';
import {useMutation, useQuery} from '@apollo/client';
import {ADD_TASK, UPDATE_TASK} from '@utils/Queries';
import {
  DELETE_TASK,
  GET_ALL_TAGS,
  INSERT_TAG,
  DELETE_TAG,
} from '../utils/Queries';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Alert} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import moment from 'moment';
import momentz from 'moment-timezone';
const TaskDetails = props => {
  const {colors} = useTheme();
  const [showStartDate, setShowStartDate] = React.useState(false);
  const [showEndDate, setShowEndDate] = React.useState(false);
  const params = props?.route?.params;
  const [addOneTask, {loading, error, data}] = useMutation(ADD_TASK);
  const [updateTask, updateRes] = useMutation(UPDATE_TASK);
  const [insertTag, insertTagRes] = useMutation(INSERT_TAG);
  const [deleteTag, deleteTagRes] = useMutation(DELETE_TAG);
  const [deleteTask, deleteRes] = useMutation(DELETE_TASK);
  const tagRes = useQuery(GET_ALL_TAGS);
  const [tagList, setTagList] = React.useState([]);
  const [form, setForm] = React.useState<TaskFromType>({});
  // insert task
  React.useEffect(() => {
    if (loading) return Root.showLoader();
    if (!data && !error) return;
    if (!loading) {
      Root.hideLoader();
      setForm(f => ({...f, title: ''}));
      Root.navigate('TaskList', {
        ...(data?.insert_tasks_one ?? {}),
        isInsert: true,
      });
    }
    if (error) Root.showToast(error?.message);
  }, [loading]);

  // update task
  React.useEffect(() => {
    if (updateRes?.loading) return Root.showLoader();
    if (!updateRes?.data && !updateRes?.error) return;
    if (!updateRes?.loading) {
      Root.hideLoader();
      setForm(f => ({...f, title: ''}));
      Root.navigate('TaskList', {
        ...(updateRes?.data?.update_tasks?.returning?.[0] ?? {}),
        isUpdate: true,
      });
    }
    if (updateRes?.error?.message) Root.showToast(updateRes.error.message);
  }, [updateRes?.loading]);

  // delete task
  React.useEffect(() => {
    if (deleteRes?.loading) return Root.showLoader();
    if (!deleteRes?.data && !deleteRes?.error) return;
    if (!deleteRes?.loading) {
      Root.hideLoader();
      Root.navigate('TaskList', {
        id: params?.id,
        isDelete: true,
      });
    }
    if (deleteRes?.error?.message) Root.showToast(deleteRes.error.message);
  }, [deleteRes?.loading]);

  // get all tags
  React.useEffect(() => {
    if (tagRes?.loading) return Root.showLoader();
    if (!tagRes?.data && !tagRes?.error) return;
    if (!tagRes?.loading) {
      Root.hideLoader();
      const list = tagRes?.data?.tags ?? [];
      setTagList(list);
    }
    if (tagRes?.error?.message) Root.showToast(tagRes.error.message);
  }, [tagRes?.loading]);

  // add tag
  React.useEffect(() => {
    if (insertTagRes?.loading) return Root.showLoader();
    if (!insertTagRes?.data && !tagRes?.error) return;
    if (!insertTagRes?.loading) {
      Root.hideLoader();
      const newTag = insertTagRes?.data?.insert_tags_one;
      if (newTag?.id) setTagList(list => [...list, newTag]);
    }
    if (insertTagRes?.error?.message)
      Root.showToast(insertTagRes.error.message);
  }, [insertTagRes?.loading]);

  // delete tag
  React.useEffect(() => {
    if (deleteTagRes?.loading) return Root.showLoader();
    if (!deleteTagRes?.data && !tagRes?.error) return;
    if (!deleteTagRes?.loading) {
      Root.hideLoader();
      const delTag = deleteTagRes?.data?.delete_tags?.returning?.[0] ?? {};
      if (delTag?.id) {
        const tags = form?.tags?.filter(item => item?.id !== delTag?.id);
        const allTags = tagList?.filter(item => item?.id !== delTag?.id);
        setTagList(allTags);
        setForm(f => ({...f, tags}));
      }
    }
    if (deleteTagRes?.error?.message)
      Root.showToast(deleteTagRes.error.message);
  }, [deleteTagRes?.loading]);

  // for editing the task
  React.useEffect(() => {
    if (params?.id) {
      const tags = params?.tags?.map((item, index) => item?.id);
      const data: TaskFromType = {};
      if (params?.start_time) {
        const startTime = moment(new Date(params.start_time))
          .toDate()
          .getTime();
        data.startTime = startTime;
      }
      if (params?.end_time) {
        const endTime = moment(new Date(params.end_time)).toDate().getTime();
        data.endTime = endTime;
      }
      setForm(form => ({...form, tags, title: params?.title, ...data}));
    }
  }, [params?.id]);

  const addTask = () => {
    interface tagIdType {
      tag_id: number;
    }
    let payload: {
      id?: number;
      data?: tagIdType[];
      title?: string;
      start?: string;
      end?: string;
    } = {};
    if (!form?.title?.length) return Alert.alert('', 'Enter title ');
    const ids = form?.tags?.map(id => ({tag_id: id}));
    payload = {title: form.title};

    if (form?.startTime)
      payload.start = momentz(form?.startTime).tz('Asia/Kolkata').format();
    if (form?.endTime)
      payload.end = momentz(form?.endTime).tz('Asia/Kolkata').format();
    if (ids?.length) payload.data = ids;
    if (params?.id) {
      payload.id = params?.id;
      return updateTask({variables: payload});
    } else {
      addOneTask({variables: payload});
    }
  };

  const renderTagItem = ({item, index}: TagViewType) => {
    const isSelected = form?.tags?.includes(item?.id);
    return (
      <View style={{marginVertical: 4}}>
        <TagView
          item={item}
          isSelected={isSelected}
          index={index}
          tagStyle={{height: 30}}
          onPress={(item, itemIndex) => {
            let tags = form?.tags ?? [];
            if (isSelected)
              tags = form?.tags?.filter((it, index) => index !== itemIndex);
            else tags.push(item?.id);
            setForm(form => ({...form, tags}));
          }}
          onDeletePress={() => {
            Alert.alert('', 'Are you sure to delete the tag', [
              {
                text: 'Yes',
                onPress: () => deleteTag({variables: {id: item?.id}}),
              },
              {
                text: 'No',
                onPress: () => {},
              },
            ]);
          }}
        />
      </View>
    );
  };

  const [visible, setVisible] = React.useState<boolean>(false);

  const footerItem = () => {
    return (
      <Button
        text="Add Tags"
        style={[styles.timeButton, {borderColor: colors.primary}]}
        textStyle={{color: colors.primary}}
        onPress={() => setVisible(true)}
      />
    );
  };
  return (
    <View style={[Style.container, {justifyContent: null}]}>
      <Header
        text="Task"
        onPressBack={() => Root.goBack()}
        rightIcon={params?.id ? 'delete' : undefined}
        onPressRight={() => {
          Alert.alert('', 'Are you sure to delete the task', [
            {
              text: 'Yes',
              onPress: () => deleteTask({variables: {id: params?.id}}),
            },
            {
              text: 'No',
              onPress: () => {},
            },
          ]);
        }}
      />
      <View style={styles.content}>
        <TextInput
          placeholder={'Enter title '}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          multiline
          value={form?.title}
          onChangeText={title => setForm(form => ({...form, title}))}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={colors.text + '60'}
        />

        <Button
          style={[styles.timeButton, {borderColor: colors.primary}]}
          textStyle={{color: colors.primary}}
          text={
            form?.startTime
              ? moment(new Date(form.startTime)).format('LLL')
              : 'Start time'
          }
          onPress={() => setShowStartDate(true)}
        />
        <Button
          style={[styles.timeButton, {borderColor: colors.primary}]}
          textStyle={{color: colors.primary}}
          text={
            form?.endTime
              ? moment(new Date(form.endTime)).format('LLL')
              : 'End time'
          }
          onPress={() => setShowEndDate(true)}
        />

        <FlatList
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={[
            styles.listContainer,
            {borderColor: colors.primary},
          ]}
          ListHeaderComponent={() => {
            return (
              <Text
                style={{
                  fontWeight: '700',
                  color: colors.text,
                  paddingHorizontal: 4,
                }}>
                Select Tags
              </Text>
            );
          }}
          data={tagList}
          numColumns={Math.floor((deviceWidth - 48) / 70)}
          renderItem={renderTagItem}
          ListFooterComponent={footerItem}
          ListFooterComponentStyle={styles.listFooter}
          ListHeaderComponentStyle={styles.listHeader}
        />

        <DialogInput
          isDialogVisible={visible}
          title={'Add new tag'}
          hintInput={'enter tag name'}
          submitInput={name => {
            if (name.length) {
              setVisible(false);
              insertTag({variables: {name: name}});
            }
          }}
          closeDialog={() => setVisible(false)}
        />
        <DateTimePickerModal
          isVisible={showStartDate}
          mode="datetime"
          date={form?.startTime ? moment(form.startTime).toDate() : new Date()}
          minimumDate={new Date()}
          onConfirm={startDate => {
            const m = moment(startDate);
            const ddd = momentz(form?.startTime)
              .tz('Asia/Kolkata')
              .toISOString();
            setForm(f => ({...f, startTime: m.toDate().getTime()}));

            setShowStartDate(false);
          }}
          onCancel={() => setShowStartDate(false)}
        />
        <DateTimePickerModal
          isVisible={showEndDate}
          mode="datetime"
          date={form?.endTime ? moment(form.endTime).toDate() : new Date()}
          minimumDate={new Date()}
          onConfirm={endDate => {
            const m = moment(endDate);
            setForm(f => ({...f, endTime: m.toDate().getTime()}));
            setShowEndDate(false);
          }}
          onCancel={() => setShowEndDate(false)}
        />
      </View>
      <Button text="Submit" textStyle={{color: '#ffffff'}} onPress={addTask} />
    </View>
  );
};

export default TaskDetails;
const styles = StyleSheet.create({
  content: {flex: 1, paddingVertical: 16},
  listContainer: {
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderStyle: 'dashed',
  },
  listFooter: {
    marginTop: 24,
  },
  listHeader: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 24,
  },
  input2: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 4,
  },
  timeButton: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
  },
  timeButtonText: {},
});
