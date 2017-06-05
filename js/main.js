// setup

var myPet = {
	age: 0,
	name: "",
	boredom: 0,
	sleepiness: 0,
	hunger: 0,
};

var petImage = $("#pet-image");



// name pet

var nameSubmit = $("#name-submit");
var namingFunction = function(){
	if ($("#name-input").val() != "") {
		var name = $("#name-input").val();
	} else {
		var name = "Lil Red Panda";
	}
	myPet.name = name;
	var p = $("#name-area");
	p.text("Name: " + name);
};

nameSubmit.click(namingFunction);



// body lighting

var body = $("body");
var changeLighting = function() {
	if (
		body.hasClass("lights-off")) {
		body.removeClass("lights-off");
		$(this).text("Turn off the lights!");
	} else {
		body.addClass("lights-off");
		$(this).text("Turn on the lights!");
	};
};

$("#lights-button").click(changeLighting);



// parameter handlers

var resetParameters = function(parameter) {
	myPet[parameter] = 0;
	$("#" + parameter).text(myPet[parameter]);
};



// reset on pageload

resetParameters("sleepiness");
resetParameters("age");
resetParameters("boredom");
resetParameters("hunger");

$("#feed-button").click(function(){resetParameters("hunger")});
$("#pet-button").click(function(){resetParameters("boredom")});



// tickers

var hungerTicker = setInterval(function(){
	myPet.hunger++;
	$("#hunger").text(myPet.hunger);
	checkForGameOver();
},3000);

var ageTicker = setInterval(function(){
	myPet.age++;
	$("#age").text(myPet.age);
	checkForGameOver();
},10000);

var sleepinessTicker = setInterval(function(){
	if (body.hasClass("lights-off")) {
		if (myPet.sleepiness > 0) {
			myPet.sleepiness--;
			$("#sleepiness").text(myPet.sleepiness);
		};
	} else {
		myPet.sleepiness++;
		$("#sleepiness").text(myPet.sleepiness);
		checkForGameOver();
	};
},3000);

var boredomTicker = setInterval(function(){
	if (body.hasClass("lights-off")) {
		myPet.boredom += 2;
		if (myPet.boredom > 10) {
			myPet.boredom = 10;
		};
	} else {
		myPet.boredom += 1;
	};
	$("#boredom").text(myPet.boredom);
	checkForGameOver();
},3000);



// clear intervals and display game over

var checkForGameOver = function(){
	if (myPet.boredom >= 10 || myPet.hunger >= 10 || myPet.sleepiness >= 10) {
		gameOver();
	};
};

var isDead = false

var gameOver = function() {
	clearInterval(hungerTicker);
	clearInterval(boredomTicker);
	clearInterval(sleepinessTicker);
	clearInterval(ageTicker);
	$("#game-over-message").css("display","block");
	petImage.attr("src","img/nap.jpg");
	isDead = true;
	$("#feed-button").hide();
	$("#pet-button").hide();
	if (myPet.boredom >= 10) {
		$("#boredom").addClass("game-over");
	} else if (myPet.hunger >= 10) {
		$("#hunger").addClass("game-over");
	} else if (myPet.sleepiness >= 10) {
		$("#sleepiness").addClass("game-over");
	} else {}
};

$("#reset-button").click(function(){
	location.reload();
});



// randomly bouncing around

var bouncePet = function() {
	$("#pet-image").animate({
		"left": "+=20px",
		"top": "-=10px",
	}, 100, "easeInQuad").animate({
		"left": "+=20px",
		"top": "+=10px",
	}, 100, "easeOutQuad").animate({
		"left": "+=20px",
		"top": "-=10px",
	}, 100, "easeInQuad").animate({
		"left": "+=20px",
		"top": "+=10px",
	}, 100, "easeOutQuad");
};

var bouncePetLeft = function() {
	$("#pet-image").animate({
		"left": "-=20px",
		"top": "-=10px",
	}, 100, "easeInQuad").animate({
		"left": "-=20px",
		"top": "+=10px",
	}, 100, "easeOutQuad").animate({
		"left": "-=20px",
		"top": "-=10px",
	}, 100, "easeInQuad").animate({
		"left": "-=20px",
		"top": "+=10px",
	}, 100, "easeOutQuad");
};

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 1000)) + 1000;
    setTimeout(function() {
    	if ($("#pet-image").isInDiv() === "right") {
    		bouncePetLeft();
	        loop();
		} else if ($("#pet-image").isInDiv() === "left") {
	       	bouncePet();
	        loop();
	    } else {
	    	var rand = Math.floor((Math.random() * 2));
	    	if (rand === 0) {
//	    		if (isDead === false) {
	    			bouncePetLeft();
	        		loop();
//	        	};
	    	} else {
//	    		if (isDead === false) {
	    			bouncePet();
	        		loop();
//	        	};
	    	};
	    };
    }, rand);
}());



// see if pet hits the right edge of the screen

$.fn.isInDiv = function() {
    var f = $('#pet-image');
    var div = $('body');
    var rightEdge = f.width() + f.offset().left;
    var leftEdge = f.offset().left;
    var divRightEdge = div.width() + div.offset().left;
    var divLeftEdge = div.offset().left;
    if (rightEdge > divRightEdge) {
        return "right";
    }
    else if (leftEdge < divLeftEdge) {
        return "left";
    } else {
    	return;
    }
};



// submit name on enter

$('#name-input').keypress(function (e) {
	if (e.which == 13) {
		namingFunction();
		return false;
	}
});



// make random divs appear

function makeDiv(){
    // vary size for fun
    var divRotation = ((Math.random()*80) - 40).toFixed();
    var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    var text = ""

    if (isDead === false) {
		if (Math.floor(Math.random() * 2) === 0) {
			text = "wow!";
		} else {
			text = "cute";
		};
	} else {
		text = ":(";
	}

    $newdiv = $('<div/>').css({
    	"-ms-transform": "rotate("+divRotation+"deg)",
   		"-webkit-transform": "rotate("+divRotation+"deg)",
    	"transform": "rotate("+divRotation+"deg)",
        'color': color
    }).text(text);

    // make position sensitive to size and document's width
    var posx = ((Math.random() * ($("#pet-image").width() - 100)) + $("#pet-image").offset().left).toFixed();
    var posy = ((Math.random() * ($("#pet-image").height() - 100)) + $("#pet-image").offset().top).toFixed();

    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none',
        "font-size":"3rem"
    }).appendTo('body').fadeIn(100).delay(500).fadeOut(400, function(){
      $(this).remove();
      makeDiv(text); 
    }); 
};


// randomly Wow! or Cute

makeDiv();












