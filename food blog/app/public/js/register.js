
function sendErrorMessage(message, id) {
    document.getElementById(id).textContent = message;
};

const password = document.getElementById("password_input");
password.addEventListener("input", function (e) {
    if(e.target.value.length < 8) {
        sendErrorMessage("Password must be at least 8 characters", "passwordError");
    }else if (e.target.value.length >= 64) {
        sendErrorMessage("Password must be less than 64 characters", "passwordError");
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

addEventListener('submit', function (e) {
    e.preventDefault();

    const formInput = new FormData(e.target);

    const passwordValid = formInput.get("password_input").length > 7 && formInput.get("password_input").length <= 64;
    const passwordConfirmValid = formInput.get("password_confirm") === formInput.get("password_input");
    const emailValid = formInput.get("email_input").toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const emailConfirmValid = formInput.get("email_confirm") === formInput.get("email_input");
    const displayNameValid = formInput.get("displayname_input").match(/^[a-zA-Z0-9]+$/);

    if(passwordValid && passwordConfirmValid && emailValid && emailConfirmValid && displayNameValid) {

        fetch("https://www.ncsc.gov.uk/static-assets/documents/PwnedPasswordsTop100k.json")
            .then(res => res.json())
            .then(out=>{
                if(JSON.stringify(out).includes(formInput.get('password_input'))){
                    sendErrorMessage("Password must be secure", "passwordError");
                }else{
                    const query = {
                        nameIn: formInput.get("displayname_input"),
                        emailIn: formInput.get("email_input"),
                        passwordIn: formInput.get("password_input"),
                    };

                    const fetchData ={
                        method: "POST",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(query)
                    };

                    fetch('/newProfile', fetchData).then(response => {
                        if (response.ok) {
                            window.alert("Account created successfully! Please sign in.");
                            fetch('/login');
                        }else{
                            sendErrorMessage("Network error, please try again.", "responseMessage");
                        };
                    })
                }
            })
    }else{
        sendErrorMessage("Please correct all errors before submitting.", "responseMessage");
    };
});