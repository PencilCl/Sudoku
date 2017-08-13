'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import Cell from './Cell.js'

const oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Grid extends Component {

	onCellPress(cell, index) {
		this.props.onCellPress && this.props.onCellPress(this, cell, index);
	}

	render() {
		const { style } = this.props;
		return (
			<View style={[styles.container, style]}>
				{oneToNine.map(x => <Cell key={x} onPress={this.onCellPress.bind(this)} number={x} />)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: Size.width * 3 / 10,
		marginTop: 3,
		marginBottom: 3,
	}
});

export default Grid;