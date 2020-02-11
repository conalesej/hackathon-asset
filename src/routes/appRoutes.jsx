import Login from '../components/views/Login';
import Role2 from '../components/views/Role2';
import Role1 from '../components/views/Role1';
import Register from '../components/views/Register';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const appRoutes = [
	<Switch>
		<Route path="/login" exact strict render={() => <Login />} />

		<Route path="/role1" exact strict render={() => <Role1 />} />
		<Route path="/role2" exact strict render={() => <Role2 />} />
		<Route path="/register" exact strict render={() => <Register />} />
	</Switch>
];

export default appRoutes;
