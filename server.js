import express from "express"
// import apiRouter from "./apiRouter.js";

const app = express();
const PORT = 3000;

app.use("/", router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

app.get("home", (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
})