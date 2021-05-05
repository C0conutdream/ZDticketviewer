function getTickets(){

const https = require('https')
const _ = require('lodash')

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
    let json = JSON.parse(body);
    json = json.tickets;
    console.log(json);     
    var cleanedTickets = extract(json);
    console.log(cleanedTickets); 

    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
console.error(`problem with request: ${e.message}`);
  });
req.end()

 function extract (json) {
    let picked = []; 
    for (var i = 0; i < json.length; i++){
    let subset = _.pick(json[i], ['subject', 'created_at', 'type']);
    picked.push(subset);
    } 
    return picked;
 }

 app.get('/main', function(req, res) {

    var name = 'hello';
  
    res.render(__dirname + "/views/layouts/main.html", {name:name});
  
  });
return picked; 

}
