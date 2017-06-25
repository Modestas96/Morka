var Nightmare = require('nightmare');

module.exports = {

  runCommand: function(){
     new Nightmare()
       .viewport(1000, 1000)
       .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
       .goto('http://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/ievos-nuzudymo-byla-facebook-jau-kaista-nuo-prakeiksmu-vienam-is-itariamuju-romu-59-767182?comments')
       .inject('js', 'jquery.js')
       .wait(3000)
       .evaluate(
             function () 
             {
              return  $('html').html(); //Get Heading
             },
             function (value) 
             {
              console.log("Not in page context");
             }
          )
       .run(
            function (err, nightmare) 
                {
                    if (err) return console.log(err);
    		        //		console.log(nightmare);
                        console.log('Done!');
                }
           );
     }
}