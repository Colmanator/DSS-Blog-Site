//IMPORTS AND CONFIG
//--------------------------------------------------//
import pg from 'pg';
const { Client } = pg;
import express from 'express';
const app = express();

//dirname is not specified in module scope so is specified here
// https://masteringjs.io/tutorials/node/__dirname-is-not-defined
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import tablesDM from "./datamen/tables.js";
import userController from "./controllers/userController.js";
import apiRouter from './apiRouter.js';
import getClientObject from "./getClientObject.js";
//--------------------------------------------------//


//SETUP
//--------------------------------------------------//
const port = 3000;

//Creates DB tables if not already existing
tablesDM.create_user_table(getClientObject());
tablesDM.create_post_table(getClientObject());
tablesDM.create_review_table(getClientObject());
tablesDM.create_session_table(getClientObject());
//--------------------------------------------------//


//TOAD SETUP (SESSION PRUNING)
//--------------------------------------------------//
import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler'

const scheduler = new ToadScheduler()

const task = new Task(
    'Prune Sessions',
    () => {
        userController.prune_sessions()
    }
)
const job = new SimpleIntervalJob({ seconds: 3, }, task)

scheduler.addSimpleIntervalJob(job)
//--------------------------------------------------//


//ROUTER CONFIG
//--------------------------------------------------//
app.use("/api", apiRouter)
app.use(express.static('public'))

// Landing page
app.get('/', (req, res) => {
    /// send the static file
    res.sendFile(__dirname + '/pages/login.html', (err) => {
        if (err){
            console.log(err);
        }
    })
});

app.get('/register', (req, res) => {
    /// send the static file
    res.sendFile(__dirname + '/pages/register.html', (err) => {
        if (err){
            console.log(err);
        }
    })
});

app.get('/home', (req, res) => {
    /// send the static file
    res.sendFile(__dirname + '/pages/index.html', (err) => {
        if (err){
            console.log(err);
        }
    })
});

app.listen(port, () => {
    console.log(`My app listening on port ${port}!`)
});
//--------------------------------------------------//
