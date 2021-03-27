import {StyleTypes} from './Components';

export interface TaskType {
  title?: string;
  tags?: string[];
}
export interface TaskCardType {
  item?: TaskType;
  index?: number;
  onPressItem?: (item?: TaskType, index?: number) => void;
}

export interface TagType {
  name?: string;
}

export interface TagViewType {
  item?: TagType;
  index?: number;
  isViewOnly?: boolean;
  isSelected?: boolean;
  tagStyle?: StyleTypes;
  tagTextStyle?: StyleTypes;
  onPress?: (item?: TagType, index?: number) => void;
  onDeletePress?: (item?: TagType, index?: number) => void;
}
