'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

function formatTime(millisecond) {
	const tmp = Math.floor(millisecond / 1000);
	const hours = Math.floor(tmp / 60 / 60);
	const minutes = Math.floor(tmp / 60) % 60;
	const second = Math.floor(tmp % 60);
	return [hours, minutes, second].map(x => x < 10 ? '0' + x : x).join(":");
}

class Timer extends Component {
	state = {
		elapsed: 0,
		paused: false
	}

	start() {
		this.interval && clearInterval(this.interval);
		this.setState({elapsed: 0, paused: false});
		this.interval = setInterval(() => {
			if (this.state.paused) {
				return ;
			}
			this.setState({elapsed: this.state.elapsed + 100});
		}, 100);
	}

	pause() {
		this.setState({
			paused: true
		});
		return this.state.elapsed;
	}

	resume() {
		this.setState({
			paused: false
		});
	}

	setElapsed(elapsed) {
		this.setState({elapsed: elapsed});
	}

	render() {
		const { style } = this.props;
		return (
			<Text style={[styles.text, style]}>{formatTime(this.state.elapsed)}</Text>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '100',
		fontFamily: 'Menlo',
	}
});

export default Timer;