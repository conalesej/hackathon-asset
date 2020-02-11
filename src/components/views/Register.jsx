import React, { Component } from 'react';
import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			firstName: null,
			lastName: null,
			password: null
		};
	}

	onChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(event.target.name, event.target.value);
	};

	registerHandler(e) {
		e.preventDefault();
		// console.log(this.state.role);
		this.props.firebase
			.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				var db = this.props.firebase.users();

				db.doc(this.state.email).set({
					email: this.state.email,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					role: 'role1'
				});
			})
			.catch((error) => {
				alert(error);
			});
	}
	componentDidMount() {
		console.log(this.props);
		console.log('Register.jsx');
	}
	render() {
		return (
			<div>
				<h1>Sign up</h1>
				<form>
					<label>
						Email
						<input name="email" type="email" required onChange={(e) => this.onChangeHandler(e)} />
					</label>
					<label>
						Password
						<input
							name="password"
							type="password"
							required
							placeholder="Password"
							onChange={(e) => this.onChangeHandler(e)}
						/>
					</label>

					<label>
						First Name
						<input name="firstName" type="text" required onChange={(e) => this.onChangeHandler(e)} />
					</label>

					<label>
						Last Name
						<input name="lastName" type="text" required onChange={(e) => this.onChangeHandler(e)} />
					</label>

					{/* <label>
						Role
						<select required name="role" onChange={(e) => this.onChangeHandler(e)}>
							<option value="" disabled selected>
								Choose role..
							</option>
							<option value="role1">Role1</option>
							<option value="role2">Role2</option>
						</select>
					</label> */}

					<button
						onClick={(e) => {
							this.registerHandler(e);
						}}
					>
						Sign me Up
					</button>
				</form>
			</div>
		);
	}
}

export default withFirebase(withRouter(Register));
