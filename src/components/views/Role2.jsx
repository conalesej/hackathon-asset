import React, { Component } from 'react';
import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';
class Role2 extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}

	render() {
		return (
			<div>
				<h1>Role 2</h1>

				<button onClick={() => this.props.firebase.doSignOut()}>Sign Out</button>
			</div>
		);
	}
}

export default withFirebase(withRouter(Role2));
