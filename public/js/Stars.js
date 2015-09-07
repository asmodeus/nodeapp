window.onload = function () {

	var STARS = [],
		WIDTH = 800,
		HEIGHT = 600,
		BACKGROUND = "#000000",
		COLORS = ["#800080", "#000055", "#000000" ];

	var canvas = document.getElementById("canvas");	
	canvas.setAttribute("width", WIDTH);
	canvas.setAttribute("height", HEIGHT);
	var context = canvas.getContext("2d");

	function Star () 
	{
		var SQUARE = fixFloat((Math.random()*4)-2);
		return {		
			color : "#000088",
			x : (WIDTH/2)-SQUARE/2,
			y : (HEIGHT/2)-SQUARE/2,
			start_size : SQUARE,
			w : SQUARE,
			h : SQUARE,
			delta_x : fixFloat((Math.random()*4)-2),
			delta_y : fixFloat((Math.random()*4)-2),
			style : "fillStyle",
			shape : "fillRect",
			blur : 9,
			lum : 0
		};
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

				o.lum+=0.01
				luminance(o, o.lum);

				o.x-=o.delta_x||3;
				o.y-=o.delta_y||3;
				o.w+=0.002;
				o.h+=0.002;

			}
			else {
				o.lum = 0;
				o.color = "#000033"
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


	function luminance(object, lum) {
		object = object || { color:'#000' };
	    var hex = object.color;
	    lum = lum || 1;
	    
	    hex = String(hex).replace(/[^0-9a-f]/gi, '')
	    if (hex.length < 6)
			hex = [ [hex[0],hex[0]].join(''), [hex[1],hex[1]].join(''), [hex[2],hex[2]].join('') ]
		else 
			hex = [hex.slice(0,2), hex.slice(2,4), hex.slice(4,6)]

	    // using relative luminance
	    // L = 0.2126 R + 0.7152 G + 0.0722 B
	    var rgb = [2.94459*lum, 9.90581*lum, lum];
	    
		hex = hex.map(function(val, idx){
	        var final = Math.min(Math.max(Math.round((parseInt(val, 16)+rgb[idx])), 0), 255).toString(16);
	        return final.length<2 ? '0'+final : final;
	    })

		hex.splice(0, 0, '#')

		object.color = hex.join('');
	}	

	// init with timeout...
	function initStars (num, timeout){
		for (var i = 0; i < num; i++) {
			setTimeout(function(){
				STARS.push(Star());
			}, timeout*i)	
		}
	}	
	
	function abs (v) {
		return (v > 0) ? v : -v;
	}

	function fill(color){
		context.fillStyle = color;
		context.fillRect(0, 0, WIDTH, HEIGHT);
	}	

	/* main */
	initStars(150, 80);
	setInterval(function () {
		fill(BACKGROUND);
		updateStars.apply(null, STARS);
		drawStars.apply(null, STARS);
	},30);



};

