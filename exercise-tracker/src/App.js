import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import AddExercise from './components/add-exercise.component';
import CreateUser from './components/create-user.component';
import Login from './components/login.component';
import PrivateRoute from './components/private-route/privateRoute';

// check for token to keep user logged in
if (localStorage.jwtToken) {
	//set auth token header auth
	const token = localStorage.jwtTokenn;
	setAuthToken(token);
	// decode token and get user info
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));

	// check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location = '/login';
	}
}

function App() {
  return (
	  <Provider store={store}>
		<Router>
			<div className="container">
				<Navbar />
				<div className="container">
					<br />
					<Switch>
						<PrivateRoute path="/" exact component={ExerciseList} />
					</Switch>
					<Route path="/add" component={AddExercise} />
					<Route path="/edit/:id" exact component={EditExercise} />
					<Route path="/register" exact component={CreateUser} />
					<Route path="/login" exact component={Login} />
					<br />
				</div>
			</div>
		</Router>
	</Provider>
  );
}

export default App;
