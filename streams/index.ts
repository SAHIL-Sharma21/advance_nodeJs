/**
 * Streams in NodeJs 
 * Handy way to manage the files in the node js server 
 * Data is trandferred as buffer and we can read/write big files easily.
 */

import fs from 'fs';


// Readable streams 
// if file is 200 BYTE, then chunk will be 20 BYTE
const readable = fs.createReadStream("./myFile.txt", {encoding: "utf-8", highWaterMark: 5});

let chunkCount = 0;

readable.on("data", (chunk) => {
    if(chunkCount === 2){
        //pause streams
        readable.pause();

        // resume streams
        setTimeout(() => {
            readable.resume();
        }, 3000);
    }

    console.log("New chunk Data: ", chunk.toString());
    chunkCount++;
});

readable.on("close", () => {
    console.log(">> Finished reading file")
});


/**we can also read file in async way by using IIFE */
// (async() => {
//     for await (const chunk of readable){
//         console.log("new chunk: ", chunk.toString());
//     }
// })()
