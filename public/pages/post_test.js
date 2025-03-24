alert("js active")

async function run() {
    const response = await fetch("http://localhost:3000/api/post_test", {
        method: "POST",
        body: JSON.stringify({value1: "testicles"}),
    });

    console.log(response.body);
}

run();
