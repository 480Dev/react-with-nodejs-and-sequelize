import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class BandForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			title: '',
			year: '',
			errors: {},
			loading: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// console.log('form componentDidMount');
		// console.log(this.props);
		this.setState({
			id: (this.props.band) ? this.props.band.id : '',
			title: (this.props.band) ? this.props.band.title : '',
			year: (this.props.band) ? this.props.band.year : ''
		});
	}

	componentWillReceiveProps = (nextProps) => {
		// console.log('form componentWillReceiveProps');
		// console.log(nextProps);
		this.setState({
			id: nextProps.band.id,
			title: nextProps.band.title,
			year: nextProps.band.year
		});
	}

	focusFieldOnError(errors) {
		// errors.map(item => {
		// 	if (item && item.)
		// })
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		// Validation --------------------------------------------------
		let errors = {};
		if (this.state.title === '') errors.title = "This field can't be empty";
		if (this.state.year === '') errors.year = "This field can't be empty";
		// Fill the error state
		this.setState({ errors });
		// Focus 1st error field
		//if (Object.keys(errors).count > 0) focusFieldOnError(errors);
		// -------------------------------------------------------------

		const isValid = Object.keys(errors).length === 0;

		if (isValid) {
			const { id, title, year } = this.state;

			this.setState({ loading: true });
			console.log(this.props);
			this.props.saveBand({ id, title, year });
			// .catch((err) => {
			// 	err.response.json().then(({errors}) => {
			// 		this.setState({ errors, loading: false })
			// 	})
			// });
		}
	}

	render() {
		return (
			<form className={classnames("ui", "form", { loading: this.state.loading })} onSubmit={this.handleSubmit}>

				<h4 className="ui dividing header">Fill the form below with the band information</h4>

				{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

				<div className={classnames("field", { error: !!this.state.errors.title })}>
					<label htmlFor="title">Title</label>
					<input
						type="text" id="title" name="title"
						value={this.state.title}
						className="ui input"
						placeholder="The name of the band"
						onChange={this.handleChange}
						ref={(input) => { this.titleInput = input }}
					/>
					<span>{this.state.errors.title}</span>
				</div>
				<div className={classnames("field", { error: !!this.state.errors.year })}>
					<label htmlFor="year">Year</label>
					<input
						type="text" id="year" name="year"
						value={this.state.year}
						className="ui input"
						placeholder="Foundation year"
						onChange={this.handleChange}
						ref={(input) => { this.yearInput = input }}
					/>
					<span>{this.state.errors.year}</span>
				</div>
				<div className="field">
					<button type="submit" className="ui primary button">Save</button>
				</div>
			</form>
		);
	}
}

BandForm.propTypes = {
	band: PropTypes.object,
	saveBand: PropTypes.func.isRequired
};

export default BandForm;