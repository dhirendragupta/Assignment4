/* 
Created by Dhirendra
*/


var StringManip = function() {
	console.log("Instantiating StringManip class");
};

/*
     * unction to accepts string and json object to check substing.
     * @param string
     * @param data
     */
StringManip.prototype.hasString = function (string, data, callback) {

	console.log("[checkSubstring.js]  >> [hasString]  >> Checking substring");

	var record = data.students;
	var result = [];
	for(var i=0; i<record.length; i++)
	{	
		//checking fName or lName has string ( indexOf() returns index of string if it is present else return -1 ) 
		if(((record[i].fName).toLowerCase()).indexOf(string.toLowerCase()) > -1 || ((record[i].lName).toLowerCase()).indexOf(string.toLowerCase()) > -1 ) {

			//pushing that object in new array
			result.push(record[i]);
			console.log("inside check-" + record[i].fName);
		}
	}
	//assigning json object's array to new array
	data.students = result;
	callback(null, data);

	console.log("[checkSubstring.js]  >> [hasString]  >> Checking completed");
}

exports.StringManip = new StringManip();
