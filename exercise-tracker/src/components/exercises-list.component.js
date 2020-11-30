import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
export default class ExerciseList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			exercises: []
		}

		this.deleteExercise = this.deleteExercise.bind(this);
	}

	componentDidMount() {
		// will need to send username of currently logged in
		axios.get('http://localhost:5000/exercise/')
			.then(res => {
				this.setState({
					exercises: res.data
				});
			}).catch(err => {
				console.log(err);
			})
	}

	deleteExercise(id) {
		axios.delete(`http://localhost:5000/exercise/${id}`)
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
		return (
			<div>
				<h3>Yon Exercises</h3>
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
		);
	}
}
