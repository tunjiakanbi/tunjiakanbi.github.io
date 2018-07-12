var inputText = $("#txtEmail").val;
function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.value.match(mailformat))
{
document.form1.text1.focus();
return true;
console.log("you are logged in");
}
else
{
alert("You have entered an invalid email address!");
document.form1.text1.focus();
return false;
}
}

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBt0ybhT7-Ft1QM2BKmSpm1ixLYcSCwxOA",
        authDomain: "firstproject-62f58.firebaseapp.com",
        databaseURL: "https://firstproject-62f58.firebaseio.com",
        projectId: "firstproject-62f58",
        storageBucket: "firstproject-62f58.appspot.com",
        messagingSenderId: "614682014505"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var modal = document.querySelector(".modals");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
        console.log(modal);
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
            console.log("Please work!");
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

    $("#event-form-submit").on("click", function (event) {
        event.preventDefault();

        var eventTitle = $("#event-title").val();
        var eventDate = $("#event-date").val();
        var eventTime = $("#event-time").val();
        var eventLocation = $("#event-address").val();
        var eventDescription = $("#event-description").val();

        database.ref().push({
            EventTitle: eventTitle,
            EventDate: eventDate,
            EventTime: eventTime,
            EventLocation: eventLocation,
            EventDescription: eventDescription,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
        $("input").val("");
        $(".modals").hide();

    })
    database.ref().on("child_added", function (snapshot) {

        var date = snapshot.val().EventDate + ' ' + snapshot.val().EventTime;
        var format = moment(date).format('LLL');
        var unixTime = moment(format).format('X');
        var now = moment().format('X');
        // var secondsFromNow = unixTime - now;

        //if event date in unix time > now in unix time, post the event
        if (unixTime > now) {
            $("tbody").append('<tr>');
            // if the day of the event is today, write "TODAY"
            if (moment(date).format('LL') === moment().format('LL')) {
                $("tbody").append('<td>TODAY</td>')
            } else {
                $("tbody").append('<td>' + moment(snapshot.val().EventDate).format('LL') + '</td>');
            }
            $("tbody").append('<td>' + snapshot.val().EventTime + '</td>');
            $("tbody").append('<td>' + snapshot.val().EventTitle + '</td>');
            $("tbody").append('<td>' + snapshot.val().EventLocation + '</td>');
            $("tbody").append('<td>' + snapshot.val().EventDescription + '</td>');
            $("tbody").append('</tr>');
        }
    });


    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // Add login event
    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

    });
    // Add signup event
    btnSignUp.addEventListener('click', e => {
        //Get email and pass
        //TODO: check for real email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add signout event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            console.log('you are logged in');
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });


});