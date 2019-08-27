var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.national-lottery.co.uk/results/euromillions/draw-history-full/xml", false);

xhr.setRequestHeader('Content-Type', 'text/xml');
xhr.send();
var responseXML = new global.XMLDocument(activity.output, true); 
xmlDocument = xhr.responseXML;
console.log(xmlDocument.childNodes['0'].textContent);