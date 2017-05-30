// setup

var myPet = {
	age: 0,
	name: "",
	boredom: 0,
	sleepiness: 0,
	hunger: 0,
};



// name pet

var nameSubmit = document.getElementById("name-submit");
nameSubmit.addEventListener("click",function(){
	var name = document.getElementById("name-input").value;
	myPet.name = name;
	var p = document.getElementById("name-area");
	p.innerHTML = "Name: " + name;
});



// body lighting

var body = document.getElementsByTagName("body")[0];
var changeLighting = function() {
	if (
		body.classList.contains("lights-off")) {
		body.classList.remove("lights-off");
		this.textContent = "Turn off the lights!";
	} else {
		body.classList.add("lights-off");
		this.textContent = "Turn on the lights!";
	};
};

document.getElementById("lights-button").addEventListener("click",changeLighting);



// parameter handlers

var resetParameters = function(parameter) {
	myPet[parameter] = 0;
	document.getElementById(parameter).textContent = myPet[parameter];
};



// reset on pageload

resetParameters("sleepiness");
resetParameters("age");
resetParameters("boredom");
resetParameters("hunger");

document.getElementById("feed-button").addEventListener("click",function(){resetParameters("hunger")});
document.getElementById("pet-button").addEventListener("click",function(){resetParameters("boredom")});



// tickers

var hungerTicker = setInterval(function(){
		myPet.hunger++;
		document.getElementById("hunger").textContent = myPet.hunger;
		checkForGameOver();
	},3000);

var ageTicker = setInterval(function(){
		myPet.age++;
		document.getElementById("age").textContent = myPet.age;
		checkForGameOver();
	},10000);

var sleepinessTicker = setInterval(function(){
		myPet.sleepiness++;
		document.getElementById("sleepiness").textContent = myPet.sleepiness;
		checkForGameOver();
	},3000);

var boredomTicker = setInterval(function(){
		myPet.boredom++;
		document.getElementById("boredom").textContent = myPet.boredom;
		checkForGameOver();
	},3000);



// clear intervals and display game over

var checkForGameOver = function(){
	if (myPet.boredom === 10 || myPet.hunger === 10 || myPet.sleepiness === 10) {
		gameOver();
	};
};

var gameOver = function() {
	clearInterval(hungerTicker);
	clearInterval(boredomTicker);
	clearInterval(sleepinessTicker);
	clearInterval(ageTicker);
	document.getElementById("game-over-message").style.display = "block";
}






































