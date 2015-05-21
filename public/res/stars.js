window.onload = function () {

	var STARS = [],
		WIDTH = 800,
		HEIGHT = 600,
		BACKGROUND = "#000000";

	var canvas = document.getElementById("canvas");	
	canvas.setAttribute("width", WIDTH);
	canvas.setAttribute("height", HEIGHT);
	var context = canvas.getContext("2d");

	function Star () 
	{
		var SQUARE = fixFloat((Math.random()*4)-2);
		return {		
			color : "#aaaaaa",
			x : (WIDTH/2)-SQUARE/2,
			y : (HEIGHT/2)-SQUARE/2,
			start_size : SQUARE,
			w : SQUARE,
			h : SQUARE,
			delta_x : fixFloat((Math.random()*4)-2),
			delta_y : fixFloat((Math.random()*4)-2),
			style : "fillStyle",
			shape : "fillRect",
			blur : 9
		};
	}

	function fill(color){
		context.fillStyle = color;
		context.fillRect(0, 0, WIDTH, HEIGHT);
	}
	
	function drawStars(){
		for (var i = 0; i < arguments.length; i++) {
			var o = arguments[i];
			context[o.style] = o.color;
			context[o.shape](o.x, o.y, o.w, o.h);
			context.shadowBlur=o.blur;
			context[o.shape](o.x-o.delta_x, o.y-o.delta_y, o.w, o.h);
		}
	}

	function updateStars(){
		for (var i = 0; i < arguments.length; i++) {
			var o = arguments[i];
			if ( (o.x|0) > -20 && (o.y|0) > -20 && ((o.x|0) < WIDTH && (o.y|0) < HEIGHT) ) {

				o.x-=o.delta_x||4;
				o.y-=o.delta_y||4;
				o.w+=0.002;
				o.h+=0.002;
				o.color = luminance(o.color, 2);

				if (abs(o.delta_x) < 0.3 || abs(o.delta_y) < 0.3) {
					o.color = "grey";
				}

			}
			else {
				// console.log("hop!");
				o.x = WIDTH/2;
				o.y = HEIGHT/2;
				o.h = o.w = o.start_size;
				o.delta_x = fixFloat((Math.random()*4)-2);
				o.delta_y = fixFloat((Math.random()*4)-2);
			}
		}
	}

	function fixFloat(float, decimals){
		decimals = decimals||1;
		return parseFloat(float.toFixed(decimals));
	}

	function luminance(hex, lum) {
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}	

	// init with timeout...
	function initStars (num, timeout){
		// if (STARS.length <= num) {

		for (var i = 0; i < num; i++) {
			setTimeout(function(){

				STARS.push(Star());

			}, timeout*i)		
		}
		
	}	
	
	function abs (v) {
		return (v > 0) ? v : -v;
	}

	/* main */
	if (1)
	{
		initStars(255, 40);
		setInterval(function () {
			fill(BACKGROUND);
			updateStars.apply(null, STARS);
			drawStars.apply(null, STARS);

		},30);
	}



};

// dev reload page script
// setInterval(function () {
// 	window.location.reload();
// },30000);


