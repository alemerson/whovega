var DEBUG = false;
var DOMAIN = "localhost:3000";
//var DOMAIN = "mccreary.no-ip.biz:3000";
var SITE_URL = "http://" + DOMAIN;

var PROXY_URL = SITE_URL + "/proxy";
//pat
//var KNODES_USER = "4fb7ef5b8e63966e15000004";
var KNODES_USER = "4fb7ffe58e6396c11500000f";
var KNODES_URL = "https://api.knod.es/"
var KNODES_ACCOUNT = "customer_id=4fb7e55a8e6396c715000009&customer_secret=09e7b248685712add0a71142177e3c31bcf824cc167e2266b2fca2c3a7df8db0&user_id=" + KNODES_USER;

var FB_APP_ID = "114658731960059";

function proxy(url) {
    return PROXY_URL + "?url=" + escape(url);
}