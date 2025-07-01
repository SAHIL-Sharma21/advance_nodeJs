/**
 * Learning about the memory management in the node Js application
 * 
 */

import express from 'express';
const app = express();
const port = 3000;
import EventEmitter from 'events'
const eventEmitter = new EventEmitter();


// global variable -> cause memory leaks
const tasks = []

app.get("/", (req, res) => {
    //closure with an external variable refernce 
    tasks.push(function() {
        return req.headers
    });

    // too much  data
    const hugeArray = new Array(1000000).fill(req);
    // node-cache,memcached


    // circular object reference
    //@ts-ignore
    req.user = {
        id: 1,
        username: 'Inefficient user',
        badObject: req,
        hugeArray
    }

    // clear event emitter
    eventEmitter.on("start", () => {
        console.log("Useless event emitted")
    })
    // eventEmitter.removeListener("start", () => {
    //     console.log("listner removed!")
    // });

    // always remove timeout otherwise it cause memory leaks
    setTimeout(() => {
        res.send("Hello World!")
    })

})




app.listen(port, () => {
    console.log(`Server is started at port: ${port}`)
})