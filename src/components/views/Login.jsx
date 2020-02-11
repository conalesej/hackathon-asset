import React, { Component } from 'react';
import { withFirebase } from '../../firebase/context';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null
		};
		this.loginHandler = this.loginHandler.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
		console.log('Login.jsx');
	}

	onChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(event.target.name, event.target.value);
	};
	loginHandler() {
		this.props.firebase
			.doSignInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				console.log('LOGGED IN!');
			})
			.catch((error) => {
				alert('Failed ' + error);
			});
	}

	render() {
		return (
			<div>
				<h1>Log in</h1>
				<label>
					Email
					<input name="email" type="email" onChange={(e) => this.onChangeHandler(e)} />
				</label>
				<label>
					Password
					<input
						name="password"
						type="password"
						placeholder="Password"
						onChange={(e) => this.onChangeHandler(e)}
					/>
				</label>
				<button onClick={() => this.loginHandler()}>Log in</button>
				<button onClick={() => this.props.history.push('/register')}>Sign me Up</button>
			</div>
		);
	}
}

export default withFirebase(withRouter(Login));
