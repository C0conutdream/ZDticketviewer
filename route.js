
// let http = require('http');
// let https = require('https');
const url = require('url');
let fs = require('fs');
let https = require('https');


html = {
    render(path, response) {
        fs.readFile(path, null, function (error, data) {
            if (error) {
                response.writeHead(404);
                respone.write('file not found');
            } else {
                response.write(data);
            }
            response.end();
        });
    }
}
module.exports = {
    handleRequest(request, response) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let path = url.parse(request.url).pathname;
        
        switch (path) {
            case '/':
                html.render('./ticket.html', response);
                break;
            case '/about':
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
                res.on('data', (chunk) => {
                    body += chunk;
                  });
                  res.on('end', () => {
                    //changingjson to an object for readability 
                    let json = JSON.parse(body);
                    // getting rid of non ticket information 
                    json = json.tickets;
                    var myJSON = JSON.stringify(json);
                    response.write(myJSON);
                    response.end();
                  });
                });

       
                
                req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                  });
                req.end()


                break; 
                default:
                response.writeHead(404);
                response.write('Route not found');
                response.end();
        }   
    }
}

function getTickets(){    
   
        return picked;    }
