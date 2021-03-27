import Header from '@comps/Header';
import Root from '@utils/Root';
import Style from '@utils/Style';
import React from 'react';
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Button from '@comps/Button';
import {TaskCardType, TagType, TagViewType} from '../types/Task';
import TagView from '@comps/cards/TagView';
import {deviceWidth} from '@utils';
const TaskDetails = props => {
  const {colors} = useTheme();
  const tags = new Array(14).fill({name: 'fdfgf'});

  const renderTagItem = ({item, index}: TagViewType) => {
    return (
      <View style={{marginVertical: 4}}>
        <TagView item={item} index={index} tagStyle={{height: 30}} />
      </View>
    );
  };
  return (
    <View style={[Style.container, {justifyContent: null}]}>
      <Header text="Task" onPressBack={() => Root.goBack()} />
      <View style={styles.content}>
        <TextInput
          placeholder={'Enter title '}
          style={[
            styles.input,
            {color: colors.text, borderColor: colors.border},
          ]}
          multiline
          underlineColorAndroid={'transparent'}
          placeholderTextColor={colors.text + '60'}
        />

        <Button
          style={[styles.timeButton, {borderColor: colors.primary}]}
          textStyle={{color: colors.primary}}
          text="Start time"
        />
        <Button
          style={[styles.timeButton, {borderColor: colors.primary}]}
          textStyle={{color: colors.primary}}
          text="End time"
        />

        <FlatList
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
          data={tags}
          numColumns={Math.floor((deviceWidth - 48) / 70)}
          renderItem={renderTagItem}
          ListFooterComponent={() => {
            return (
              <Button
                text="Add Tags"
                style={[styles.timeButton, {borderColor: colors.primary}]}
                textStyle={{color: colors.primary}}
              />
            );
          }}
          ListFooterComponentStyle={styles.listFooter}
          ListHeaderComponentStyle={styles.listHeader}
        />
      </View>
      <Button text="Submit" textStyle={{color: '#ffffff'}} />
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
    minHeight: 100,
    marginVertical: 24,
  },
  timeButton: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
  },
  timeButtonText: {},
});
