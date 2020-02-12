import React, { Component } from 'react';
import { withFirebase } from '../../firebase/context';
import { withRouter } from 'react-router-dom';
class Role2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDataList: [ {} ],
			isEditingUserToggle: false,
			currentUserData: {}
			// tempCurrentUserData: {}
		};
	}
	componentDidMount() {
		var db = this.props.firebase.users();

		db.onSnapshot((snapshot) => {
			let userDataList = [];
			snapshot.forEach((doc) => {
				userDataList.push({ ...doc.data(), id: doc.id });
			});
			this.setState({
				userDataList
			});
		});
	}

	onChangeHandler = (event) => {
		this.setState({
			currentUserData: {
				...this.state.currentUserData,
				[event.target.name]: event.target.value
			}
		});

		console.log(event.target.name, event.target.value);
	};

	editHandler(e) {
		e.preventDefault();
		var db = this.props.firebase.users();
		db
			.doc(this.state.currentUserData.id)
			.update({
				firstName: this.state.currentUserData.firstName,
				lastName: this.state.currentUserData.lastName,
				age: this.state.currentUserData.age
			})
			.catch((err) => {
				alert(err);
			});
		console.log(this.state.currentUserData);
	}

	render() {
		var userDataTable = (
			<div>
				<label>
					First Name
					<input
						name="firstName"
						value={this.state.currentUserData.firstName}
						type="text"
						required
						onChange={(e) => this.onChangeHandler(e)}
					/>
				</label>

				<label>
					Last Name
					<input
						name="lastName"
						value={this.state.currentUserData.lastName}
						type="text"
						required
						onChange={(e) => this.onChangeHandler(e)}
					/>
				</label>
				<label>
					Age
					<input
						name="age"
						type="text"
						value={this.state.currentUserData.age}
						required
						onChange={(e) => this.onChangeHandler(e)}
					/>
				</label>
				<button onClick={(e) => this.editHandler(e)}>Save</button>
				<button
					onClick={() =>
						this.setState({
							isEditingUserToggle: false
						})}
				>
					X
				</button>
			</div>
		);

		var userTable = !this.state.isEditingUserToggle
			? this.state.userDataList.map((userDataList) => (
					<p>
						{userDataList.id}
						<button
							onClick={() => {
								this.setState({
									isEditingUserToggle: true,
									currentUserData: userDataList
								});
							}}
						>
							View
						</button>
					</p>
				))
			: userDataTable;

		return (
			<div>
				<h1>Health Advisor</h1>
				{userTable}
				<button onClick={() => console.log(this.state.isEditingUserToggle)}>Print Data</button>
			</div>
		);
	}
}

export default withFirebase(withRouter(Role2));
