//IMPORTS
//--------------------------------------------------//
import express, { Router } from "express"
import userDM from "./datamen/userDataManager.js"
import userController from "./controllers/userController.js"
import getClientObject from "./getClientObject.js";
import UserController from "./controllers/userController.js";
const apiRouter = Router();
apiRouter.use(express.json());
//--------------------------------------------------//


//TESTS
//--------------------------------------------------//
apiRouter.get("/get_test", async function (req, res) {
    res.send({body : "test"});
});

apiRouter.post("/post_test", async function (req, res) {
    console.log(req.body);
    res.send({value : "rec"});
});
//--------------------------------------------------//


//ROUTES
//--------------------------------------------------//
apiRouter.post("/create_user", async function (req, res) {
    const email = req.body.email;
    const display_name = req.body.username;
    const password = req.body.password;

    const response = await userController.create_user(email, display_name, password);

    res.send(response)
});

apiRouter.post("/verify_user", async function (req, res) {
    const email = req.body.email;

    const response = await userController.verify_user(email);

    res.send(response)
});

apiRouter.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await userController.login(email, password);

    res.send(response)
});

apiRouter.post("/logout", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await userController.login(email, password);

    res.send(response)
});
//--------------------------------------------------//

export default apiRouter;