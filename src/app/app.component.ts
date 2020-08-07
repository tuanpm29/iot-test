import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iot-test';

  temp = "";
  date = "";

  isSignaling = false;

  history: Array<any> = [];

  constructor() {}

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyBwLr9epziiv8KxXcF0ONQgv4I38SsQQ9Y",
      authDomain: "iot-test-484f0.firebaseapp.com",
      databaseURL: "https://iot-test-484f0.firebaseio.com",
      projectId: "iot-test-484f0",
      storageBucket: "iot-test-484f0.appspot.com",
      messagingSenderId: "778421473169",
      appId: "1:778421473169:web:f478ae2e521ebc31db9430"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.database().ref('realtime').on('value', (snapshot) => {
      const realtime = snapshot.val();
      this.temp = `${realtime.Temperature} C`;
      this.date = moment(realtime.Timestamp).toString();
    });

    firebase.database().ref('signal').on('value', (snap) => this.isSignaling = snap.val() == 1);

    firebase.database().ref('test').on('value', (snap) => {
      const history = snap.val();
      
      this.history = Object.values(history).map((item: any) => ({
        Timestamp: moment(item.Timestamp).toString(),
        Temperature: `${item.Temperature} C`,
      })).reverse();
    });
  }

  startSignal() {
    firebase.database().ref('signal').set(1);
  }

  stopSignal() {
    firebase.database().ref('signal').set(0);
  }
}
