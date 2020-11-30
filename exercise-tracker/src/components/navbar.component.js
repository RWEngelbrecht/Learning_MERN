import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">ExerciseTracker</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/">Exercises</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/add">Add Exercise</Link>
						</li>
						{/* disabled if user exists in session */}
						<li className="nav-item">
							<Link className="nav-link" to="/register">Register user</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
