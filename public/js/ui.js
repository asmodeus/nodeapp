(function(){

	var loc = window.location.pathname.split('/');

	loc = loc[loc.length-1];

	$('.navbar .nav li').each(function(index){

		if (loc === $(this).children().html().toLowerCase()) {
			$(this).toggleClass('active')
		}
		
	});

})();
