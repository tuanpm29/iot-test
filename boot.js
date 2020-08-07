const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBwLr9epziiv8KxXcF0ONQgv4I38SsQQ9Y",
  authDomain: "iot-test-484f0.firebaseapp.com",
  databaseURL: "https://iot-test-484f0.firebaseio.com",
  projectId: "iot-test-484f0",
  storageBucket: "iot-test-484f0.appspot.com",
  messagingSenderId: "778421473169",
  appId: "1:778421473169:web:f478ae2e521ebc31db9430"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const testRef = firebase.database().ref('signal');

testRef.on("value", snap => {
  console.log(snap.val());
});