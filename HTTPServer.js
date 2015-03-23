//Created by Dhirendra Gupta at MindStix


//import required modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var converterModule = require('./converterModule.js');
var checkSubstring = require("./checkSubstring");
var js2xmlparser = require('js2xmlparser');
var StringManip = checkSubstring.StringManip;


var RESTEndPoint = '//students/';

//Sever class with constructor
var Server = function()
{
	console.log('Server has started !');
}

//The Sever.prototype property represents the Server prototype object.
//using Sever.prototype object create a start function as below 
Server.prototype.start = function()
{

	http.createServer(function (req, res) 
  {
	//check the request url	
	console.log("Received request url: " + req.url);
  	var url_parts = url.parse(req.url, true);
  	console.log('url_parts = '+JSON.stringify(url_parts));
  	var pathName = url_parts.pathname;
  	console.log('pathName = '+pathName);
  	var query = url_parts.query;
  	console.log('query = '+query.q);
  	var requestType = req.headers.accept;
  	console.log('requestType1 = '+requestType);
	
  	//check if the requet is a get 
		if(req.method == 'GET')
		{
      	if(pathName == RESTEndPoint)
      	{

      						var sorted = "";
							//checking querystring is provided or not
							if(query.q != null) 
							{	


								///
								switch(requestType)
                              {
                                case 'json':
                                  //display the data to the user
                                     converterModule.JsonData('source.json', function(error, data)
									  {
	                                      if(error)
	                                      {
	                                          console.log("error");
	                                      }
	                                      else
	                                      {
	                                          console.log('result = '+data);
	                                          //var object = sort.sortArray(JSON.parse(data));
											  var object = JSON.parse(data);

											  //calling hasString by passing querystring and json object
											 StringManip.hasString(query.q, object,function(err, data) {
											  	if(data) {
											  		res.writeHead(200,{"content-type" : "application/json"});
											  		res.end(JSON.stringify(data));
											  	}
											  });
											  
	                                      }
	                                   });

                                  break;
                                case 'xml':
                                  
                                  converterModule.JsonData('source.json', function(error, data)
									  {
	                                      if(error)
	                                      {
	                                          console.log("error");
	                                      }
	                                      else
	                                      {
	                                          console.log('result = '+data);
	                                          //var object = sort.sortArray(JSON.parse(data));
											  var object = JSON.parse(data);

											  //calling hasString by passing querystring and json object
											 StringManip.hasString(query.q, object,function(err, data) {
											  	if(data) {
											  		res.writeHead(200,{"content-type" : "application/xml"});
											  		//res.end(JSON.stringify(data));
											  		//parse the received data into json object
                                					var studentObject = data;
											  		//converting the object into xml
                                					var xmlData = js2xmlparser('students', studentObject);
                              
                                					console.log("xmlData: "+xmlData);
                                					res.end(xmlData);
											  	}
											  });
											  
	                                      }
	                                   });
                                  	break;

                                case 'text':

                                converterModule.JsonData('source.json', function(error, data)
									  {
	                                      if(error)
	                                      {
	                                          console.log("error");
	                                      }
	                                      else
	                                      {
	                                          console.log('result = '+data);
	                                          //var object = sort.sortArray(JSON.parse(data));
											  var object = JSON.parse(data);

											  //calling hasString by passing querystring and json object
											 StringManip.hasString(query.q, object,function(err, data) {
											  	if(data) {
											  		res.writeHead(200,{"content-type" : "text/plan"});
											  		//res.end(JSON.stringify(data));
											  		//parse the received data into json object
                                					var studentObject = data;
											  	
											  	//converting the object into text
                                				
                                				var studentObject = data;
			                                    console.log('First Record: ', studentObject.students[0]);

            			                  	     //sort the jsonArray
                        		    	     	var sortedObj = studentObject.students.sort(function(a,b) { return  parseInt(b.score) - parseInt(a.score)  } );
                            			     	console.log('sortedObj: '+sortedObj);

                            	     			//heading line for the text file
                                     			var wholeDataString = 'ID  |  FName  |  LName  |  Score' + '\n';
                                     			console.log('sortedObj.length = '+sortedObj.length);

			                                    for (var i = 0; i < sortedObj.length; i++) 
			                                    {
			                                        //concat each record to a varible
			                                  	    wholeDataString = wholeDataString + sortedObj[i].id + ' |  ' + sortedObj[i].fName + '  |  ' + sortedObj[i].lName + '  |  ' + sortedObj[i].score + '\n';

			                                        console.log('Students' + ': ' + sortedObj[i].id + ' |  ' + sortedObj[i].fName + '  |  ' + sortedObj[i].lName + '  |  ' + sortedObj[i].score + '\n');
			                                    }

			                                    console.log('wholeDataString: ' + '\n' + wholeDataString);
			                                    res.end(wholeDataString);
			                                    wholeDataString = null;

											  	}
											  });
											  
	                                      }
	                                   });
                                
                                  break;
                                default:
                                      //display the data to the user
                                  res.writeHead(200,{'content-type':'text/plan'});
                                  res.end(data);
                              }
                              
								
							}
							else
							{
                            	switch(requestType)
                              {
                                case 'json':
                                  //display the data to the user
                                  res.writeHead(200,{'content-type':'application/json'});
                                  //res.end(data);JsonData
                                  converterModule.JsonData('source.json', function(error, data){
                                      if(error)
                                      {
                                          console.log("error");
                                      }
                                      else
                                      {
                                          console.log('result = '+data);
                                          res.end(data);
                                      }
                                  });

                                  break;
                                case 'xml':
                                  //display the data to the user
                                  res.writeHead(200,{'content-type':'application/xml'});
                                  //res.end(data);jsonToXml
                                  converterModule.jsonToXml('source.json', function(error, data){
                                      if(error)
                                      {
                                          console.log("error");
                                      }
                                      else
                                      {
                                          console.log('result = '+data);
                                          res.end(data);
                                      }
                                  });
                                  break;
                                case 'text':
                                   //display the data to the user
                                  res.writeHead(200,{'content-type':'text/plan'});
                                  //res.end(data);
                                  converterModule.SortJsonAndReturnTextData('source.json', function(error, data){
                                      if(error)
                                      {
                                          console.log("error");
                                      }
                                      else
                                      {
                                          console.log('result = '+data);
                                          res.end(data);
                                      }
                                  });
                                  break;
                                default:
                                      //display the data to the user
                                  res.writeHead(200,{'content-type':'text/plan'});
                                  res.end(data);
                              }
                            }
                        
		}
      else
      {
        console.log('Page not found');
        res.writeHead(404,{'content-type':'text/html'});
        res.end('<h2>Page Not found !</h2>');
      }
    }

    else
    {
      //If the request is other than GET it will be traeted as Bad request
      res.writeHead(401,{'content-type':'text/html'});
      res.end('<h2>This is a bad request</h2>')
    }
    
	}).listen(8000, function(){
    console.log('Listening to port number 8000 !')
  });
}

//create a Server object and start it.
var myServer = new Server();
myServer.start();