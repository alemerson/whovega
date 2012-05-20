var KnodesData = {
    request: false,
    users: false,
    location: false,
    
    initialize : function() {
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
        var knodesLocationSearch = KNODES_URL + "locations/search.json?" + KNODES_ACCOUNT + "&q=" + location;
        KnodesData.request.open("GET", proxy(knodesLocationSearch), true);
        KnodesData.request.onreadystatechange = KnodesData.handleLocation;
        KnodesData.request.send(null);
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
    
    updateUsers : function() {
        var knodesLocationSearch = KNODES_URL + "locations/" + KnodesData.getLocationId() + "/people.json?" + KNODES_ACCOUNT;
        KnodesData.request.open("GET", proxy(knodesLocationSearch), true);
        KnodesData.request.onreadystatechange = KnodesData.handleUserUpdate;
        KnodesData.request.send(null);
    },
    
    handleUserUpdate : function() {
        if (KnodesData.request.readyState == 4) {
            if (KnodesData.request.status == 200) {
                var data = KnodesData.request.responseText;
                KnodesData.users = eval('(' + data + ')');
                
                var facepile = document.getElementById("facepile");
                facepile.innerHTML = "";
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
                    facepile.innerHTML += "<img width=50 height=50 src='" + photoUrl + "'/>";
                }
                
                if (i > 0 && i < KnodesData.users["total"]) {
                    facepile.innerHTML += " +" + (parseInt(KnodesData.users["total"]) - i) + " more";
                }

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
    }
};