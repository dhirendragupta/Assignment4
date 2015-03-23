var fs = require('fs');
var js2xmlparser = require('js2xmlparser');

var SortJsonAndReturnTextData = function(jsonFileName, callback)
{

    if (jsonFileName == null) 
    {
        console.log('jsonFileName is not provided')
    }

    if (jsonFileName != null) 
    {
        fs.exists('./'+jsonFileName, function (exists)
        {
            if(exists)
            {
                

                    console.log('Started reading a file');
                    //read the json file

                    fs.readFile(jsonFileName, function(error, data) 
                    {

                        if (error) 
                        {
                            console.log('error reading the jsonFile: '+error);
                            callback(error,null);
                        }
                        else
                        {

                            try
                            {
                                
                                    console.log('Content of file: ' + data);
                            	   //parse the received data into json object
                                    var studentObject = JSON.parse(data);
                                    console.log('First Record: ', studentObject.students[0]);

                              	     //sort the jsonArray
                            	     var sortedObj = studentObject.students.sort(function(a,b) { return  parseInt(b.score) - parseInt(a.score)  } );
                            	     console.log('sortedObj: '+sortedObj);

                            	     //heading line for the text file
                                     var wholeDataString = 'ID  |  FName  |  LName  |  Score' + '\n';

                                    for (var i = 0; i < sortedObj.length; i++) 
                                    {
                                        //concat each record to a varible
                                  	    wholeDataString = wholeDataString + sortedObj[i].id + ' |  ' + sortedObj[i].fName + '  |  ' + sortedObj[i].lName + '  |  ' + sortedObj[i].score + '\n';

                                        console.log('Students' + ': ' + sortedObj[i].id + ' |  ' + sortedObj[i].fName + '  |  ' + sortedObj[i].lName + '  |  ' + sortedObj[i].score + '\n');
                                    }

                                    console.log('wholeDataString: ' + '\n' + wholeDataString);

                                    callback(null,wholeDataString);
                                    
                            }
                            catch(e)
                            {
                               console.log('Not a valid json file');
                            }
                        }
                    
                    console.log('finished executing');
                 });
            }
            else
            {
                console.log('source file '+jsonFileName+' does not exists!');
            }

            console.log('finished all the execution');
        });
    }
}


var JsonData = function(jsonFileName, callback)
{ 
    if (jsonFileName == null) 
    {
        console.log('jsonFile is not provided')
    }
    
    if (jsonFileName != null) 
    {
    
        console.log('Started reading a file');

        fs.exists('./' + 'source.json', function (exists)
        {
            if (exists)
            {
                //read the json file
                fs.readFile(jsonFileName, function(error, data) 
                {
                    if (error) 
                    {
                        console.log('error: '+error);
                        callback(error, null);
                    }
                    else
                    {
                        try
                        {
                            
                            console.log('Content of file: ' + data);
                            //parse the received data into json object
                            var studentObject = JSON.parse(data);
                            console.log('First Record: ', studentObject.students[0]);


                            callback(null, data); 
                        }
                         catch(e)
                         {
                             console.log('Not a structured json');
                             callback(error);
                         }

                    }

                });

            }
            else
            {
                     //if requested json file does not exist display error to the user
                      console.log('source file '+jsonFileName+' does not exists!');
            }

        });
        console.log('finished executing');
    }
}

var jsonToXml = function(jsonFileName, callback)
{  
        if (jsonFileName == null) 
        {
          console.log('jsonFileName is not provided')
        }
        
        if (jsonFileName != null) 
        {
            console.log('Started reading a file');

            fs.exists('./'+jsonFileName, function (exists) 
            {
              //util.debug(exists ? "it's there" : "no passwd!");
                  if (exists) 
                  {
                      //read the json file
                        fs.readFile(jsonFileName, function(error, data) 
                        {
                            if (error) 
                            {
                                console.log('error reading jsonFileName: '+error);
                                callback(error, null);
                            }
                            else
                            {
                                console.log('Content of file: ' + data);
                                //parse the received data into json object
                                var studentObject = JSON.parse(data);
                              
                                //converting the object into xml
                                var xmlData = js2xmlparser('students', studentObject);
                              
                                console.log("xmlData: "+xmlData);

                                callback(null, xmlData)
                            }

                        });
                      console.log("finished executing");
                }
                else
                {
                    console.log('source.json file does not exist');
                    callback(error, null);
                }
              
            });
        }
}

exports.jsonToXml = jsonToXml;


exports.JsonData = JsonData;

exports.SortJsonAndReturnTextData = SortJsonAndReturnTextData;