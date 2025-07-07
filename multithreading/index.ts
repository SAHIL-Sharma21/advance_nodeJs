/**
 * Implementing multi threading in nodejs advance nodejs topics 
 * to offload heavy CPU intensive task to new worker thread 
 * and does not block the main thread
 */
import express from 'express';
import {Worker} from 'worker_threads';
const app = express();
const PORT = 3001;



app.get("/non-blocking", (req, res) => {
    res.status(200).send("This page if from the non-blocking")
});

app.get("/blocking", async (req, res) => {

    const worker = new Worker('./worker.ts'); // giving file path where we have used the thread.
    worker.on("message", (data) => {
        res.status(200).send(`result of the value ${data}`)
    });

    worker.on("error", (err) => {
        res.status(404).send(`An error occured: ${err.message}`);
    })
});


app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`)
});