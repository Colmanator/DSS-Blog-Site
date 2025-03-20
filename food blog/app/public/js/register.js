
function sendErrorMessage(message, id) {
    document.getElementById(id).textContent = message;
};

const password = document.getElementById("password_input");
password.addEventListener("input", function (e) {
    console.log(e.target.value);
    if(e.target.value.length <= 15) {
        sendErrorMessage("Password must be at least 15 characters", "passwordError")
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
const emailConfirm = document.getElementById("email_validate");
emailConfirm.addEventListener("input", function (e) {
    if(e.target.value !== email.value) {
        sendErrorMessage("Emails must match", "emailConfirmError");
    }else{
        sendErrorMessage("", "emailConfirmError");
    }
});

addEventListener('submit', function (e) {
    e.preventDefault();
    
});