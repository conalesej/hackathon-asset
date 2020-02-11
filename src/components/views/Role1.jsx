import React, { Component } from 'react';

import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';
// import '../../scripts/Server';
class Role1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authUserData: this.props.history.location.state.authUserData
		};
	}
	componentDidMount() {
		console.log(this.props);
		var data;
		this.props.firebase.users().doc(this.state.authUserData.id).onSnapshot((doc) => {
			// this.props.firebase.users().doc(this.state.authUserData.id).get().then((doc) => {
			data = doc.data();
			console.log(data);
			this.setState({
				patientData: {
					...data,
					id: doc.id
				}
			});
		});
	}

	render() {
		return (
			<div>
				<h1>Role 1</h1>
				<a href="facebook.com">Click this link to connect to Health Advisor</a>
				<button onClick={() => this.props.firebase.doSignOut()}>Sign Out</button>
			</div>
		);
	}
}

export default withFirebase(withRouter(Role1));
