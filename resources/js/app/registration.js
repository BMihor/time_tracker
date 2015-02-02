function function_check_register(id, first_name, last_name, email) {
    var type = "login";
    SentToServer(id, first_name, last_name, email, type);
}

function SentToServer(id, first_name, last_name, email, type) {
    var _id_ = id;
    var _first_name_ = first_name;
    var _last_name_ = last_name;
    var _email_ = email;
    var _type_ = type;
    debugger;
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



function check_user(_user_id_) {
    var id = _user_id_;
    var _first_name_ = document.getElementById('name').value;
    var _last_name_ = document.getElementById('surname').value;
    var _email_ = document.getElementById('email').value;
    PageMethods.check_is_user(id, onSucess, onError);
    function onSucess(result) {
        if (result == true) {
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
                    SentToServer(response.id, _first_name_, _last_name_, _email_, "registration");
                });
            }
        }
    }
    function onError(result) {
        alert("System Error");
    }
}

function check_IP() {
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
    function onError(result) {
        alert("System Error");
    }
}

function user_registration() {
    check_IP();
}

    function redirect(address) {
        document.location.href = address;
    }