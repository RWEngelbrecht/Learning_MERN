import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: ''
		}
		// need to bind methods so 'this' keyword isn't undefined

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);

		this.state = {
			username: ''
		}
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
		}
		console.log(user);

		axios.post('http://localhost:5000/user/register', user)
			.then(res => console.log(res.data))
			.catch(err => console.log(err));

		this.setState({
			username: ''
		})
	}


	render() {
		return (
			<div>
				<h3>Create new user</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Create User" />
					</div>
				</form>
			</div>
		);
	}
}
