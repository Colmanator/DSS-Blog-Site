//IMPORTS
//--------------------------------------------------//
import express, { Router } from "express"
import userDM from "./datamen/userDataManager.js"
import userController from "./controllers/userController.js"
import getClientObject from "./js/getClientObject.js";
import UserController from "./controllers/userController.js";
import cookieParser from "cookie-parser";
const apiRouter = Router();
apiRouter.use(cookieParser());
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

apiRouter.post("/test_session", async function (req, res) {
    console.log(req.cookies.sessionId);
    res.send("HI");
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

    res.cookie('sessionId', response.session_id, {
        expires: new Date(Date.now() + 100000),
        path: '/api',
        secure: true,
        httpOnly: true,
    })

    res.send(response)
});

apiRouter.post("/logout", async function (req, res) {
    const session_id = req.body.session_id;

    const response = await userController.logout(session_id);

    res.send(response)
});

apiRouter.post("/change_password", async function (req, res) {
    const session_id = req.body.session_id;
    const email = req.body.email;
    const new_password = req.body.new_password;

    const response = await userController.change_password(session_id, email, new_password);

});
//--------------------------------------------------//

export default apiRouter;