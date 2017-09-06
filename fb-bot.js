console.log("Facebook bot is starting...");

var fs = require("fs"); // file system
var weather = require("weather-js"); //weather api
var login = require("facebook-chat-api"); //facebook api
var config = require("./Email&Password"); // js file with email and password 


function WriteToServer(writing,i){


	http.createServer( function(req, res){
	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write(writing); 
	var moo = res; 
	res.end();    

	}).listen(8888);

	return;

}




var Location = "Cambridge, United Kingdom";
var TheWeather = 0;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


login(config, Bot); // login to facebook

function Bot(err,api){

	if(err){
		console.log(err);
	}

	console.log("Facebook Bot Started!");


	//var ChatID = ""; // The Group chat id you want the bot to be in



	// api.sendMessage("Hello, this is a weather bot.\n To active the bot type START", ChatID ); 

	api.listen(Listen); //start listening / checking if anyones sent you a message

	function Listen(err, event){


		
		var CurrentChat = event.threadID;
		console.log("Hello, someone messaged you, the ID is " + CurrentChat);  // record which thread the message came from


			

		if (event.type == "message"){              

			api.sendMessage("Hello i am a weatherbot", CurrentChat);
			api.sendMessage("Tell me your location, and i will tell you the weather forecast.", CurrentChat );
			api.listen(WeatherMsg); // listen for more messages on the same thread
				

			function WeatherMsg(err,locationmsg){

				if(locationmsg.threadID == CurrentChat){

					Location = locationmsg.body;

					weather.find({search: Location, degreeType: "C"}, SearchWeather); // get weather

					function SearchWeather(error,result){

						try {

								
							TheWeather = "The Weather in " + Location + " is " + result[1].current.skytext + ", it is " + result[1].current.feelslike + "°C";
				 			console.log(TheWeather);	
				 			api.sendMessage(TheWeather, CurrentChat);
				 			sleep(2000);
				 			api.sendMessage("GoodBye", CurrentChat);
				 			api.sendMessage("Goodbye. To start again press any key.", CurrentChat); // output weather 
				 			api.listen(Listen);		
						}



						catch(err) {

							sleep(2000);
							api.sendMessage("Sorry we can't find the weather for " + Location + ". Please try again." , CurrentChat ); // if weather cant be found, inform the user
							sleep(2000);
						}
					}

				}



			}
		}
			


 			

	}




}












