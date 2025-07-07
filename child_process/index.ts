/**
 * learning about child process in advance node js 
 * 
 * @example 
 * USE CASE: child processes when you need complete isolation or wnat to utlize external processes.
 * Choose worker threads for parellel computation within the single process.
 * 
 * RESOURCE UTLIZATION: child processes typically have higher resouces overhead compared to worker threads due 
 * to process creation and management
 * 
 * COMPLEXITY: Child processes are simpler to implement and manage compared to worker threads,
 * which require careful handling of shared memory and Synchronizatrion.
 */

import {exec, execFile, spawn, fork} from 'child_process';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

//exec - 1st way to create the child process
// this below does not spin the new child process coz we are just running cmd.
// exec('ls -lh', (err, stdout, stderr) => {
//     if(err){
//         console.error(`Error: ${err.message}`);
//         return;
//     }

//     if(stderr){
//         console.error(`stderr: ${stderr}`)
//     }

//     console.log(`stdout:\n ${stdout}`);
// });



//execFile
const fileProcessorPath = path.resolve(__dirname, "execFileProcessor.ts");
execFile('bun', [fileProcessorPath], (err, stdout, stderr) => {
       if(err){
        console.error(`Error: ${err.message}`);
        return;
    }

    if(stderr){
        console.error(`stderr: ${stderr}`)
    }

    console.log(`stdout:\n ${stdout}`);
})


//spawn
const spawnChild = spawn('find', ['.']); // registers for events
spawnChild.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`)
})

spawnChild.stderr.on("data", (data) => {
     console.log(`stderr:\n${data}`)
})

spawnChild.on("error", (err) => {
    console.error(`Error: ${err.message}`);
})

spawnChild.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
})

//fork -> this child process can communicate with each other. 
const forkProcessorPath = path.resolve(__dirname, "forkProcessor.ts");
const forkedChild = fork(forkProcessorPath);
forkedChild.on("message", (msg) => {
    console.log(`Message from the data processor exchange: ${msg}`);
})
forkedChild.send({hello: "sahil"});