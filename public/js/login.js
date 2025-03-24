// // Update error message based on login attempt
// async function checkLoginAttempts() {
//     const response = await fetch("../json/login_attempt.json");
//     const form_data = await response.json();
//
//     // Inform user they need to fill out the fields on the login form
//     if(form_data.username === "null" || form_data.password === "null") {
//         document.getElementById("login_error").parentNode.removeChild(document.getElementById("login_error"));
//     }
//     if(form_data.username === "" || form_data.password === "") {
//         if(document.getElementById("login_error") !== null) {
//             document.getElementById("login_error").parentNode.removeChild(document.getElementById("login_error"));
//         }
//
//         let error_msg = document.createElement("p");
//         error_msg.id = "login_error";
//         error_msg.textContent = "Please fill out the login fields.";
//         error_msg.classList.add("error");
//         document.querySelector("#login_btn").parentNode.insertBefore(error_msg, document.querySelector("#login_btn"));
//
//     } else if(form_data.username !== "username") { // Inform user they have entered the incorrect username
//         if(document.getElementById("login_error") !== null) {
//             document.getElementById("login_error").parentNode.removeChild(document.getElementById("login_error"));
//         }
//
//         let error_msg = document.createElement("p");
//         error_msg.id = "login_error";
//         error_msg.textContent = "Please Enter correct username and password";
//         error_msg.classList.add("error");
//         document.querySelector("#login_btn").parentNode.insertBefore(error_msg, document.querySelector("#login_btn"));
//
//     } else if(form_data.password !== "password") { // Inform user they have entered the incorrect password
//
//         if(document.getElementById("login_error") !== null) {
//             document.getElementById("login_error").parentNode.removeChild(document.getElementById("login_error"));
//         }
//
//         let error_msg = document.createElement("p");
//         error_msg.id = "login_error";
//         error_msg.textContent = "Please enter correct username and password";
//         error_msg.classList.add("error");
//         document.querySelector("#login_btn").parentNode.insertBefore(error_msg, document.querySelector("#login_btn"));
//
//     } else {
//         if(document.getElementById("login_error") !== null) {
//             document.getElementById("login_error").parentNode.removeChild(document.getElementById("login_error"));
//         }
//     }
// }
//
// checkLoginAttempts();

const email = document.getElementById("username_input");
const password = document.getElementById("password_input");

addEventListener('submit', (e) => {
    e.preventDefault();
    //Check email and password are in valid formats before sending to back end
    const emailValid = email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordValid = password.value.length > 7 && password.value.length < 64;

    if(emailValid && passwordValid) {

        const query = {
            email: email.value,
            password: password.value,
        };

        const fetchData = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }

        fetch('/login', fetchData).then(response =>{
            if (response.login_success && !response.server_error) {
                localStorage.setItem('sessionId', response.session_id);
                fetch('http://localhost:300/home');
            }else if (!response.login_success && !response.server_error){
                document.getElementById("login_error").textContent = "Username or Password Incorrect";
            }else{
                document.getElementById("login_error").textContent = "Server Error- Please try again";
            }
        })
    }
})