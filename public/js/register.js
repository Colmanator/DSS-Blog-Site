
function sendErrorMessage(message, id) {
    document.getElementById(id).textContent = message;
};

//Listen for changes in input and inform user it is incorrect before they press submit.

const email = document.getElementById("email_input");
email.addEventListener("input", function (e) {
    //Checks if email is in valid format by using a regex pattern taken from this stack
    //overflow post "https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript"
    if(!e.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        sendErrorMessage("Please enter a valid email address", "emailError");
    }else{
        sendErrorMessage("", "emailError");
    }
});

const emailConfirm = document.getElementById("email_confirm");
emailConfirm.addEventListener("input", function (e) {
    if(e.target.value !== email.value) {
        sendErrorMessage("Emails must match", "emailConfirmError");
    }else{
        sendErrorMessage("", "emailConfirmError");
    }
});

const displayName = document.getElementById("displayname_input");
displayName.addEventListener("input", function (e) {
    if(!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
        sendErrorMessage("Display names can only contain the characters A-Z and 0-9", "displaynameError");
    }else{
        sendErrorMessage("", "displaynameError");
    };
});

const password = document.getElementById("password_input");
password.addEventListener("input", function (e) {
    console.log("Changed!!")
    const emailSplit = email.value.split('@');
    const emailValid = (!e.target.value.toLowerCase().includes(email.value.toLowerCase()))
        && (!e.target.value.toLowerCase().includes(emailSplit[0].toLowerCase()))
        && (!e.target.value.toLowerCase().includes(emailSplit[1].toLowerCase()));
    //Checks that password meets password policy
    if(e.target.value.length < 8) {
        sendErrorMessage("Password must be at least 8 characters", "passwordError");
    }else if (e.target.value.length >= 64) {
        sendErrorMessage("Password must be less than 64 characters", "passwordError");
    }else if (e.target.value.toLowerCase().includes(displayName.value.toLowerCase())) {
        sendErrorMessage("Password cannot contain your display name", "passwordError");
    }else if (!emailValid){
        sendErrorMessage("Password cannot contain your email", "passwordError");
    }else if (e.target.value.toLowerCase().includes("  ")) {
        sendErrorMessage("Password cannot contain consecutive spaces", "passwordError");
    }else{
        sendErrorMessage("", "passwordError");
    };
});

const passwordConfirm = document.getElementById("password_confirm");
passwordConfirm.addEventListener("input", function (e) {
    if(e.target.value !== password.value) {
        sendErrorMessage("Passwords must be the same", "passwordConfirmError");
    }else{
        sendErrorMessage("", "passwordConfirmError");
    }
});

addEventListener('submit', function (e) {
    e.preventDefault();

    const formInput = new FormData(e.target);

    //check that password is the correct length and doesn't contain the entered username or more than
    // one consecutive space
    const passwordValid = formInput.get("password_input").length > 7
        && formInput.get("password_input").length <= 64
        && (!formInput.get("password_input").toLowerCase().includes(formInput.get("displayname_input")))
        && (!formInput.get("password_input").toLowerCase().includes("  "));
        && (!password.toLowerCase().includes(email.value.toLowerCase()))
        && (!password.toLowerCase().includes(emailSplit[0].toLowerCase()))
        && (!password.toLowerCase().includes(emailSplit[1].toLowerCase()));
    //check the confirmed password is the same as the password.
    const passwordConfirmValid = formInput.get("password_confirm") === formInput.get("password_input");
    //Checks if email is in valid format by using a regex pattern taken from this stack
    //overflow post "https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript"
    const emailValid = formInput.get("email_input").toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //check email confirmation is same as email
    const emailConfirmValid = formInput.get("email_confirm") === formInput.get("email_input");
    //check that the displayname contains no spaces and only a-z and 0-9 characters.
    const displayNameValid = formInput.get("displayname_input").match(/^[a-zA-Z0-9]+$/);

    if(passwordValid && passwordConfirmValid && emailValid && emailConfirmValid && displayNameValid) {
        //if password meets policies, fetch object containing the top 100,000 cracked passwords from NCSC
        //and check if the user's password is any of them.
        fetch("https://www.ncsc.gov.uk/static-assets/documents/PwnedPasswordsTop100k.json")
            .then(res => res.json())
            .then(out=>{
                if(JSON.stringify(out).includes(formInput.get('password_input'))){
                    console.log(out);
                    sendErrorMessage("Password must be secure", "passwordError");
                }else{
                    const query = {
                        username: formInput.get("displayname_input"),
                        email: formInput.get("email_input"),
                        password: formInput.get("password_input"),
                    };

                    const fetchData ={
                        method: "POST",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(query)
                    };

                    fetch('/api/create_user', fetchData).then(response => {
                        if (response.ok) {
                            window.alert("Account created successfully! Please sign in.");
                            fetch('http://localhost:300/home');
                        }else{
                            sendErrorMessage("Network error, please try again.", "responseMessage");
                            return false;
                        };
                    })
                }
            })
    }else{
        sendErrorMessage("Please correct all errors before submitting.", "responseMessage");
    };
});