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
	state = {
		highlight: false
	}

	setHighlight(highlight) {
		this.setState({
			highlight: highlight
		});
	}

	onPress() {
		this.props.onPress && this.props.onPress(this, this.props.index)
	}

	render() {
		const { number } = this.props;
		const { highlight } = this.state;
		const filled = typeof(number) == 'number';
		return (
			<TouchableOpacity onPress={this.onPress.bind(this)}>
				<View style={[styles.cell, highlight ? styles.highlightCell : (filled ? styles.filledCell : styles.unfilledCell)]}>
					<Text style={[highlight ? styles.text : styles.highlightText]}>{this.props.number}</Text>
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
	highlightCell: {
		backgroundColor: 'peru',
	},
	highlightText: {
		color: '#fff'
	},
	text: {
		color: 'white'
	},
})

export default Cell;