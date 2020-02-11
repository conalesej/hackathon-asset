import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBPgMkBC9fqIy3M0yOMOYn2NTdCbYMmWM4',
	authDomain: 'fir-template-ccd7e.firebaseapp.com',
	databaseURL: 'https://fir-template-ccd7e.firebaseio.com',
	projectId: 'fir-template-ccd7e',
	storageBucket: 'fir-template-ccd7e.appspot.com',
	messagingSenderId: '579915667946',
	appId: '1:579915667946:web:8315d5470c875b1667fa93',
	measurementId: 'G-11G3RFYDD4'
};
class Firebase {
	constructor() {
		console.log('Firebase initialized');
		app.initializeApp(firebaseConfig);

		this.auth = app.auth();
		this.db = app.firestore();

		const settings = {
			//Default in future release so no need to declare
			//timestampsInSnapshots: true
		};

		this.db.settings(settings);
	}

	// ============================================================================
	// == Firebase Authentication API
	// ============================================================================
	doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	// ============================================================================
	// == Firestore API
	// ============================================================================

	// == Users Document == //
	users = () => this.db.collection('users');
	// this.db.collection('users'); this.props.firebase.users().doc()
	// == Patients Document == //
}

export default Firebase;
