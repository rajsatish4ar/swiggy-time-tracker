import {LOGO} from '@config';
import Style from '@utils/Style';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AppContext from '@comps/AppProvider';
import {ScreenFlow} from '@utils/Enums';
const Splash = () => {
  const {setScreenFlow} = React.useContext(AppContext);
  React.useEffect(() => {
    (async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) return setScreenFlow(ScreenFlow.App);
      setScreenFlow(ScreenFlow.Offline);
    })();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) return setScreenFlow(ScreenFlow.App);
      setScreenFlow(ScreenFlow.Offline);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={Style.container}>
      <Image source={LOGO} style={styles.img} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  img: {alignSelf: 'center', aspectRatio: 1 / 1, height: 150},
});
