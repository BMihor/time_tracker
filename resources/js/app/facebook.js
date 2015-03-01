var spinner;

function check_logged_user() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1545155435771649',
            cookie: true,  // enable cookies to allow the server to access 
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.1' // use version 2.1
        });
        FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    PageMethods.check_is_user_and_connected(response.id, onSucess, onError);
                    function onSucess(result) {
                        if (result == true) {
                            PageMethods.session_connection(response.id, true, onSucess, onError);
                            function onSucess(result) { redirect("tracker.aspx"); }
                            function onError(result) { alert("System Error"); }
                        }
                        else {
                            initialization_enter_user();
                        }
                    }
                    function onError(result) { alert("System Error"); }
                });
            }
            else {
                initialization_enter_user();
            }
        });
    }
}
function enter_facebook() {
    spinner = loaderAnimationON('loading');
    check_IP_fb();
}
function SentToServer(id, type) {
    var _id_ = id;
    var _type_ = type;
    PageMethods.initialization(_id_, _type_, onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            PageMethods.session_connection(_id_, true, onSucess, onError);
            function onSucess(result) { redirect("tracker.aspx"); }
            function onError(result) { alert("System Error"); }
        }
        else {
            redirect("registration.aspx");
        }
    }
    function onError(result) {
        alert("System Error");
    }
}

function function_check_register(id, type) {
    SentToServer(id, type);
}

function FB_login() {
    FB.login(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                function_check_register(response.id, "login");
            });
        }
        else {
            window.location.reload();
        }
    }, { scope: 'public_profile, email' });
}

function check_logged_user_before_reg() {
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                PageMethods.check_is_user_and_connected(response.id, onSucess, onError);
                function onSucess(result) {
                    if (result == true) {
                        PageMethods.session_connection(response.id, true, onSucess, onError);
                        function onSucess(result) { redirect("tracker.aspx"); }
                        function onError(result) { alert("System Error"); }
                    }
                    else {
                        FB_login();
                    }
                }
                function onError(result) { alert("System Error"); }
            });
        }
        else {
            FB_login();
        }
    });
}

function check_IP_fb() {
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            check_logged_user_before_reg();
            spinner.stop();
        }
        else {
            spinner.stop();
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }
}

function facebook_enter() {
    spinner = loaderAnimationON('loading');
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1545155435771649',
                    cookie: true,  // enable cookies to allow the server to access 
                    // the session
                    xfbml: true,  // parse social plugins on this page
                    version: 'v2.1' // use version 2.1
                });
                FB.getLoginStatus(function (response) {
                    if (response.authResponse) {
                        FB.api('/me', function (response) {
                            PageMethods.check_is_user_and_connected(response.id, onSucess, onError);
                            function onSucess(result) {
                                if (result == true) {
                                    PageMethods.session_connection(response.id, true, onSucess, onError);
                                    function onSucess(result) { redirect("tracker.aspx"); }
                                    function onError(result) { alert("System Error"); }
                                }
                                else {
                                    FB_login();
                                }
                            }
                            function onError(result) { alert("System Error"); }
                        });
                    }
                    else {
                        FB_login();
                    }
                });
            }
            spinner.stop();
        }
        else {
            spinner.stop();
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }
}

function registration() {
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
            }, { scope: 'public_profile, email' });
        }
    });
}