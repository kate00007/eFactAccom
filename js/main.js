

// Flexslider
/*
$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false
	});
});

*/

// Nav
				
$(function () {
	$("#nav").tinyNav();
});
	

// Map
	
$(document).ready(function() {		
	if($('#contact-map').length > 0){
		  var map2;
		  map2 = new GMaps({
			el: '#contact-map',
			lat: -12.043333,
			lng: -77.028333
		  });
		  map2.addMarker({
			lat: -12.042,
			lng: -77.028333,
			title: 'Marker with InfoWindow',
			infoWindow: {
			  content: '<p>#000 Silicon Valley, CA, USA <br> Tel No: 03 456 258 47</p>'
			}
		  });
	 }		
});
		