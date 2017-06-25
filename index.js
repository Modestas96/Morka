'use strict';
var Nightmare = require('nightmare');
var cheerio = require('cheerio');
const  db = require('./db');

const night = require('./stringToCommand.js');

const express = require('express');

var request = require('request');


// Webserver parameter
const PORT = process.env.PORT || 8445;

var _eval = require('eval');

function addClick(nightmare, path){
	return nightmare
				.wait(500)
				.wait(path)
				.click(path);
}

function ktuLogin3000(url, path123, clickArr, inputArr, clickCount){
	console.log("hey");

	var nightmare = Nightmare({
	    show: true
	});

	nightmare
		   .viewport(1000, 1000)
		   .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
		   .goto(url)//'http://www.15min.lt/verslas/naujiena/finansai/1990-uju-kovo-menesio-skelbimai-isdave-lietuviu-troskima-emigruoti-662-767086?comments'
		   .inject('js', 'jquery.js');

	for (var i = 0; i < clickArr.length; i++) {
		console.log(i);
		if(i == 1){
			nightmare
				.type(inputArr[0], 'modjur')
				.type(inputArr[1], 'Modestas123+')
				.click(clickArr[1])
		}else{
			addClick(nightmare, clickArr[i]);
		}
	}
	nightmare.evaluate(function(){
		return $('html').html();
	}).run(function (err, nightmare) 
    {
        if (err) return console.log(err);
        console.log('Done!');
        
        var sht=nightmare;
        var dx = "";

	    for(var i in sht){
	      dx+=sht[i];
	    }
	
	  	var $ = cheerio.load(dx);
	  	var textData = $(path123).text();
	  	console.log("---------------------");
	  	console.log(textData);
	  	console.log("---------------------");
	  	/*request.get('https://lit-scrubland-11123.herokuapp.com/sendfromlocal'+'?message='+ encodeURIComponent(textData) + " Data received??", null, function(err, res, body){
			
		});*/

    	//db.query("INSERT INTO hackerdata (user_id, url, data_text, clk_cnt, clk_arr, selector) VALUES ($1,$2,$3,$4,$5,$6)", [3, url, textData, clickCount, ',,', path123], callback);
    });
}

const app = express();

var http = require('http');
app.listen(8445	, 'localhost', function() {
   
   	var url = 'https://uais.cr.ktu.lt/ktuis/stp_prisijungimas';
	var path123 = 'body > div:nth-child(14) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > table:nth-child(4)';
	var clickArr = ['body > div:nth-child(3) > div > div > form:nth-child(1) > fieldset > div > div > button',
					'body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td:nth-child(3) > input',
					'body > div > div:nth-child(3) > form:nth-child(2) > input',
					'body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div > div > p > a',
					'body > div:nth-child(4) > div > div:nth-child(2) > ul > li:nth-child(1) > a',
					'body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(6) > span'					
					];

	var inputArr = ['body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input',
					'body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input'];	
	var clickCount = 7;

    ktuLogin3000(url, path123, clickArr, inputArr, clickCount);


    //testas('https://tinklas.ktu.lt/index.php/lt/', 'body > div > section:nth-child(3) > div > div',2,arr);
});
  app.get('/prideti', function(req, res) {
  	var url = 'https://uais.cr.ktu.lt/ktuis/stp_prisijungimas';
	var path123 = 'body > div:nth-child(14) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > table:nth-child(4)';
	var clickArr = ['body > div:nth-child(3) > div > div > form:nth-child(1) > fieldset > div > div > button',
					'body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td:nth-child(3) > input',
					'body > div > div:nth-child(3) > form:nth-child(2) > input',
					'body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div > div > p > a',
					'body > div:nth-child(4) > div > div:nth-child(2) > ul > li:nth-child(1) > a',
					'body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(6) > span'					
					];
	var inputArr = ['body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input',
					'body > div:nth-child(1) > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input'];	
	var clickCount = 7;
	
	console.log("gavooom");
	ktuLogin3000(url, path123, clickArr, inputArr, clickCount);
  });

  app.get('/rezults', function(){
  		db.query("SELECT * FROM hackerdata WHERE user_id=$1", [3], callbackFromServer)
  });


function callbackFromServer(err, res){
	if(err){
		console.log(err);
	}
	else{
		console.log(res);
	}

	app.writeHead(200, {"Content-Type": "text/plain"});
  	app.end(res);
}
  	
function callback(err, res){
	if(err){
		console.log("err");
		console.log(err);
	}
	else{
		console.log(res);
	}
}