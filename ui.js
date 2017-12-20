'use strict';

const {h, Component, Text} = require('ink');
const TextInput = require('ink-text-input');
const PropTypes = require('prop-types');
const exec = require('child_process').exec;

const formatNumber = number => number < 10 ? '0' + number : number;

class QuestionInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(props, state) {
		return (
			<div>
				{this.props.question} 

				<TextInput
					value={props.input}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

	handleChange(value) {
		this.props.onInputChange(value);
	}

	handleSubmit(value) {
		this.props.onInputSubmit(value);
	}
}

class UI extends Component {

	constructor(props) {
		super(props);

		this.state = {
			current: 0,
			input: '',
			results: {
				title:'',
				categories:'',
				tags:'',
			}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
		this.createPost = this.createPost.bind(this);
	}

	handleInputChange(value) {
		this.setState({
			input: value
		});
	}

	handleInputSubmit(value) {
		this.setState({
			current: this.state.current+1,
			input: '',
			results: {
				...this.state.results,
				[this.props.fields[this.state.current]]: value
			}
		});

		if (this.state.current+1 == 3) {
			setTimeout(this.createPost,0);
			setTimeout(this.props.unmount,100);
		}
	}

	createPost() {
		let now = new Date();
		let date = `${now.getFullYear()}-${formatNumber(now.getMonth()+1)}-${formatNumber(now.getDate())}`;
		let filename = date + '-' + this.state.results.title.split(' ').join('-') + '.md';
		let content = `---
layout: \"post\"
title: \"${this.state.results.title}\"
date: \"${date} ${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}\"
categories: ['${this.state.results.categories}']
tags: [\'${this.state.results.tags.split(',').reduce((prev,next)=>`${prev}','${next}`)}\']
published: True
---

<!--more-->

`;
		let command = `echo "${content}" >> ${filename}`;
		console.log(content);
		console.info("Created: ",filename);
		let execCallback = (error, stdout, stderr) => {
			if (error) console.log("exec error: " + error);
			if (stdout) console.log("Result: " + stdout);
			if (stderr) console.log("shell error: " + stderr);
			if (!error && !stderr) console.log("Congratulations!");
		};
		exec(command, execCallback);
	}

	render() {
		return (
			<div>
				<Text yellow>
					Blog title: {this.state.results.title}
				</Text>
				<br/>
				<Text red>
					Blog category: {this.state.results.categories}
				</Text>
				<br/>
				<Text pink>
					Blog tags: {this.state.results.tags}
				</Text>
				<br/>
				<QuestionInput question={this.props.questions[this.state.current]} input={this.state.input} onInputChange={this.handleInputChange} onInputSubmit={this.handleInputSubmit} />
			</div>
		);
	}
}

UI.defaultProps = {
	questions: [
		'Your post title: ',
		'Your post category: ',
		'Your post tags(divide by comma): ',
	],
	fields: [
		'title',
		'categories',
		'tags'
	]
};

module.exports = UI;
