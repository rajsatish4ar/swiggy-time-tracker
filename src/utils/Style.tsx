import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from '.';
import {Colors} from './Colors';
export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 24,
    paddingTop: 8,
    alignSelf: 'center',
    width: deviceWidth,
    height: deviceHeight,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.color_transparent80,
    padding: 24,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeContainer: {flex: 1},
});
