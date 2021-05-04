const https = require('https')

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
    console.log(json);
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
console.error(`problem with request: ${e.message}`);
  });
req.end()