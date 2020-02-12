import React, { Component } from 'react';

import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';
import { taggedTemplateExpression } from '@babel/types';
// import '../../scripts/Server';
class Role1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			age: 0
		};
	}
	componentDidMount() {
		console.log(this.props);

		var db = this.props.firebase.users();
		db.onSnapshot((querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => doc.data());
			// console.log(querySnapshot.docs.map((doc) => );
			console.log(data); // array of cities objects
		});
	}

	onChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(event.target.name, event.target.value);
	};

	submitHandler(e) {
		e.preventDefault();

		var uniqueCode =
			this.state.firstName.substring(0, 2).toUpperCase() +
			this.state.lastName.substring(0, 2).toUpperCase() +
			this.state.age;

		var db = this.props.firebase.users();
		db
			.doc(uniqueCode)
			.set({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				age: this.state.age
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		return (
			<div>
				<h1>Role 1</h1>
				<form>
					<label>
						First Name
						<input name="firstName" type="text" required onChange={(e) => this.onChangeHandler(e)} />
					</label>

					<label>
						Last Name
						<input name="lastName" type="text" required onChange={(e) => this.onChangeHandler(e)} />
					</label>
					<label>
						Age
						<input name="age" type="text" required onChange={(e) => this.onChangeHandler(e)} />
					</label>
					{this.state.test}
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
							this.submitHandler(e);
						}}
					>
						Submit
					</button>
				</form>
				<button
					onClick={() => {
						window.open('http://facebook.com');
					}}
				>
					Click this link to connect to Health Advisor
				</button>
				<button onClick={() => this.props.firebase.doSignOut()}>Sign Out</button>
			</div>
		);
	}
}

export default withFirebase(withRouter(Role1));
