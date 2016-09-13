#!/usr/bin/env node
'use strict';
const http = require('http');
const argv = require('yargs')
.help().default({
    stop_delay: 5,
    request_delay: 1,
}).argv;

let req = 0;
const pong = (req, res, head)=>{
    let id = ++req;
    console.log('Got request', id);
    setTimeout(()=>{
            res.write('HTTP/1.1 200 PONG\r\n\r\n');
            res.end();
            console.log('Done request', id);
        }, argv.request_delay*1000);
};

console.log('Starting server');
const server = http.createServer(pong);
server.on('listening', ()=>{
    console.log('Server listening on:', server.address().port);
    setTimeout(()=>{
            console.log('Stopping server');
            server.close(()=>console.log('Server stopped'));
        }, argv.stop_delay*1000);
});
server.listen();
console.log('done');
