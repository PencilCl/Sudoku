'use strict';

import React, { Component } from 'react'

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js'

class Cell extends Component {
	onPress() {
		this.props.onPress && this.props.onPress(this.props.index)
	}

	render() {
		const { number, highlight, fixed } = this.props;
		const filled = number != 0;
		return (
			<TouchableOpacity onPress={this.onPress.bind(this)}>
				<View style={[styles.cell, highlight ? styles.highlightCell : (fixed ? styles.fixedCell : (filled ? styles.filledCell : styles.unfilledCell))]}>
					{filled && <Text style={[highlight ? styles.highlightText : null]}>{this.props.number}</Text>}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	cell: {
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'orange',
		borderWidth: 1,
		width: Size.width / 10,
		height: Size.width / 10,
	},
	unfilledCell: {
		backgroundColor: 'lightyellow',
	},
	filledCell: {
		backgroundColor: 'moccasin',
	},
	fixedCell: {
		backgroundColor: 'khaki',
	},
	highlightCell: {
		backgroundColor: 'peru',
	},
	highlightText: {
		color: '#fff'
	},
	text: {
		fontSize: Size.width / 20,
	},
})

export default Cell;