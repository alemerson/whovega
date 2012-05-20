

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

function displayType(){
      
}

$(document).ready(function() {

     GeoData.initialize();
     KnodesData.initialize();
     
     $('#question').focus(function() {
     	KnodesData.getLocation();
     });
      $('#question').blur(function() {
     	
     	var contents = $("#question").val();
     	
     });
     
     $('#question').bind('blur keyup',function() {
     console.log("keyup");
    	 $('#results')
            .html('<span>'+$('#results')
                .html().replace(/( |, |\. )/g,'</span>$1<span>').replace(/\n/g,'</span><br /><br /><span>')+'</span>')
      });
     
     $('#location').typeahead();
     
     $('#location-icon').click(function(){
		GeoData.getGeo();
     });
     
     
     
     $('#location').blur(function() {
		GeoData.getGeo();
	  });
	  
	  $('.close').click(function() {
	  console.log($('#location').val());
	  	$('#location').val(null);
	  });


});






var target = document.getElementById('spinner');
var spinner = new Spinner(opts).spin(target);



       