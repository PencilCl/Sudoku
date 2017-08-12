'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
  StatusBar,
	View,
	Text,
} from 'react-native';

import Main from './containers/Main.js'

class App extends Component {
  render() {
    return (
      <View style={styles.container} >
        <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
      	<Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;