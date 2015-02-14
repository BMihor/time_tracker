var spinner;

$(document).ready(function () {
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
                            PageMethods.check_is_user(response.id, onSucess, onError);
                            function onSucess(result) {
                                if (result == true) {
                                    PageMethods.session_status_connection(response.id, true, onSucess, onError);
                                    function onSucess(result) {
                                        if (result != true) {
                                            redirect("index.aspx");
                                        }
                                        else {
                                            PageMethods.generation_table(response.id, onSucess, onError);
                                            function onSucess(result) {
                                                generation(result);
                                                var _curent_ = 0;
                                                //функция для очистки поля
                                                readout = '00:00:00';
                                                document.TestForm.stopwatch.value = readout;
                                                var currentPosition = $('.user_name');
                                                currentPosition.text(' ' + response.first_name + ' ' + response.last_name + ' ');
                                                PageMethods.start_status(response.id, onSucess, onError);
                                                function onSucess(result) {
                                                    if (result == true) {
                                                        activeButton(document.getElementById("startButton"));
                                                        var now = new Date();
                                                        var year, month, day, hour, min, sec;
                                                        year = now.getFullYear();
                                                        month = now.getMonth() + 1;
                                                        day = now.getDate();
                                                        hour = now.getHours();
                                                        min = now.getMinutes();
                                                        sec = now.getSeconds();
                                                        PageMethods.session_time(day, month, year, sec, min, hour, response.id, onSucess, onError);
                                                        function onSucess(result) {
                                                            start(result);
                                                        }
                                                        function onError(result) { alert("System Error"); }
                                                    }
                                                    else {
                                                        activeButton(document.getElementById("stopButton"));
                                                    }
                                                }
                                                function onError(result) { alert("System Error"); }
                                            }
                                            function onError(result) {
                                                alert("System Error");
                                            }
                                        }
                                    }
                                    function onError(result) { alert("System Error"); }
                                }
                                else {
                                    redirect("index.aspx");
                                }
                            }
                            function onError(result) { alert("System Error"); }
                        });
                    }
                    else {
                        redirect("index.aspx");
                    }
                });
            }
        }
        else {
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }
});

function redirect(address) {
    document.location.href = address;
}

function logout() {
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                PageMethods.session_connection(response.id, false, onSucess, onError);
                function onSucess(result) { redirect("index.aspx"); }
                function onError(result) { alert("System Error"); }
            });
        }
    });
}



function generation(arr) {
    for (var i = 0; i < arr.length; i += 4) {
        var tr = document.createElement('tr');

        var td = $('<td>')
.appendTo(tr)
.text(arr[i]);

        var td1 = $('<td>')
        .appendTo(tr)
        .text(arr[i + 1]);

        var td2 = $('<td>')
        .appendTo(tr)
        .text(arr[i + 3]);

        var td3 = $('<td>')
        .appendTo(tr)
        .attr('class', 'center')
        .text(arr[i + 2]);

        var td4 = $('<td>')
        .appendTo(tr)
         .attr('class', 'center');
        var input = $('<input />')
    .appendTo(td4)
        .attr('type', 'button')
        .attr('value', 'Edit')
        .attr('width', '50');

        var wall = document.getElementById('wall');
        var first = wall.childNodes[0];
        wall.insertBefore(tr, first);
    }
}