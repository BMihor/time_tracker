function enter_facebook()
{
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1545155435771649', // Your App ID
            channelUrl: '//' + window.location.hostname + '/channel', // Path to your Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML.
        });

        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    var email;
                    if (response.email == undefined) {
                        email = "NULL";
                    }
                    else {
                        email = response.email;
                    }
                    function_check_register(response.id, response.first_name, response.last_name, email);
                });
            }
            else {
                window.location.reload();
            }
        });
    };
}
function registration() {
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1545155435771649', // Your App ID
            channelUrl: '//' + window.location.hostname + '/channel', // Path to your Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML.
        });
        FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    fill_forms(response.first_name, response.last_name, response.email);
                });
            }
            else {
                FB.login(function (response) {
                    if (response.authResponse) {
                        FB.api('/me', function (response) {
                            fill_forms(response.first_name, response.last_name, response.email);
                        });
                    }
                });
            }
        });
    };
}