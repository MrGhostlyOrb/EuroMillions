 var eyes = require('eyes');
 var https = require('https');
 var fs = require('fs');
 var xml2js = require('xml2js');
 var parser = new xml2js.Parser({ attrkey: "ball"});

 parser.on('error', function(err) { console.log('Parser error', err); });

 var data = '';
 https.get('https://www.national-lottery.co.uk/results/euromillions/draw-history-full/xml', function(res) {
     if (res.statusCode >= 200 && res.statusCode < 400) {
       res.on('data', function(data_) { data += data_.toString(); });
       res.on('end', function() {
         console.log('data', data);
         parser.parseString(data, function(err, result) {
			var ball1 = result['draw-results']['game'][0]['balls'][0]['ball'][0];
			var ball2 = result['draw-results']['game'][0]['balls'][0]['ball'][1];
			var ball3 = result['draw-results']['game'][0]['balls'][0]['ball'][2];
			var ball4 = result['draw-results']['game'][0]['balls'][0]['ball'][3];
			var ball5 = result['draw-results']['game'][0]['balls'][0]['ball'][4];
			var ball6 = result['draw-results']['game'][0]['balls'][0]['ball'][5];
			var ball7 = result['draw-results']['game'][0]['balls'][0]['ball'][6];
			ball1str = JSON.stringify(ball1);
			ball2str = JSON.stringify(ball2);
			ball3str = JSON.stringify(ball3);
			ball4str = JSON.stringify(ball4);
			ball5str = JSON.stringify(ball5);
			
			ball1strslice = ball1str.slice(6,8);
			ball2strslice = ball2str.slice(6,8);
			ball3strslice = ball3str.slice(6,8);
			ball4strslice = ball4str.slice(6,8);
			ball5strslice = ball5str.slice(6,8);
			
			if(ball1strslice[1] == '"'){
				
				ball1strslice = ball1strslice.replace('"',' ');
				ball1strslice = insert(ball1strslice,'0');
				
			};
			if(ball2strslice[1] == '"'){
				
				ball2strslice = ball2strslice.replace('"',' ');
				
			};
			if(ball3strslice[1] == '"'){
				
				ball3strslice = ball3strslice.replace('"',' ');
				
			};
			if(ball4strslice[1] == '"'){
				
				ball4strslice = ball4strslice.replace('"',' ');
				
			};
			if(ball5strslice[1] == '"'){
				
				ball5strslice = ball5strslice.replace('"',' ');
				
			};
			
			console.log(ball1strslice);
			console.log(ball2strslice);
			console.log(ball3strslice);
			console.log(ball4strslice);
			console.log(ball5strslice);
				
			
            console.log('FINISHED', err, result);
         });
       });
     }
   });