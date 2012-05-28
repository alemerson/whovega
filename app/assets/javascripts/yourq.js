

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
     LoginData.initialize();
     
     var keywords = [];
     
     $('#question').focus(function() {
     	KnodesData.getLocation();
     });
      $('#question').blur(function() {
     	
     	var contents = $("#question").val();
     	
     });
     
     $('#question').bind('blur keyup',function() {
     console.log($('#question').html());
     	if ($('#question').val().match(/#+([a-zA-Z]+)( |, |\.)+/g)){
     		//place it in the array    		
     		keywords = $('#question').val().match(/#+([a-zA-Z]+)( |, |\.)+/g);
     		
     		//if the keywords string has changed
     		if (keywords != $("#tags").val() ) {
     		
	     		//place it in the hidden element
	     		$("#tags").val(keywords);
	     		
	     		
	     		//place a call to knodes
	     		KnodesData.updateTags();
     		
			}
     		
     	}
     	
     	//replace with stylable spans - DOES NOT WORK :(
		//$('#results').html($('#question').val().replace(/#+([a-zA-Z]+)( |, |\.)+/g,'<span class="hash">$1</span> '))
		
		
      });
     
     $('#location').typeahead();
     
     $('#location-icon').click(function(){
		GeoData.getGeo();
     });
     
     $('#location').blur(function() {
		//GeoData.getGeo();
		KnodesData.getLocation();
	  });
	  
	  $('.close').click(function() {
	  	$('#location').val(null);
		KnodesData.getLocation();
	  });
	  
	  $('#ask').click(function() {
	  console.log(LoginData.userId);
	  var question = $("#question").val() ;
	  var tags = $("#tags").val();
	  var location = $("#location").val();
	  	

	  var escaped = '{\"question\": {\"question\": \"' + question + '\", \"tags\": \"' + tags + '\", \"location\":\"' + location + '\"} }';
	  
	   console.log(escaped);

	  	
	  	$.ajax({
			  type: 'POST',
			  url: "/users/1/questions.json",
			  data: escaped,
			  success: function(returnData) {
			  	LoginData.messageUsers(returnData["id"]);
			  	console.log(returnData);	
			  },
			  contentType: "application/json"
			});	  	
	  });

});










       