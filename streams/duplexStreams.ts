/**Duplex streams little bit complicated */

import {Transform, pipeline} from 'stream';
import fs from 'fs';

const readable = fs.createReadStream('./myFile.txt', {encoding: "utf-8", highWaterMark: 10});
const writable = fs.createWriteStream("./newTextFile.txt");

const uppercase = new Transform({
    transform(chunk, encoding , callback){
        callback(null, chunk.toString().toUpperCase());
    }
})

// to use this we can use pipe funtion
// read the file from the readable the  pipe it through to make uppercase and the pipe it to write it in the file
// readable.pipe(uppercase).pipe(writable); // this does not handle the error case so we use pipeline method

// it will be used in production and helps avoid memory leaks
pipeline(readable, uppercase, writable, (err) => {
    if(err){
        console.error("Error: ", err);
    }
});


/**streams can be used in zlib and crypto  */