import React, { Component } from 'react';
import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';
class Role3 extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h1>Role 3</h1>
			</div>
		);
	}
}

export default withFirebase(withRouter(Role3));
