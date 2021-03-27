import {TextStyle, ViewStyle} from 'react-native';
export interface StyleTypes extends TextStyle, ViewStyle {}
export interface ButtonPorps {
  style?: StyleTypes | StyleTypes[];
  textStyle?: StyleTypes;
  text?: string;
  iconOnly?: boolean;
  iconName?: string;
  onPress?: () => void;
  enable?: boolean;
}
export interface HeaderProps {
  style?: StyleTypes;
  textStyle?: StyleTypes;
  text?: string;
  leftIcon?: string;
  onPressBack?: () => void;
}
export interface LoaderState {
  show?: boolean;
}
export interface LoaderRefProps {
  show?: () => void;
  hide?: () => void;
}
export interface IconProps {
  name?: string;
  style?: StyleTypes;
  onPress?: () => void;
}
