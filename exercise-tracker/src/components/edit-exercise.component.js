import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

export default class EditExercise extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date()
		}

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		axios.get(`/exercise/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					username: res.data.username,
					description: res.data.description,
					duration: res.data.duration,
					date: new Date(res.data.date)
				});
			}).catch(err => {
				console.log(err);
			});
	}

	onChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}

		axios.post(`/exercise/edit/${this.props.match.params.id}`, exercise)
			.then(res => {
				console.log(res.data);
				window.location = '/';
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<h3>Edit exercise</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input id="username" className="form-control" type="text" value={this.state.username} disabled />
					</div>
					<div className="form-group">
						<label>Description</label>
						<input id="description" className="form-control" type="text" value={this.state.description} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Duration (in minutes)</label>
						<input id="duration" className="form-control" type="number" value={this.state.duration} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Date</label>
						<div>
							<DatePicker id="date" selected={this.state.date} onChange={this.onChange} />
						</div>
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Update Exercise" />
					</div>
				</form>
			</div>
		);
	}
}
