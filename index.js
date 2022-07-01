// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDekEDdvsKdLXFxlFPqZLTwuO0BNnvtpOs",
    authDomain: "chattingdt-e9d4e.firebaseapp.com",
    databaseURL: "https://chattingdt-e9d4e-default-rtdb.firebaseio.com",
    projectId: "chattingdt-e9d4e",
    storageBucket: "chattingdt-e9d4e.appspot.com",
    messagingSenderId: "522776600884",
    appId: "1:522776600884:web:cac6e3104b61080d670561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});