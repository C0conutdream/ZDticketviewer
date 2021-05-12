
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
                    path: '/api/v2/tickets.json?page[size]=25',
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic bWFkZGlzb24uaXBwb2xpdG9AZ21haWwuY29tOkFnZW9ma2luZ3M3Jg==',
                    },
                }
                const req = https.request(options,(res) => {
                    let body = "";
                res.on('data', (chunk) => {
                    body += chunk;
                  });
                  res.on('end', () => {
                    response.write(body);
                    response.end();
                  });
                });
        
                req.on('error', (e) => {
                    response.write(`problem with request: ${e.message}`);
                  });
                req.end()
                break; 

                case '/page':
                    let queryObject = url.parse(request.url).query;
                    let l = queryObject.length; 
                    queryObject =  queryObject.slice(5, l);
                    const pageOptions = {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic bWFkZGlzb24uaXBwb2xpdG9AZ21haWwuY29tOkFnZW9ma2luZ3M3Jg==',
                        },
                    }
                    const pageReq = https.request(queryObject ,pageOptions,(res) => {
                        let body = "";
                    res.on('data', (chunk) => {
                        body += chunk;
                      });
                      res.on('end', () => {
                        response.write(body);
                        
                        response.end();
                      });
                    });
                    pageReq.on('error', (e) => {
                        console.error(`problem with request: ${e.message}`);
                          });
                        pageReq.end()
                        break; 

                default:
                response.writeHead(404);
                response.write('Route not found');
                response.end();
        }   
    }
}

