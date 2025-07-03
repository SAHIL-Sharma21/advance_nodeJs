/**
 * Writeable streasm in nodejs advance
 */
import fs from 'fs';


const writable = fs.createWriteStream("newTextFile.txt");
writable.write("hello, ")
writable.end("Sahil");


