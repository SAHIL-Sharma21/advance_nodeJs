/**
 * Optimising the code more bu using 4 core of the cpu 
 * attaining paralliesm
 */

import express from 'express';
import {Worker} from 'worker_threads';
const app = express();
const PORT = 3001;
const THREAD_COUNT = 4;


app.get("/non-blocking", (req, res) => {
    res.status(200).send("This page if from the non-blocking")
});

function createWorker(): Promise<number>{
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four-worker.ts", {
            workerData: {thread_count: THREAD_COUNT},
        });

        worker.on("message", (data) => {
             resolve(data as number);
        });

        worker.on("error", (err) => {
            reject(err);
        })
    })
}

app.get("/blocking", async (req, res) => {
    const workerPromises = [];

    for(let i = 0 ; i < THREAD_COUNT; i++){
        workerPromises.push(createWorker());
    }

    const threadResult: number[] = await Promise.all(workerPromises);

    const total = threadResult[0] + threadResult[1] + threadResult[2]  + threadResult[3];

    res.status(200).send(`Result data is ${total}`);

});


app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`)
});