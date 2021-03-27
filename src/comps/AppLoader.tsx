import style from '@utils/Style';
import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {LoaderState, LoaderRefProps} from '../types/Components';
import {Colors} from '@utils/Colors';
export default class Loader extends Component<LoaderRefProps, LoaderState> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => !this.state.show && this.setState({show: true});
  hide = () => this.state.show && this.setState({show: false});
  render() {
    if (!this.state.show) return null;
    return (
      <Modal visible={this.state.show} transparent>
        <View style={[style.loaderContainer]}>
          <ActivityIndicator color={Colors.color_primary} />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({});
