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

	onCellPress(index) {
		this.props.onCellPress && this.props.onCellPress(index);
	}

	render() {
		const { style, data, index, selectedIndex, selectedNum, fixedIndex } = this.props;

		const offset = Math.floor(index / 3) * 27 + index % 3 * 3;
		let cell = [];
		for (var i = 0; i < 9; i++) {
			let cellIndex = offset + Math.floor(i / 3) * 9 + i % 3
			let number = data[cellIndex]
			cell.push(<Cell fixed={fixedIndex.indexOf(cellIndex) != -1} index={cellIndex} highlight={cellIndex == selectedIndex || number == selectedNum} key={i} onPress={this.onCellPress.bind(this)} number={number} />)
		}

		return (
			<View style={[styles.container, style]}>
				{cell}
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