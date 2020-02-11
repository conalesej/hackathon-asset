import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase/context';
import { appRoutes } from '../../routes/appRoutes';

class App extends Component {
	constructor() {
		super();

		this.state = {
			authUserData: {}
		};
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			console.log(authUser);
			if (authUser) {
				this.props.firebase.users().onSnapshot((snapshotDoc) => {
					snapshotDoc.docs.forEach((doc) => {
						if (doc.id == authUser.email) {
							this.setState(
								{
									/// Spread hte doc data and concat id
									authUserData: { ...doc.data(), id: doc.id }
								},
								() => {
									console.log(this.state.authUserData);
									switch (this.state.authUserData.role) {
										case 'role1':
											//Replace this with the Link to redirect to admin page
											this.props.history.push({
												pathname: '/role1',
												state: {
													authUserData: this.state.authUserData
												}
											});
											break;
										case 'role2':
											//Replace this with the Link to redirect to patient page
											this.props.history.push({
												pathname: '/role2',
												state: {
													authUserData: this.state.authUserData
												}
											});
											break;
										default:
											this.props.history.push('/login');
											break;
									}
								}
							);
						}
					});
				});
			} else {
				this.props.history.push('/login');
			}
		});
	}

	render() {
		return <div>{appRoutes}</div>;
	}
}

export default withFirebase(withRouter(App));
