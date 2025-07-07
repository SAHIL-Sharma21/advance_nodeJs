/**
 * Worker file where we create or generate the new instance of the thread
 */

import {parentPort} from 'worker_threads';

let counter = 0;
for(let i = 0; i < 20_000_000_000; i++){
    counter++;
}

// postMessage is a way we can comminciate with the main thread;
parentPort?.postMessage(counter);
