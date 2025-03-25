const email = document.getElementById("username_input");
const password = document.getElementById("password_input");

addEventListener('submit',(e) => {
    e.preventDefault();
    //Check email and password are in valid formats before sending to back end
    const emailValid = email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordValid = password.value.length > 7 && password.value.length < 64;

    if(emailValid && passwordValid) {

        const user = {
            email: email.value,
            password: password.value,
        };

        const fetchData = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('/api/login', fetchData).then(async response => {
            let data = await response.json();
            console.log(response);
            console.log(data);
            if (data.login_success && !data.server_error) {
                localStorage.setItem('sessionId', data.session_id);
                //Redirects user to home
                window.location.href = "/home";

            } else if (!data.login_success && !data.server_error) {
                document.getElementById("login_error").textContent = "Username or Password Incorrect";
            } else {
                document.getElementById("login_error").textContent = "Server Error- Please try again";
            }
        })
    }
})