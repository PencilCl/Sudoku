'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Modal,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js';

import I18n from '../utils/i18n.js';

class MenuModal extends Component {
	render() {
		const { newGameDisabled, continueDisabled, restartDisabled } = this.props;
		const { onNewGame, onContinue, onRestart } = this.props;

		return (
			<Modal
				animationType={"slide"}
				transparent={true}
				visible={this.props.show}
				onRequestClose={this.props.onRequestClose}>
				<View style={styles.container}>
					<Text style={styles.title}>{I18n.t("name")}</Text>
					<TouchableOpacity onPress={onNewGame} style={styles.button} disabled={newGameDisabled}>
						<Text style={[styles.buttonText, newGameDisabled && styles.buttonDisable]}>{I18n.t('newGame')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onContinue} style={styles.button} disabled={continueDisabled}>
						<Text style={[styles.buttonText, continueDisabled && styles.buttonDisable]}>{I18n.t('continue')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onRestart} style={styles.button} disabled={restartDisabled}>
						<Text style={[styles.buttonText, restartDisabled && styles.buttonDisable]}>{I18n.t('restart')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.closeButton} onPress={this.props.onRequestClose}>
						<Image style={styles.menuIcon} source={require('../images/close.png')} />
					</TouchableOpacity>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'teal',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		position: 'absolute',
		top: 50,
		color: '#fff',
		textAlign: 'center',
		fontSize: Size.width / 10,
	},
	button: {
		padding: 10,
	},
	buttonDisable: {
		opacity: 0.8
	},
	buttonText: {
		color: '#fff',
		fontSize: Size.width / 15,
	},
	closeButton: {
		position: 'absolute',
		bottom: 30,
	}
});

export default MenuModal;