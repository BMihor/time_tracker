function user_session_create(day, month, year, sec, min, hour) {
    var _day = day;
    var _month = month;
    var _year = year;
    var _sec = sec;
    var _min = min;
    var _hour = hour;
    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
            var email;
            if (response.email == undefined) {
                email = "NULL";
            }
            else {
                email = response.email;
            }
            PageMethods.create_session(response.id, _day, _month, _year, _sec, _min, _hour, onSucess, onError);
            function onSucess(result) {

            }
            function onError(result) {
            }
        });
    });
}
function user_session_finish(day, month, year, sec, min, hour) {
    var _day = day;
    var _month = month;
    var _year = year;
    var _sec = sec;
    var _min = min;
    var _hour = hour;
    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
            var email;
            if (response.email == undefined) {
                email = "NULL";
            }
            else {
                email = response.email;
            }
            PageMethods.session_finish(response.id, _day, _month, _year, _sec, _min, _hour, onSucess, onError);
            function onSucess(result) {

            }
            function onError(result) {
            }
        });
    });
}

//объявляем переменные
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1, m = 1, tm = 1, s = 0, ts = 0, ms = 0, show = true, init = 0, ii = 0;

function start(count_curent_time) {
    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
            PageMethods.delete_session_time(response.id, onSucess, onError);
            function onSucess(result) { }
            function onError(result) { }
            activeButton(document.getElementById("startButton"));
            var now = new Date();
            var year, month, day, hour, min, sec;
            year = now.getFullYear();
            month = now.getMonth() + 1;
            day = now.getDate();
            hour = now.getHours();
            min = now.getMinutes();
            sec = now.getSeconds();
            PageMethods.create_session(day, month, year, sec, min, hour, response.id, onSucess, onError);
            function onSucess(result) {
            }
            function onError(result) {

            }
            PageMethods.session_time(day, month, year, sec, min, hour, response.id, onSucess, onError);
            function onSucess(result) {
                PageMethods.save_session_time(result, response.id, onSucess, onError);
                function onSucess(result) { }
                function onError(result) { }
            }
            function onError(result) {

            }
        });
    });
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    show = true;
    ii = 0;
    dateObj = new Date();
    startTIME(count_curent_time);
    init = 1;
    var now = new Date();
    var year, month, day, hour, min, sec;
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    user_session_create(day, month, year, sec, min, hour);
}

//функция для старта секундомера
function startTIME(count_curent_time) {//передаєш змінну, в секундах, наприклад A

    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000) + count_curent_time * 1000; //тут буде додаватися секунди до старту таймера
    while (t > 999) { s++; t -= 1000; }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) { ts = ts - ((m - 1) * base); }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) { tm = tm - ((h - 1) * base); }
    }
    ms = Math.round(t / 10);
    if (ms > 99) { ms = 0; }
    if (ms == 0) { ms = '00'; }
    if (ms > 0 && ms <= 9) { ms = '0' + ms; }
    if (ts > 0) { ds = ts; if (ts < 10) { ds = '0' + ts; } } else { ds = '00'; }
    dm = tm - 1;
    if (dm > 0) { if (dm < 10) { dm = '0' + dm; } } else { dm = '00'; }
    dh = h - 1;
    if (dh > 0) { if (dh < 10) { dh = '0' + dh; } } else { dh = '00'; }
    readout = dh + ':' + dm + ':' + ds;// + '.' + ms;
    if (show == true) { document.TestForm.stopwatch.value = readout; }
    clocktimer = setTimeout("startTIME(" + count_curent_time + ")", 1);
}
//функция для паузы
function pause() {
    show = false;
    var now = new Date();
    var year, month, day, hour, min, sec;
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    user_session_finish(day, month, year, sec, min, hour);
}
function activeButton(obj) {
    obj.disabled = "disabled";
    if (obj.id == "startButton") {
        document.getElementById("stopButton").disabled = "";
    } else {
        document.getElementById("startButton").disabled = "";
    }
}