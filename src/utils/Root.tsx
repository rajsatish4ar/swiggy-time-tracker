import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {LoaderRefProps} from '../types/Components';
export const rootRef = React.createRef<NavigationContainerRef>();
export const loaderRef = React.createRef<LoaderRefProps>();

const navigate = (name?: string, params?: object) =>
  rootRef?.current?.navigate(name, params ?? {});
const goBack = () => rootRef?.current?.goBack();

const showLoader = () => loaderRef?.current?.show();
const hideLoader = () => loaderRef?.current?.hide();

export default {
  showLoader,
  hideLoader,
  goBack,
  navigate,
};
