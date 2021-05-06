
// setting up node to listen and render html 
let http = require('http');
let https = require('https');
let fs = require('fs');
const _ = require('lodash'); 

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./ticket.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
};
http.createServer(handleRequest).listen(8000);

//Commented out for now to help whole code run 
function getTickets(){    


const options = {
    hostname: 'maddythedietitian.zendesk.com', 
    path: '/api/v2/tickets',
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic bWFkZGlzb24uaXBwb2xpdG9AZ21haWwuY29tOkFnZW9ma2luZ3M3Jg=='
    },
}
const req = https.request(options,(res) => {
    let body = "";
console.log(res);
res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    //changingjson to an object for readability 
    let json = JSON.parse(body);
    // getting rid of non ticket information 
    json = json.tickets;
    console.log(json);     
    var cleanedTickets = extract(json);
    console.log(cleanedTickets); 
    var myJSON = JSON.stringify(cleanedTickets);
    console.log('No more data in response.');
    return cleanedTickets;
  });
});

req.on('error', (e) => {
console.error(`problem with request: ${e.message}`);
  });
req.end()
// function to get the peices of the json that we need 
 function extract (json) {
    let picked = []; 
    for (var i = 0; i < json.length; i++){
    let subset = _.pick(json[i], ['subject', 'created_at','requester_id', 'type']);
    picked.push(subset);
    } 
    return picked;
 }
 

}
