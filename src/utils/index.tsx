import {Platform, Dimensions} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
export const screenAnim = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
export const isAndroid = Platform.OS == 'android';
export const isIOS = Platform.OS == 'ios';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
