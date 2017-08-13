'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

import Grid from './Grid.js'

const oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class GameBody extends Component {
	onCellPress(grid, cell, index) {
		this.highlightCell && this.highlightCell.setHighlight(false);
		cell.setHighlight(true);
		this.highlightCell = cell;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.board}>
					{oneToNine.map(x => <Grid onCellPress={this.onCellPress.bind(this)} key={x} style={styles.grid} />)}
				</View>
			</View>
		)
	}

	newGame() {

	}

	restart() {

	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignItems: 'center',
		width: Size.width * 28 / 30
	},
	board: {
		backgroundColor: 'orange',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
	}
})

export default GameBody;