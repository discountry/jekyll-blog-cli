'use strict';

const {h, Component} = require('ink');
const TextInput = require('ink-text-input');

class QuestionInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render({description, input}) {
		return (
			<div>
				{description} 

				<TextInput
					value={input}
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

module.exports = QuestionInput;

