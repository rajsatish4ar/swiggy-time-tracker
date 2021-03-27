import {TextStyle, ViewStyle} from 'react-native';
export interface StyleTypes extends TextStyle, ViewStyle {}
export interface ButtonPorps {
  style?: StyleTypes | StyleTypes[];
  textStyle?: StyleTypes | StyleTypes[];
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
  rightIcon?: string;
  rightIconStyle?: StyleTypes;
  onPressRight?: () => void;
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

export interface ToastState {
  show?: boolean;
  msg?: string | undefined;
}
export interface ToastRefProps {
  show?: (msg: string) => void;
  hide?: () => void;
}
