import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAOkIeUlIreAdcNs5yK6h-qNrkCriYqAgA',
	authDomain: 'shopper-1f556.firebaseapp.com',
	databaseURL: 'https://shopper-1f556.firebaseio.com',
	projectId: 'shopper-1f556',
	storageBucket: 'shopper-1f556.appspot.com',
	messagingSenderId: '944907251910',
	appId: '1:944907251910:web:f08c1fe75abb52861c67c7',
	measurementId: 'G-8BMFCVXMLR',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
