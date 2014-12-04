// // Userlist data array for filling in info box
// var userListData = [];

// DOM Ready =============================================================

// var oldHash;
// setInterval(function() {

// 	if (oldHash !== window.location.hash) {
// 		console.log("Hash has changed");

// 	}

// 	oldHash = window.location.hash;
// }, 20);

$(document).ready(function() {
	var lastLi;
	$('li').bind('click', function(evn){
		$(lastLi).removeClass('active disabled');
		$(evn.currentTarget).toggleClass('active disabled');
		lastLi = evn.currentTarget;
		// $(evn.currentTarget).animate({ "left": "+=50px" }, "slow" );
	});


});



// // Functions =============================================================
function pollHref () {

}

