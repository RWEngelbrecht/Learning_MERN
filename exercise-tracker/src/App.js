import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import AddExercise from './components/add-exercise.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
	<Router>
		<div className="container">
			<Navbar />
			<div className="container">
				<br />
				<Route path="/" exact component={ExerciseList} />
				<Route path="/add" component={AddExercise} />
				<Route path="/edit/:id" exact component={EditExercise} />
				<Route path="/register" exact component={CreateUser} />
				<br />
			</div>
		</div>
	</Router>
  );
}

export default App;
