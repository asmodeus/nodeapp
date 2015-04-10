
var firstlocation = window.location.pathname.split('/')[1];
$('.navbar .nav li').each(function(index){
	if (firstlocation === $(this).children().html().toLowerCase()) {
		$(this).toggleClass('active')
	}
});

//});

