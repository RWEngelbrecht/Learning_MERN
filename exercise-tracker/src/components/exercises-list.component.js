import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

//functional react component:
const Exercise = props => (
	<tr>
		<td>{ props.exercise.date.substring(0,10) }</td>
		<td>{ props.exercise.description }</td>
		<td>{ props.exercise.duration }</td>
		<td>
			<Link to={`/edit/${props.exercise._id}`}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
		</td>
	</tr>
)

//class component:
class ExerciseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			exercises: []
		}
		this.deleteExercise = this.deleteExercise.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}

	componentDidMount() {
		// will need to send username of currently logged in
		axios.get('/exercise/')
			.then(res => {
				this.setState({
					exercises: res.data
				});
			}).catch(err => {
				console.log(err);
			})
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	deleteExercise(id) {
		axios.delete(`/exercise/${id}`)
			.then(res => {
				console.log(res.data);
				this.setState({
					exercises: this.state.exercises.filter(el => el._id !== id)
				});
			}).catch(err => {
				console.log(err);
			});
	}

	exerciseList() {
		return this.state.exercises.map(ex => {
			return <Exercise exercise={ex} deleteExercise={this.deleteExercise} key={ex._id} />;
		});
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div>
				<h3>{user.name}'s Exercises</h3><button className="btn btn-secondary waves-effect waves-light hoverable blue accent-3" onClick={this.onLogoutClick}></button> 
				<div className="container">
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th>Date</th>
								<th>Description</th>
								<th>Duration</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{ this.exerciseList() }
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

ExerciseList.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(ExerciseList);
