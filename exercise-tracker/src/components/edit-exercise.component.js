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

		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(`http://localhost:5000/exercise/${this.props.match.params.id}`)
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

	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date
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

		axios.post(`http://localhost:5000/exercise/edit/${this.props.match.params.id}`, exercise)
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
						<input className="form-control" type="text" value={this.state.username} disabled />
					</div>
					<div className="form-group">
						<label>Description</label>
						<input className="form-control" type="text" value={this.state.description} onChange={this.onChangeDescription} />
					</div>
					<div className="form-group">
						<label>Duration (in minutes)</label>
						<input className="form-control" type="number" value={this.state.duration} onChange={this.onChangeDuration} />
					</div>
					<div className="form-group">
						<label>Date</label>
						<div>
							<DatePicker selected={this.state.date} onChange={this.onChangeDate} />
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
