'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
  AppState,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import Timer from '../components/Timer.js';
import GameBody from '../components/GameBody.js';
import MenuModal from '../components/MenuModal.js';

class Main extends Component {

	state = {
		showMenu: true,
		modal: {
			newGameDisabled: false,
			continueDisabled: true,
			restartDisabled: true,
		},
		editing: false,
		playing: false,
	}

	handeleAppStateChange = (currentAppState) => {
	  if (currentAppState != 'active') this.showMenu();
	}

	componentDidMount() {
	  AppState.addEventListener('change', this.handeleAppStateChange);
	}

	componentWillUnmount() {
	  AppState.removeEventListener('change', this.handeleAppStateChange);
	}

	render() {
		const { showMenu, modal, editing } = this.state;

		return (
			<View style={styles.container} >
				<View style={styles.header} >
					<TouchableOpacity onPress={this.showMenu.bind(this)}>
						<Image style={styles.menuIcon} source={require('../images/menu.png')} />
					</TouchableOpacity>
					<Timer style={styles.timer} ref={timer => this.timer = timer} />
					<TouchableOpacity onPress={this.toggleEdit.bind(this)}>
						<Image style={[styles.menuIcon, editing && {tintColor: 'khaki'}]} source={require('../images/edit.png')} />
					</TouchableOpacity>
				</View>
				<GameBody onGameOver={this.onGameOver.bind(this)} ref={game => this.game = game} />
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
		this.state.playing && this.timer.pause();
		this.setState({showMenu: true});
	}

	hideMenu() {
		this.state.playing && this.timer.resume();
		this.setState({showMenu: false});
	}

	toggleEdit() {
		this.setState({editing: !this.state.editing});
	}

	onNewGame() {
		this.setState({playing: true, modal: {restartDisabled: false}});
		this.timer.start();
		this.hideMenu();
		this.game.newGame();
	}

	onContinue() {
		this.hideMenu();
	}

	onRestart() {
		this.hideMenu();
	}

	onGameOver() {
		console.log("game over");
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