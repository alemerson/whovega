

var opts = {
  lines: 11, // The number of lines to draw
  length: 7, // The length of each line
  width: 4, // The line thickness
  radius: 10, // The radius of the inner circle
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};
$(document).ready(function() {

     GeoData.initialize();
     KnodesData.initialize();
     
     $('#question').focus(function() {
     console.log("clicked question");
     KnodesData.getLocation();
     });
     
     $('#location-icon').click(function(){
     	console.log("clicked location");
		GeoData.getGeo();
     });
     
     $('#location').focus(function() {
		console.log("clicked location");
		GeoData.getGeo();
	  });


});






var target = document.getElementById('spinner');
var spinner = new Spinner(opts).spin(target);



       