var dbg;
// onload
$(function() {
	
	var debug = document.createElement("div");
	$(debug).css({
		"width" : "400px",
		"height" : "600px",
		"background" : "black",
	    "top": "55px",
	    "position" : "fixed"
	});

	debug.setAttribute("id", "debug");
	window.document.body.appendChild(debug);

	function writeDebugger (text) {
		var parag = document.createElement("p");
		parag.style.color = "green";
		parag.style.padding = "10px 10px 10px 10px";
		parag.innerHTML = text;
		debug.appendChild(parag);
	}
	
	dbg = writeDebugger;

});
