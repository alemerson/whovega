var KnodesData = {
    request: false,
    users: false,
    location: false,
    tags: false,
    spinner: false,
    target: false,
    
    initialize : function() {
    KnodesData.target = document.getElementById('spinner');
	KnodesData.spinner = new Spinner(opts);

        try {
            KnodesData.request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                KnodesData.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    KnodesData.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    KnodesData.request = false;
                }  
            }
        }
    },
    
    getLocation : function() {
        var location = document.getElementById("location").value;
        if (location.length <= 0) {
            KnodesData.location = false;
            KnodesData.updateUsers();
        }
        else {    
            var knodesLocationSearch = KNODES_URL + "locations/search.json?" + KNODES_ACCOUNT + "&q=" + escape(location);
            KnodesData.request.open("GET", proxy(knodesLocationSearch), true);
            KnodesData.request.onreadystatechange = KnodesData.handleLocation;
            KnodesData.request.send(null);
        }
    },
    
    handleLocation : function() {
        if (KnodesData.request.readyState == 4) {
            if (KnodesData.request.status == 200) {
                var data = KnodesData.request.responseText;
                KnodesData.location = eval('(' + data + ')');
                
                KnodesData.updateUsers();
            // Process JSON response
            } else
            if (DEBUG)
                alert("Knodes Location error: " + KnodesData.request.status);
        }
                
    },
    
    updateTags : function() {
        var tags = document.getElementById("tags").value.replace(/#/g,"");
        if (tags.length <= 0) {
            KnodesData.tags = false;
        }
        else {
            KnodesData.tags = escape(tags);
        }
        
        KnodesData.updateUsers();
    },
    
    updateUsers : function() {
    	
        var userUpdateUrl = false;
        if (KnodesData.location && KnodesData.tags) {
            var userUpdateUrl = KNODES_URL + "locations/" + KnodesData.getLocationId() + "/people.json?" + KNODES_ACCOUNT + "&type=relevance&q=" + KnodesData.tags;
        }
        else if (KnodesData.location) {
            var userUpdateUrl = KNODES_URL + "locations/" + KnodesData.getLocationId() + "/people.json?" + KNODES_ACCOUNT;
        }
        else if (KnodesData.tags) {
            var userUpdateUrl = KNODES_URL + "people/search.json?" + KNODES_ACCOUNT + "&type=relevance&q=" + KnodesData.tags;
        }
        else {
            document.getElementById("facepile").innerHTML = "";
        }
        
        if(userUpdateUrl) {
        	KnodesData.spinner.spin(KnodesData.target);
            KnodesData.request.open("GET", proxy(userUpdateUrl), true);
            KnodesData.request.onreadystatechange = KnodesData.handleUserUpdate;
            KnodesData.request.send(null);
        }
    },
    
    handleUserUpdate : function() {
        if (KnodesData.request.readyState == 4) {
            if (KnodesData.request.status == 200) {
                var data = KnodesData.request.responseText;
                KnodesData.users = eval('(' + data + ')');
                var facepile = document.getElementById("facepile");
                facepile.innerHTML = "";
                
                if (!data || data.length <= 0 || KnodesData.users["total"] == 0)
                {
                	KnodesData.spinner.stop();
                	
                	return;
                }

                for(var i = 0; i < KnodesData.users["results"].length; i++) {
                    var userData = KnodesData.users["results"][i];
                    var photoUrl = userData["photo_url"];
                    for (var j = 0; j < userData["networks"].length; j++) {
                        if (userData["networks"][j]["network"] == "facebook")
                        {
                            photoUrl = "https://graph.facebook.com/" + userData["networks"][j]["network_id"] + "/picture?type=square";
                            break;
                        }
                    }
                    facepile.innerHTML += "<img width=50 height=50 src='" + photoUrl + "' onMouseOver='$(\"#user_name\").text(\"" + userData["name"] + "\");'/>";
                }
                
                if (i > 0 && i < KnodesData.users["total"]) {
                    facepile.innerHTML += " <div id='plusmore'> +" + (parseInt(KnodesData.users["total"]) - i) + " more</div>";
                }
                
                KnodesData.spinner.stop();

            // Process JSON response
            } else
            if (DEBUG)
                alert("Knodes User error: " + KnodesData.request.status);
        }
    },
    
    getLocationId : function() {
        if (KnodesData.location) {
            return KnodesData.location["results"][0]["id"];
        }
        
        return null;
    },
    
    getUsers : function() {
        var users = "";
        for (var i = 0; i < KnodesData.users["results"].length; i++) {
            var userData = KnodesData.users["results"][i];
            var photoUrl = userData["photo_url"];
            for (var j = 0; j < userData["networks"].length; j++) {
                if (userData["networks"][j]["network"] == "facebook")
                {
                    if (i > 0)
                        users += ",";
                    users += userData["networks"][j]["network_id"];
                    break;
                }
            }
        }
    
        return users;
    }
};