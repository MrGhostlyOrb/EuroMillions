//Initial setup
'use strict';

//Defining Google Assistant Constants
const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug:true });

//Calling the first Intent for the first number
app.intent('firstNumber', (conv, {number}) => {

//Defining variables user to parse the online xml document
	var eyes = require('eyes');
	var https = require('https');
	var fs = require('fs');
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser({ attrkey: "ball"});

//Main parser loop, if parser fails then the error is logged and printed
	parser.on('error', function(err) { console.log('Parser error', err); });

//Empty data variable is defined
	var data = '';
	
//Get request to recieve the online xml file
	https.get('https://www.national-lottery.co.uk/results/euromillions/draw-history-full/xml', function(res) {

//Checks for and html errors with the document before continuing 
		if (res.statusCode >= 200 && res.statusCode < 400) {
			
//Changes the data from the document into a readable string form
			res.on('data', function(data_) { data += data_.toString(); });
			
//Logs and prints the data recieved from the xml document
			res.on('end', function() {
            console.log('data', data);
			
//Resulting functions to manipulate data
            parser.parseString(data, function(err, result) {
				
//Extracting the number of the first ball in the draw
			var ball1 = result['draw-results']['game'][0]['balls'][0]['ball'][0];

//Changes the returned object from the xml into string form
			var ball1str = JSON.stringify(ball1);
			
//Slice the string to get rid of unwanted data
			var ball1strslice = ball1str.slice(6,8);

//If the number is < 10 the extra character is removed
			if(ball1strslice[1] == '"'){

//Replaces extra character with a space
				ball1strslice = ball1strslice.replace('"',' ');

			};
		
//Prints final number of the draw	
			console.log(ball1strslice);
		
//If the user's number is = to the first draw number then a response is given
			if(number = ball1strslice){
				conv.response("That's a match!");
				conv.ask("How Did you do that?");
			};

					
//Prints a final finished statement
            console.log('FINISHED', err, result);
         });
       });
     }
   });
});

//Google assistant exports
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);