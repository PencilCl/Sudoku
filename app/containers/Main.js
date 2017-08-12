'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import Timer from '../components/Timer.js'

class Main extends Component {

	render() {
		return (
			<View style={styles.container} >
				<View style={styles.header} >
					<Timer style={styles.timer} ref={timer => this.timer = timer} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black',
	},
	header: {
		width: Size.width,
	},
	timer: {
		color: '#fff',
		fontSize: Size.width * 3 / 40,
		alignSelf: 'center',
	}
});

export default Main;