var DEBUG = false;

var DOMAIN = "localhost";
var SITE_URL = "http://" + DOMAIN + "/~manderson/yourq";

var PROXY_URL = SITE_URL + "/proxy.php";

var KNODES_USER = "4fb7ef5b8e63966e15000004";
var KNODES_URL = "https://api.knod.es/"
var KNODES_ACCOUNT = "customer_id=4fb7e55a8e6396c715000009&customer_secret=09e7b248685712add0a71142177e3c31bcf824cc167e2266b2fca2c3a7df8db0&user_id=" + KNODES_USER;

function proxy(url) {
    return PROXY_URL + "?url=" + escape(url);
}