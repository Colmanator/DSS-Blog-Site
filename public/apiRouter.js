//IMPORTS
//--------------------------------------------------//
import express, { Router } from "express"
import userDM from "./datamen/userDataManager.js"
import postController from "./controllers/postController.js";
import userController from "./controllers/userController.js"
import getClientObject from "./js/getClientObject.js";
import UserController from "./controllers/userController.js";
import cookieParser from "cookie-parser";
import sessionDataManager from "./datamen/sessionDataManager.js";
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
    const session_id = req.cookies.sessionId;

    const response = await userController.logout(session_id);

    res.send(response)
});

apiRouter.post("/change_password", async function (req, res) {
    const session_id = req.body.session_id;
    const email = req.body.email;
    const new_password = req.body.new_password;

    const response = await userController.change_password(session_id, email, new_password);

});

apiRouter.post("/delete_user", async function (req, res) {
    const email = req.body.email;

    const response = await userController.delete_user(email);

    res.send(response)
});
//--------------------------------------------------//
// Post controller API
// get posts by author
apiRouter.post("/get_authors_posts", async function (req, res) {
    const session_id = req.body.session_id;
    const session = await sessionDataManager.get_session_by_session_id(session_id);
    const response = await postController.fetch_posts_author(session[1]);
    res.send(response)
});

//get posts by user status

apiRouter.post("/get_posts_user_status", async function (req, res) {
    const session_id = req.body.session_id;
    const session = await sessionDataManager.get_session_by_session_id(session_id);
    const response = await postController.fetch_posts_by_user(session[1]);
    res.send(response)
});

//create post
//id, title, author, premium content, ingredients, instructions
apiRouter.post("/create_post", async function (req, res) {
    const session_id = req.body.session_id;
    const session = await sessionDataManager.get_session_by_session_id(session_id);
    const title = req.body.title;
    const author = session[1];
    const status = req.body.premiumStatus;
    const ingred = req.body.ingredients;
    const instruct = req.body.instructions;
    const response = await postController.create_post(title, author, status, instruct, ingred);
    res.send(response)
});

// edit  post
apiRouter.post("/edit_post", async function (req, res) {
    const session_id = req.body.session_id;
    const session = await sessionDataManager.get_session_by_session_id(session_id);
    const postID = req.body.postID
    let currPost = await postController.fetch_posts_id(postID);
    if (currPost[2] === session[1]) {
        const title = req.body.title;
        const status = req.body.premiumStatus;
        const ingred = req.body.ingredients;
        const instruct = req.body.instructions;
        const response = await postController.edit_post(postID, title, status, ingred, instruct);
        res.send(response)
    }
    else{
        res.send("Server Error");
    }
});
//delete post
apiRouter.post("/delete_post", async function (req, res) {
    const postID = req.body.postID;
    const response = await userController.delete_user(postID);
    res.send(response)
});

//----------------------------------------------------//
export default apiRouter;