$(document).ready(function () {
    var _curent_ = 0;
    //функция для очистки поля
    readout = '00:00:00';
    document.TestForm.stopwatch.value = readout;
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
            if (response.authResponse) 
            {
                FB.api('/me', function (response) {
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
                                PageMethods.session_time(day, month, year, sec, min, hour,response.id, onSucess, onError);
                                function onSucess(result) {
                                    start(result);
                                    PageMethods.save_session_time(result, response.id, onSucess, onError);
                                    function onSucess(result) { }
                                    function onError(result) { }
                                }
                                function onError(result) {

                                }                               
                            }
                            else {
                                activeButton(document.getElementById("stopButton"));
                            }
                        }
                        function onError(result) {

                        }                              
                });
            }
        });
    }
});

function logout()
{
    FB.logout(function (response) {
        redirect("index.aspx");
    });
}

function redirect(address) {
    document.location.href = address;
}