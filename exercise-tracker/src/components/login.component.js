import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(userData);
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<h3>Login</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input id="email" type="text" required className="form-control" value={this.state.email} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input id="password" type="password" required className="form-control" value={this.state.password} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Log in" />
					</div>
				</form>
			</div>
		);
	}
}
