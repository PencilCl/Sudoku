'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import I18n from '../utils/i18n.js'

class StackCell extends Component {
	onPress() {
		this.props.onPress && this.props.onPress(this, this.props.number);
	}

	render() {
		let { number, quantity } = this.props;
		if (quantity == 0) {
			number = I18n.t("nil");
			quantity = 1;
		}
		const extraStyle = StyleSheet.create({
			style: {
				paddingTop: quantity,
				height: Size.width / 10 + quantity,
			}
		});
		return (
			<View style={[styles.wrapper, extraStyle.style]}>
				<TouchableOpacity onPress={this.onPress.bind(this)}>
					<View style={styles.container}>
						<Text style={styles.text}>{number}</Text>
					</View>
				</TouchableOpacity>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'moccasin',
		width: Size.width / 10 - 2,
		height: Size.width / 10 - 1,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		width: Size.width / 10,
		backgroundColor: 'orange',
		padding: 1,
		borderRadius: 3,
	},
	text: {
		fontSize: Size.width / 20,
	}
})

export default StackCell;
