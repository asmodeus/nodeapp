// // Userlist data array for filling in info box
// var userListData = [];

// DOM Ready =============================================================

$(document).ready(function() {
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

// // Fill table with data
// function populateTable(ep) {

//     // Empty content string
//     var tableContent = '';

//     // jQuery AJAX call for JSON
//     $.getJSON( ep, function( data ) {

//         // For each item in our JSON, add a table row and cells to the content string
//         $.each(data, function(){
//         	tableContent = data;
//         });

//         // Inject the whole content string into our existing HTML table
//         $('body').html(tableContent);
//     });
// };