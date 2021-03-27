import {StyleTypes} from './Components';

export interface TaskType {
  id?: number;
  title?: string;
  start_time?: string;
  end_time?: string;
  tags?: string[];
}
export interface TaskCardType {
  item?: TaskType;
  index?: number;
  onPressItem?: (item?: TaskType, index?: number) => void;
}

export interface TagType {
  id?: number;
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

export interface TaskFromType {
  title?: string;
  startTime?: number;
  endTime?: number;
  tagName?: string;
  tags?: number[] | [];
}
