'use strict';

const importJsx = require('import-jsx');
const {h, Component, Text} = require('ink');
const QuestionInput = importJsx('./QuestionInput');
const TextList = importJsx('./TextList');
const PropTypes = require('prop-types');
const {formatNumber, createPost} = require('../utils');

class App extends Component {

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
	}

	handleInputChange(value) {
		this.setState({
			input: value
		});
	}

	handleInputSubmit(value) {
		this.setState({
			current: this.state.current + 1,
			input: '',
			results: {
				...this.state.results,
				[this.props.fields[this.state.current]]: value
			}
		});
	}

	componentDidUpdate() {
		if (this.state.current + 1 > 3) {
			createPost(this.state.results, this.props.open);
			this.props.unmount();
		}
	}

	render(props,state) {
		return (
			<div>
				<QuestionInput description={props.descriptions[state.current]} input={state.input} onInputChange={this.handleInputChange} onInputSubmit={this.handleInputSubmit} />
				<TextList {...this.state.results} />
			</div>
		);
	}
}

App.propTypes = {
	descriptions: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired
};

App.defaultProps = {
	descriptions: [
		'Your post title: ',
		'Your post category: ',
		'Your post tags(divide by comma): ',
		'Created!'
	],
	fields: [
		'title',
		'categories',
		'tags'
	]
};

module.exports = App;
