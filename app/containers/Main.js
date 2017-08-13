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

import Timer from '../components/Timer.js';
import GameBody from '../components/GameBody.js';
import MenuModal from '../components/MenuModal.js';

class Main extends Component {

	state = {
		showMenu: false,
		modal: {
			newGameDisabled: false,
			continueDisabled: true,
			restartDisabled: false,
		}
	}

	render() {
		const { showMenu, modal } = this.state;

		return (
			<View style={styles.container} >
				<View style={styles.header} >
					<TouchableOpacity onPress={this.showMenu.bind(this)}>
						<Image style={styles.menuIcon} source={require('../images/menu.png')} />
					</TouchableOpacity>
					<Timer style={styles.timer} ref={timer => this.timer = timer} />
					<TouchableOpacity onPress={this.toggleEdit}>
						<Image style={styles.menuIcon} source={require('../images/edit.png')} />
					</TouchableOpacity>
				</View>
				<GameBody />
				<MenuModal {...modal}
					onRequestClose={this.hideMenu.bind(this)}
					show={showMenu}
					onNewGame={this.onNewGame.bind(this)}
					onContinue={this.onContinue.bind(this)}
					onRestart={this.onRestart.bind(this)} />
			</View>
		)
	}

	showMenu() {
		this.setState({showMenu: true});
	}

	hideMenu() {
		this.setState({showMenu: false});
	}

	toggleEdit() {

	}

	onNewGame() {
		this.hideMenu();
	}

	onContinue() {
		this.hideMenu();
	}

	onRestart() {
		this.hideMenu();
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'cadetblue',
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