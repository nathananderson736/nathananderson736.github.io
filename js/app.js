// Core JS file responsible for:
// 1. Conditional loading scripts
// 2. Apply drop-in changes such as adding css classes etc

// Write to HTML, to initiate request for jQuery file from CDN
document.write('<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>');

// If jQuery object is found to not exist/rresult in undefined
// Request local copy as fallback
if(typeof jQuery == 'undefined') {
    document.write('<script src = "js/jquery-1-11-2.js"></script>');
}

// Test user's viewport is less than 768px wide
// Function to initialise mmenu plugin
var init_slide_menu = function() {
    Modernizr.load([{
		test: $(window).width() < 768,
		yep: '../js/jquery-mmenu-min.js', 
		complete: function() {
			$("#main-navigation").mmenu({
				onClick: {
					header: true,
					close: true,
					preventDefault: false,
					setSelected: true
				}
			});
			
		var API = $("#main-navigation").data("mmenu");
		$("#toggle-menu-button").click(function() {
			API.open();
		});
		}
	 }]);
};

// Function to switch out SVG for lower quality PNG when browser lacks support
var img_degrade = function() {
	// Find all img when src contains svg, replace with png extension
	$('img[src*="svg"]').attr('src', function() {
		$('img[src*="svg"]').replace('.svg', '.png');
	});
}

// When DOM has completely loaded
window.onload = function(){
	// Initialise menu plugin if user's viewport is less than 768px 
	if($(window).width() < 768) {
		init_slide_menu();
		// Only reveal menu button if viewport is less than 768px
		// CSS fallback is menu expanded, and menu button hidden
		$('#toggle-menu-button').css("display", "block");
	} 
	
    /* If browser doesn't support SVG Gracefully fall back 
	   on png/desired widely supported image format */
    if(!Modernizr.svg) { img_degrade(); }
};