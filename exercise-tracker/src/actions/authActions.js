import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, USER_LOADING, SET_CURRENT_USER } from './types'

export const registerUser = (userData, history) => dispatch => {
	axios.post('/user/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios.post('/user/login', userData)
		.then(res => {
			// save to localStorage
			// set token to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// set token to auth header
			setAuthToken(token);
			// decode token to get user data
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded))
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// user loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};

// log user out
export const logoutUser = () => dispatch => {
	// remove tokken from local storage
	localStorage.removeItem('jwtToken');
	// remove auth header for future requests
	setAuthToken(false);
	// set current user to empty object
	dispatch(setCurrentUser({}));
};
