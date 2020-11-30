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
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:5000/user/')
			.then(res => {
				this.setState({
					username: res.data[0].username,
					users: res.data.map(usr => usr.username),
				});
			}).catch(err => console.log(err));
	}

	onChangeUsername(e) {
		const user = {
			username: e.target.value
		}
		this.setState(user);
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

		axios.post('http://localhost:5000/exercise/add', exercise)
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
						<select required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
							{
								this.state.users.map((user) => {
									return <option key={user} value={user}>{user}</option>;
								})
							}
						</select>
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
						<input type="submit" className="btn btn-secondary" value="Add Exercise" />
					</div>
				</form>
			</div>
		);
	}
}
