import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import classnames from 'classnames';

class CreateUser extends Component {

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

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
		  this.setState({
			errors: nextProps.errors
		});
		}
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

		this.props.registerUser(user, this.props.history);

		// axios.post('/user/register', user)
		// 	.then(res => console.log(res))
		// 	.catch(() => window.alert("Something is not quite right..."));
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<h3>Register</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input id="username" type="text" required
								className={classnames("",{invalid: errors.username})} value={this.state.username} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input id="email" type="text" required
								className={classnames("",{invalid: errors.email})} value={this.state.email} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input id="password" type="password" required
								className={classnames("",{invalid: errors.password})} value={this.state.password} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Confirm password</label>
						<input id="password2" type="password" required
								className={classnames("",{invalid: errors.password2})} value={this.state.password2} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Create User" />
					</div>
				</form>
			</div>
		);
	}
}

CreateUser.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(CreateUser));
