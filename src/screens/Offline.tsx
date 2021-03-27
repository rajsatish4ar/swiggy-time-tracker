import {deviceWidth} from '@utils';
import Style from '@utils/Style';
import React from 'react';
import {View, Text, Image} from 'react-native';

const Offline = () => {
  return (
    <View style={Style.container}>
      <Image
        source={require('@assets/img/off.png')}
        style={{width: deviceWidth - 48}}
        resizeMode="contain"
      />
      <Text style={{width: '100%', textAlign: 'center', fontSize: 18}}>
        {'No internet Try again'}
      </Text>
    </View>
  );
};

export default Offline;
