'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import {
	Size
} from '../GlobalStyle.js';

import Grid from './Grid.js';
import Stack from './Stack.js';

const oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 生成一个[0, range)的随机数
 */
function random(range) {
	return Math.floor(Math.random() * range);
}

class GameBody extends Component {
	state = {
		stack: [9, 9, 9, 9, 9, 9, 9, 9, 9],
		data: [0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0],
		selectedIndex: null,
		selectedNum: null,
		gameOver: false,
	}
	fixedIndex = []

	clearSelectedCell() {
		if (this.state.gameOver) {
			return ;
		}
		const index = this.state.selectedIndex;
		const number = this.state.data[index];
		if (index != null && number != 0) {
			let data = this.state.data;
			data[index] = 0;
			this.setState({data: data});
			this.updateStack(number, 1);
		}
	}

	onCellPress(index) {
		const selectedNum = this.state.data[index];
		if (this.initState.data[index] != 0) {
			this.setState({selectedNum: selectedNum, selectedIndex: null});
		} else {
			this.setState({selectedIndex: index, selectedNum: null});
		}
	}

	onStackPress(number) {
		const { selectedNum, selectedIndex } = this.state;
		if (selectedIndex != null) {
			const currentNum = this.state.data[selectedIndex];
			if (currentNum == number) {
				return ;
			}

			if (this._isValid(number, selectedIndex)) {
				let data = this.state.data;
				data[selectedIndex] = number;
				this.setState({data: data});
				// 当前数字不为0，即进行替换操作，需要对当前数字的剩余数量+1
				if (currentNum != 0) {
					this.updateStack(currentNum, 1);
				}
				this.updateStack(number, -1);
				if (this.isGameOver()) {
					this.props.onGameOver && this.props.onGameOver();
					this.setState({gameOver: true});
				}
			}
		} else if (selectedNum != number) {
			this.setState({selectedNum: number});
		}
	}

	/**
	 * 通过判断数字剩余个数判断游戏是否结束
	 * @return {Boolean}
	 */
	isGameOver() {
		const stack = this.state.stack;
		for (let i = 0; i < 9; ++i) {
			if (stack[i] > 0) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 更新剩余数字数量
	 * 剩余数量 = 当前数量 + offset
	 * @return {[type]}        [description]
	 */
	updateStack(number, offset) {
		let stack = this.state.stack;
		let quantity = stack[number - 1];
		stack[number - 1] = quantity + offset;
		this.setState({stack: stack});
	}

	render() {
		const { data, stack, selectedIndex, selectedNum } = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.board}>
					{oneToNine.map(x => <Grid fixedIndex={this.fixedIndex} selectedIndex={selectedIndex} selectedNum={selectedNum} index={x - 1} data={data} onCellPress={this.onCellPress.bind(this)} key={x} style={styles.grid} />)}
				</View>
				<Stack onStackPress={this.onStackPress.bind(this)} remainingQuantity={stack} />
			</View>
		)
	}

	newGame() {
		let { stack, data } = this.state;
		for (let i = 0; i < 81; ++i) {
			data[i] = 0;
		}
		for (let i = 0; i < 9; ++i) {
			stack[i] = 9;
		}
		this.setState({stack: stack, data: data, selectedNum: null, selectedIndex: null, gameOver: false});
		for (var i = 0; i < 18; i++) {
			while(!this._putOneNumberRandom());
		}
		this.fixedIndex = []
		this.state.data.forEach((x, index) => {
			if (x != 0) {
				this.fixedIndex.push(index);
			}
		});
		console.log(this.fixedIndex);
		this.initState = {
			stack: this.state.stack.slice(),
			data: this.state.data.slice()
		};
	}

	/**
	 * 初始化数独使用:
	 * 向九宫格中随机放置一个数字
	 */
	_putOneNumberRandom() {
		const { stack, data } = this.state;

		let remainNumber = [];
		stack.forEach((value, index) => {
			if (value > 0) {
				remainNumber.push(index);
			}
		});
		if (remainNumber.length <= 0) {
			return ;
		}
		let number = remainNumber[random(remainNumber.length)] + 1;

		let blankPosition = []
		data.forEach((value, index) => {
			if (value == 0) {
				blankPosition.push(index);
			}
		});
		if (!this._isValid(number, blankPosition[random(blankPosition.length)])) {
			return false;
		}
		this.updateStack(number, -1);
		return true;
	}

	/**
	 * 检查是否可将number放置在index下
	 * @param  {Int}  number 要放置的数字
	 * @param  {Int}  index  放置的位置
	 * @return {Boolean}
	 */
	_isValid(number, index) {
		let data = this.state.data;
		const oldValue = data[index];
		data[index] = number;
		let row = Math.floor(index / 9),
				collum = index % 9,
				gridIndex = Math.floor(row / 3) * 3 + Math.floor(collum / 3);
		
		// 检查是否满足当前九宫格的要求
		let tmp = {}, offset = Math.floor(gridIndex / 3) * 27 + gridIndex % 3 * 3;
		for (var i = 0; i < 9; ++i) {
			let num = data[offset + Math.floor(i / 3) * 9 + i % 3];
			if (num != 0 && tmp[num]) {
				data[index] = oldValue;
				return false;
			}
			tmp[num] = true;
		}

		// 检查列
		tmp = {};
		for (var i = 0; i < 9; ++i) {
			let num = data[i * 9 + collum];
			if (num != 0 && tmp[num]) {
				data[index] = oldValue;
				return false;
			}
			tmp[num] = true;
		}

		// 检查行
		tmp = {};
		for (var i = 0; i < 9; ++i) {
			let num = data[row * 9 + i];
			if (num != 0 && tmp[num]) {
				data[index] = oldValue;
				return false;
			}
			tmp[num] = true;
		}

		return true;
	}

	restartGame() {
		this.setState({
			stack: this.initState.stack.slice(),
			data: this.initState.data.slice(),
			selectedIndex: null,
			selectedNum: null,
			gameOver: false,
		});
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
    justifyContent: 'space-around',
	}
})

export default GameBody;