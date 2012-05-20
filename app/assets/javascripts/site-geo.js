var GeoData = {
    request: false,
    lat: 0,
    lng: 0,
    city: null,
    state: null,

    initialize : function() {
        try {
            GeoData.request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                GeoData.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    GeoData.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    GeoData.request = false;
                }  
            }
        }
    },
    
    reverseGeocode : function()
    {
//        var reverseGeocodeUrl = PROXY_URL + "?url=" + escape("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + GeoData.lat + "," + GeoData.lng + "&sensor=true");
//        GeoData.request.open("GET", reverseGeocodeUrl, true);
//        GeoData.request.onreadystatechange = GeoData.handleReverseGeocode;
//        GeoData.request.send(null);

        GeoData.handleReverseGeocode()
    },
    
    handleReverseGeocode : function()
    {
//        if (GeoData.request.readyState == 4) {
//            if (GeoData.request.status == 200) {
//                var data = GeoData.request.responseText;
//                var geoDict = eval('(' + data + ')')[0];
//                
//            // Process JSON response
//            } else
//                if (DEBUG)
//                    alert("Reverse Geocoder error: " + GeoData.request.status);
//        }
                
        // Temp for demo
        GeoData.city = "New York";
        GeoData.state = "NY";
        
        var location = GeoData.city + ", " + GeoData.state;
        $("#location").val(location);
        
        KnodesData.getLocation();
    },
    
    
    getGeo : function()
    {
        $.geo({
            failToGoogle: false,
            enableHighAccuracy: true
        }).done(function (pos){
            GeoData.lat = pos.lat;
            GeoData.lng = pos.lng;
                
            GeoData.reverseGeocode();
        }).fail(function () {
            alert('Could not determine position');
        });
    }
};
