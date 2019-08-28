//Variable definitions for xml and html parser
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

//XHR get request for the document
xhr.open("GET", "https://www.national-lottery.co.uk/results/euromillions/draw-history-full/xml", false);

//XHR setup for reading document
xhr.setRequestHeader('Content-Type', 'text/xml');

//Send the xhr request to the server
xhr.send();

//Create a new variable for the resonse
var responseXML = new global.XMLDocument(activity.output, true); 

//Assign the response to a xml variable
xmlDocument = xhr.responseXML;

//Print out the result of the request
console.log(xmlDocument.childNodes['0'].textContent);