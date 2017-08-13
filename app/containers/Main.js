'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import Timer from '../components/Timer.js'
import GameBody from '../components/GameBody.js'

class Main extends Component {

	render() {
		return (
			<View style={styles.container} >
				<View style={styles.header} >
					<TouchableOpacity onPress={this.showMenu}>
						<Image style={styles.menuIcon} source={require('../images/menu.png')} />
					</TouchableOpacity>
					<Timer style={styles.timer} ref={timer => this.timer = timer} />
					<TouchableOpacity onPress={this.toggleEdit}>
						<Image style={styles.menuIcon} source={require('../images/edit.png')} />
					</TouchableOpacity>
				</View>
				<GameBody />
			</View>
		)
	}

	showMenu() {

	}

	toggleEdit() {

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
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	timer: {
		color: '#fff',
		fontSize: Size.width * 3 / 40,
		alignSelf: 'center',
	},
	menuIcon: {
		width: Size.width * 3 / 40,
		height: Size.width * 3 / 40
	}
});

export default Main;