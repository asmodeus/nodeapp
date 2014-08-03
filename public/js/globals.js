// // Userlist data array for filling in info box
// var userListData = [];

// DOM Ready =============================================================

$(document).ready(function() {

	var oldHash;
	setInterval(function() {

		if (oldHash !== window.location.hash) {
			console.log("Hash has changed");

		}

		oldHash = window.location.hash;
	}, 20);

	if ( !localStorage.getItem("blogposts") ) {

		var dc = document.cookie;
		dc = dc.substr(dc.indexOf('endpoint')+'endpoint'.length+1);
			// jQuery AJAX call for JSON
		$.getJSON( "/"+dc , function( data ) {

			// For each item in our JSON, add a table row and cells to the content string
			$.each(data, function(){
				console.log(data);
			});

			localStorage.setItem("blogposts", data);

		});
		
	}


});


// // Functions =============================================================
function pollHref () {

}

