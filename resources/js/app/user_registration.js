$(window).load(function () {
    $('.admin_login').hide();
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        if (result == true){
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
                            PageMethods.check_is_user(response.id, onSucess, onError);
                            function onSucess(result) {
                                if (result == true) {
                                    
                                    PageMethods.session_status_connection(response.id, true, onSucess, onError);
                                    function onSucess(result) {
                                        if (result == true) {
                                            redirect("tracker.aspx");
                                        }
                                        else {
                                            redirect("index.aspx");
                                        }
                                    }
                                    function onError(result) { alert("System Error"); }
                                }
                                else {
                                    $('.user_login').show();
                                    registration();
                                }
                            }
                            function onError(result) { alert("System Error"); }
                        });
                    }
                    else {
                        registration();
                    }
                });
            }
        }
        else
        { 
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }   
});


function fill_forms(first_name, last_name, email) {
    document.getElementById('name').value = first_name;
    document.getElementById('surname').value = last_name;
    document.getElementById('email').value = email;
}

function user_registration() {
    spinner = loaderAnimationON('loading');
    check_IP_reg();
}

function check_IP_reg()
{
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.api('/me', function (response) {
                        var user_check = check_user(response.id);
                    });
                }
                else {
                    FB.login(function (response) {
                        if (response.authResponse) {
                            FB.api('/me', function (response) {
                                var user_check = check_user(response.id);
                            });
                        }
                    });
                }
            });
        }
        else {
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }
}

function redirect(address) {
    document.location.href = address;
}

function check_user(_user_id_) {
    PageMethods.check_is_user(_user_id_, onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            spinner.stop();
            PageMethods.session_connection(_user_id_, true, onSucess, onError);
            function onSucess(result) { redirect("tracker.aspx"); }
            function onError(result) { alert("System Error"); }
        }
        else {
            var _name_ = document.getElementById("name").value;
            var _surname_ = document.getElementById("surname").value;
            var _email_ = document.getElementById("email").value;
            var _email = false;
            var r = /^\w+@\w+\.\w{2,4}$/i;
            if (!r.test(_email_)) {
                _email = false;
            }
            else {
                _email = true;
            }
            user_valid();
            if (_name_ != "" && _surname_ != "" && _email == true) {
                FB.api('/me', function (response) {
                    SentToServer(response.id, _name_, _surname_, _email_, "registration");
                });
            }
            spinner.stop();
        }
    }
    function onError(result) {
        alert("System Error");
    }
}

function SentToServer(id, first_name, last_name, email, type) {
    var _id_ = id;
    var _first_name_ = first_name;
    var _last_name_ = last_name;
    var _email_ = email;
    var _type_ = type;
    PageMethods.initialization(_id_, _first_name_, _last_name_, _email_, _type_, onSucess, onError);
    function onSucess(result) {
        if (result == true) {
 redirect("tracker.aspx");
        }
        else {
            redirect("registration.aspx");
        }
    }
    function onError(result) {
        alert("System Error");
    }
}

function mail() {
    var mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.test(email.value))
        document.getElementById("valide").style.display = "none";
    var n = /^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$/;
    if (n.test(document.getElementById("name").value))
        document.getElementById("validn").style.display = "none";
    var s = /^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$/;
    if (s.test(document.getElementById("surname").value))
        document.getElementById("valids").style.display = "none";


}
function user_valid() {
    var mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.test(email.value) == false)
        document.getElementById("valide").style.display = "block";
    else
        document.getElementById("valide").style.display = "none";
    var n = /^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$/;
    if (n.test(document.getElementById("name").value) == false)
        document.getElementById("validn").style.display = "block";
    else
        document.getElementById("validn").style.display = "none";
    var s = /^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$/;
    if (s.test(document.getElementById("surname").value) == false)
        document.getElementById("valids").style.display = "block";
    else
        document.getElementById("valids").style.display = "none";
}
