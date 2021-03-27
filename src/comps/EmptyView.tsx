import {deviceWidth} from '@utils';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
const EmptyView = () => {
  return (
    <View style={styles.view}>
      <Image
        source={require('@assets/img/empty.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  view: {flex: 1},
  image: {width: deviceWidth, alignSelf: 'center'},
});
