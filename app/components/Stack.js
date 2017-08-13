'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js';

import StackCell from './StackCell.js'

class Stack extends Component {

	onPress(stackCell, number) {
		this.props.onStackPress && this.props.onStackPress(number);
	}

	render() {
		const { remainingQuantity } = this.props;

		return (
			<View style={styles.container}>
				{remainingQuantity.map((x, index) => <StackCell onPress={this.onPress.bind(this)} key={index} number={index + 1} quantity={x} />)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: Size.width - 6,
		marginTop: 20
	}
})

export default Stack;
