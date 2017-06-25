var Nightmare = require('nightmare');
var cheerio = require('cheerio');
const db = require('./db');
const express = require('express');
var _eval = require('eval');

var user_id = 3;


var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('5 * * * * *', function(){
  //runCommand(user_id);
});

runCommand(user_id);



function runCommand(userId){
	db.query("Select * from hackerdata WHERE user_id = $1",[userId], callback1);
}
function callback2(err, res){
	if(err)
		console.log(err);
	else
		console.log(res);
}
function callback1(err, res){
	for(var i = 0;  i < /*result.rows.length*/1; i++){
        console.log(res.rows[i]);
        var textData = res.rows[i].data_text;
        var clickCount = res.rows[i].clk_cnt;
        var clickArr = res.rows[i].clk_arr.split(',');
        var selector = res.rows[i].selector;
        var url = res.rows[i].url;
        var id = res.rows[i].id;
        //console.log(clickArr);

        testas(url, selector, clickCount, clickArr, textData, id);
    }
}
function checkIfSame(prev, newData, id){
	if(prev != newData){
		db.query("UPDATE hackerdata SET data_text=$1 WHERE id=$2", [newData, id], callback2);
		console.log("NOTIFYED");
	}else{		
		console.log("NOTING CHANGED");
	}
}








function testas(url, path, clickCount, clickArr, prevData, id){
	var nightmare = Nightmare({
	    show: true
	});
	if(clickCount == 0){
	    nightmare
		   .viewport(1000, 1000)
		   .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		   .goto(url)//'http://www.15min.lt/verslas/naujiena/finansai/1990-uju-kovo-menesio-skelbimai-isdave-lietuviu-troskima-emigruoti-662-767086?comments'
		   .inject('js', 'jquery.js')
		   .evaluate(function(inerpath)
		             {
		             	console.log("yea");
		              	//return document.body.innerHTML;
		              	return $('html').html(); //Get Heading
		              	//return inerpath;
		             },
		             function (value) 
		             {
		              console.log("Not in page context");
		             },'html'
		    )
		   .run(
		        function (err, nightmare) 
		            {
		                if (err) return console.log(err);
		                console.log('Done!');
		                var sht=nightmare;
		                var dx = "";
					    for(var i in sht)
					      dx+=sht[i];
					
					  	var $ = cheerio.load(dx);
					  	var textData = $(path).html();
					  	console.log(textData);
		            	//db.query("INSERT INTO hackerdata (user_id, url, data_text) VALUES ($1,$2,$3)", [3, url, textData], callback);
		            }
		       );
	}else if(clickCount == 1){
		 nightmare
		   .viewport(1000, 1000)
		   .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		   .goto(url)//'http://www.15min.lt/verslas/naujiena/finansai/1990-uju-kovo-menesio-skelbimai-isdave-lietuviu-troskima-emigruoti-662-767086?comments'
		   .inject('js', 'jquery.js')
		   .click(clickArr[0])
		   .evaluate(function(inerpath)
		             {
		             	console.log("yea");
		              	//return document.body.innerHTML;
		              	return $('html').html(); //Get Heading
		              	//return inerpath;
		             },
		             function (value) 
		             {
		              console.log("Not in page context");
		             },'html'
		    )
		   .run(
		        function (err, nightmare) 
		            {
		                if (err) return console.log(err);
		                console.log('Done!');
		                var sht=nightmare;
		                    var dx = "";
					    for(var i in sht)
					      dx+=sht[i];
					
					  	var $ = cheerio.load(dx);
					  	var textData = $(path).html();
					  	console.log(textData);
		            	db.query("INSERT INTO hackerdata (user_id, url, data_text) VALUES ($1,$2,$3)", [3, url, textData], callback);
		            }
		       );
	}else if(clickCount == 2){
		 nightmare
		   .viewport(1000, 1000)
		   .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		   .goto(url)//'http://www.15min.lt/verslas/naujiena/finansai/1990-uju-kovo-menesio-skelbimai-isdave-lietuviu-troskima-emigruoti-662-767086?comments'
		   .inject('js', 'jquery.js')
		   .wait(clickArr[0])
		   .click(clickArr[0])
		   .wait(clickArr[1])
		   .then(function(elementExists){
		   		return nightmare
		   			.click(clickArr[1])
		   			.wait(path)
		   			.evaluate(function(inerpath)
			             {
			             	console.log("yea");
			              	return $('html').html(); //Get Heading
			             },
			             function (value) 
			             {
			              console.log("Not in page context");
			             },'html'
		    		/*).run(function (err, nightmare) 
		            {
		                if (err) return console.log(err);
		                console.log('Done!');
		                var sht=nightmare;
		                    var dx = "";
					    for(var i in sht)
					      dx+=sht[i];
					
					  	var $ = cheerio.load(dx);
					  	var textData = $(path).html();
					  	checkIfSame(prevData, textData, id);
					  	console.log(textData);
		            	//db.query("INSERT INTO hackerdata (user_id, url, data_text) VALUES ($1,$2,$3)", [3, url, textData], callback);
		            }*/
		       );
		   });   
	}else if(clickCount == 3){
		 new Nightmare(clickArr[1])
		   .viewport(1000, 1000)
		   .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		   .goto(url)//'http://www.15min.lt/verslas/naujiena/finansai/1990-uju-kovo-menesio-skelbimai-isdave-lietuviu-troskima-emigruoti-662-767086?comments'
		   .inject('js', 'jquery.js')
		   .click()
		   .evaluate(function(inerpath)
		             {
		             	console.log("yea");
		              	//return document.body.innerHTML;
		              	return $('html').html(); //Get Heading
		              	//return inerpath;
		             },
		             function (value) 
		             {
		              console.log("Not in page context");
		             },'html'
		    )
		   .run(
		        function (err, nightmare) 
		            {
		                if (err) return console.log(err);
		                console.log('Done!');
		                var sht=nightmare;
		                    var dx = "";
					    for(var i in sht)
					      dx+=sht[i];
					
					  	var $ = cheerio.load(dx);
					  	var textData = $(path).html();
		            	db.query("INSERT INTO hackerdata (user_id, url, data_text) VALUES ($1,$2,$3)", [3, url, textData], callback);
		            }
		       );
	}
}
