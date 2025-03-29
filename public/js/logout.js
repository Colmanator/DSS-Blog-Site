

const logoutBttn = document.getElementById("logoutBttn");

logoutBttn.addEventListener("click", function (e) {

    const fetchData ={
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({beep: "boop"}),
    };

    fetch('/api/logout', fetchData).then((response) => {
        window.location.href = '/';
    })


})