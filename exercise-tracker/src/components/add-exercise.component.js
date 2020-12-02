import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class AddExercise extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: []
		}
		// need to bind methods so 'this' keyword isn't undefined
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios.get('/user/')
			.then(res => {
				this.setState({
					username: res.data[0].username,
					users: res.data.map(usr => usr.username),
				});
			}).catch(err => console.log(err));
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

		axios.post('/exercise/add', exercise)
			.then(res => {
				console.log(res.data);
				window.location = '/';
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<h3>Add an exercise</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<select id="username" required className="form-control" value={this.state.username} onChange={this.onChange}>
							{
								this.state.users.map((user) => {
									return <option key={user} value={user}>{user}</option>;
								})
							}
						</select>
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
						<input type="submit" className="btn btn-secondary" value="Add Exercise" />
					</div>
				</form>
			</div>
		);
	}
}
