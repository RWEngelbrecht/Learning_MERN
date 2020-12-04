import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAutheticated)
			this.props.history.push('/');
		if (nextProps.errors)
			this.setState({
				errors: nextProps.errors
			});
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
		this.props.loginUser(userData);
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<h3>Login</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input id="email" type="text" required
								className={classnames("", {invalid:errors.email || errors.emailnotfound})}
								value={this.state.email} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input id="password" type="password" required
								className={classnames("", {invalid:errors.password || errors.passwordincorrect})}
								value={this.state.password} onChange={this.onChange} />
					</div>
					<div className="form-group">
						<input type="submit" className="btn btn-secondary" value="Log in" />
					</div>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
