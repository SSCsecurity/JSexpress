/**
 * Node and express examples
 */



const options = {
  host: 'somesite.com',
  port: 443,
  path: '/some/path',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const http = require('http');
const https = require('https');

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

module.exports.getJSON = (options, onResult) => {
  console.log('rest::getJSON');
  const port = options.port == 443 ? https : http;

  let output = '';

  const req = port.request(options, (res) => {
    console.log(`${options.host} : ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);

      onResult(res.statusCode, obj);
    });
  });

  req.on('error', (err) => {
    // res.send('error: ' + err.message);
  });

  req.end();
};

var http = require('http');
var options = {
  host: 'www.google.com',
  path: '/index.html'
};

var req = http.get(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    console.log('BODY: ' + body);
    // ...and/or process the entire body here.
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

var request=require('request');

request.get('https://someplace',options,function(err,res,body){
  if(err) //TODO: handle err
  if(res.statusCode === 200 ) //etc
  //TODO Do something with response
});

var requestify = require('requestify');

requestify.get('http://example.com/api/resource')
  .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      response.getBody();
  }
);

let http = require("http"),
    https = require("https");

/**
* getJSON:  REST get request returning JSON object(s)
* @param options: http options object
*/
exports.getJSON = function (options) {
    console.log('rest::getJSON');
    let reqHandler = +options.port === 443 ? https : http;

    return new Promise((resolve, reject) => {
        let req = reqHandler.request(options, (res) => {
            let output = '';
            console.log('rest::', options.host + ':' + res.statusCode);
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', () => {
                try {
                    let obj = JSON.parse(output);
                    // console.log('rest::', obj);
                    resolve({
                        statusCode: res.statusCode,
                        data: obj
                    });
                }
                catch (err) {
                    console.error('rest::end', err);
                    reject(err);
                }
            });
        });

        req.on('error', (err) => {
            console.error('rest::request', err);
            reject(err);
        });

        req.end();
    });
};

router.get('/:id', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/posts/${req.params.id}`,
        method: 'GET'
    }).then(({ statusCode, data }) => {
        res.json(data);
    }, (error) => {
        next(error);
    });
});


var unirest = require('unirest')

// GET a resource
unirest.get('http://httpbin.org/get')
  .query({'foo': 'bar'})
  .query({'stack': 'overflow'})
  .end(function(res) {
    if (res.error) {
      console.log('GET error', res.error)
    } else {
      console.log('GET response', res.body)
    }
  })

// POST a form with an attached file
unirest.post('http://httpbin.org/post')
  .field('foo', 'bar')
  .field('stack', 'overflow')
  .attach('myfile', 'examples.js')
  .end(function(res) {
    if (res.error) {
      console.log('POST error', res.error)
    } else {
      console.log('POST response', res.body)
    }
  })
  
  const axios = require('axios');

axios.get('https://google.com')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
  let RequestClient = require("reqclient").RequestClient

let client = new RequestClient({
  baseUrl: "https://myapp.com/api/v1",
  cache: true,
  auth: {user: "admin", pass: "secret"}
})

module.exports = client

let client = require('client')
//let router = ...

router.get('/dashboard', (req, res) => {
  // Simple GET with Promise handling to https://myapp.com/api/v1/reports/clients
  client.get("reports/clients")
    .then(response => {
       console.log("Report for client", response.userId)  // REST responses are parsed as JSON objects
       res.render('clients/dashboard', {title: 'Customer Report', report: response})
    })
    .catch(err => {
      console.error("Ups!", err)
      res.status(400).render('error', {error: err})
    })
})

router.get('/orders', (req, res, next) => {
  // GET with query (https://myapp.com/api/v1/orders?state=open&limit=10)
  client.get({"uri": "orders", "query": {"state": "open", "limit": 10}})
    .then(orders => {
      res.render('clients/orders', {title: 'Customer Orders', orders: orders})
    })
    .catch(err => someErrorHandler(req, res, next))
})

router.delete('/orders', (req, res, next) => {
  // DELETE with params (https://myapp.com/api/v1/orders/1234/A987)
  client.delete({
    "uri": "orders/{client}/{id}",
    "params": {"client": "A987", "id": 1234}
  })
  .then(resp => res.status(204))
  .catch(err => someErrorHandler(req, res, next))
})

var request = require('request');


router.get('/external-api', function(req, res){ 

    request('http://www.google.com', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          res.send(body)
    });

})

//imports express module
let express = require('express');
//initializes express app
let app = express();

//creates get function with request and response parameters
app.get('/home', function(req, res){

    //sends response to client or browser
    res.send("Welcome to Homepage");
