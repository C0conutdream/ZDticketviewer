
// setting up node to listen and render html 
let http = require('http');
let router = require('./route');

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
};
http.createServer(router.handleRequest).listen(8000);