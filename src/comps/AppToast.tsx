import style from '@utils/Style';
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ToastState, ToastRefProps} from '../types/Components';
import {Colors} from '@utils/Colors';
export default class AppToast extends Component<ToastRefProps, ToastState> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      msg: undefined,
    };
  }
  show = (msg: string) => {
    if (this.state.show) this.hide();
    this.setState({show: true, msg});
    setTimeout(() => {
      this.hide();
    }, 2000);
  };
  hide = () => this.state.show && this.setState({show: false, msg: undefined});
  render() {
    const {msg, show} = this.state;
    if (!show || !msg) return null;
    return (
      <View style={[styles.toastContainer]}>
        <Text style={{color: 'white'}}>{msg}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  toastContainer: {
    height: 56,
    width: '90%',
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.color_primary,
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
  },
});
