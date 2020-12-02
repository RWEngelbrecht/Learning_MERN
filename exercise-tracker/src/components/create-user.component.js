import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		}
		// need to bind methods so 'this' keyword isn't undefined

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}

		axios.post('/user/register', user)
			.then(res => console.log(res))
			.catch(() => window.alert("Something is not quite right..."));
	}

	render() {
		return (
			<div>
				<h3>Register</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input id="username" type="text" required className="form-control" value={this.state.username} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input id="email" type="text" required className="form-control" value={this.state.email} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input id="password" type="password" required className="form-control" value={this.state.password} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Confirm password</label>
						<input id="password2" type="password" required className="form-control" value={this.state.password2} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Create User" />
					</div>
				</form>
			</div>
		);
	}
}
