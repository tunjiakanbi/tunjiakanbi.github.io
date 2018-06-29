  var app_fireBase = {};
  (function(){
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyC4FjTeucFtRS7u0TwxhnKOmIlE7wbYNbo",
          authDomain: "tunjitestdemo2.firebaseapp.com",
          databaseURL: "https://tunjitestdemo2.firebaseio.com",
          projectId: "tunjitestdemo2",
          storageBucket: "",
          messagingSenderId: "317366587352"
      };
      firebase.initializeApp(config);

      app_fireBase = firebase;
  })()