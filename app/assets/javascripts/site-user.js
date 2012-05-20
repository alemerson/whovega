var LoginData = {
    userId: 0,
    accessToken: undefined,
    request: false,
    userData: undefined,
    loginCallbacks: new Array(),
    
    initialize : function() {
        try {
            LoginData.request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                LoginData.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    LoginData.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    LoginData.request = false;
                }  
            }
        }
        
        window.fbAsyncInit = function() {
 
            FB.init({
                appId      : FB_APP_ID, // App ID
                channelUrl : 'http://' + DOMAIN + '/channel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });
            
            FB.getLoginStatus(function(response) {
                   
                if (response.status === 'connected') {
                    alert("Logged in!");
                    
                    LoginData.accessToken = response.authResponse.accessToken;
                    
                    LoginData.userId = response.authResponse.userID;
                } else if (response.status === 'not_authorized') {
                    alert("Not authorized");
                } else {
                   	alert("Log in");
                }
            });

        // Additional initialization code here
        };
        
        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    },

    messageUsers : function(questionid) {
        var users = KnodesData.getUsers();

// Chat post
        FB.ui({
            app_id: FB_APP_ID,
            method: 'send',
          name: "YourQ - Your questions, your friends' answers.",
            link: 'http://yourq.co/',
            to: users,
            description: $("#question").val(), redirect_uri: SITE_URL + "/users/" + LoginData.userId + "/questions/" + questionid
        });

// User wall post
//        FB.api('/17504471/feed', 'post', {
//            message: 'Sup?'//@[17504471:1:Anthony Guidarelli]'// @[17507662:1:Matt Anderson] @[1390410012:1:Andrew Emerson]'
//        }, function(response) {
//            if (!response || response.error) {
//                alert('Error occured: ' + response.error.message);
//            } else {
//                alert('Post ID: ' + response.id);
//            }
//        });

// Tag post
//        FB.ui(
//        {
//            method: 'stream.publish',
//            message: 'Testing @[{17504471}:1:{Anthony}] @[{17507662}:1:{Matt}] @[{1390410012}:1:{Andrew}]',
//            attachment: {
//                name: 'Name here',
//                caption: 'Caption here.',
//                description: (
//                    'Our service'
//                    ),
//                href: 'url here'
//            },
//            user_prompt_message: 'Personal message here'
//        },
//        function(response) {
//            if (response && response.post_id) {
//                alert('Post was published.');
//            } else {
//                alert('Post was not published.');
//            }
//        }
//        );  
    }
};