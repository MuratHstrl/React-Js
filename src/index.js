import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyC11kvyblQiWH-eZM-XqZ_B9BbumRQMn9M",
    authDomain: "realtimedatabase-df7ee.firebaseapp.com",
    databaseURL: "https://realtimedatabase-df7ee.firebaseio.com",
    projectId: "realtimedatabase-df7ee",
    storageBucket: "realtimedatabase-df7ee.appspot.com",
    messagingSenderId: "942308993214"
  };
  firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
