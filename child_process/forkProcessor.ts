process.on("message", (msg) => {
    console.log(`Mesage from parentprocess: ${msg}`);
})

let counter = 0;
setInterval(() => {
    process.send?.({counter: counter++})
}, 1000);