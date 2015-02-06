$(window).load(function () {
    registration();
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
            redirect("tracker.aspx");
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