﻿function makeDate(str)
{
var regexp = /\d{1,4}/g;
var matches = str.match(regexp);

var date= new Date();

date.setDate(parseInt(matches[0]));
date.setMonth(parseInt(matches[1])-1);
date.setFullYear(parseInt(matches[2]));
date.setHours(parseInt(matches[3]));
date.setMinutes(parseInt(matches[4]));
date.setSeconds(0);
date.setMilliseconds(0);

return date;
}
function secondBetween(timeBetween, timeStop)//(timeStart, timeStop)
{
    if(timeStop=="0.00.0 0:00" || timeStop=="")return 0;
    var second_between;
    second_between=parseInt(timeBetween)*3600;
    if(second_between/3600>9)second_between+=parseInt(timeBetween.substr(3))*60;//////////////////
    else second_between+=parseInt(timeBetween.substr(2))*60;

    return second_between;
}
function  isToday(date)
{
        var now = new Date();
        var date_year,date_month,date_date;
        var index;
        date_date= parseInt(date);
        if(date_date>9)index=3;
        else index=2;
        date_month=parseInt(date.substr(index));
		index+=3;
        date_year=parseInt(date.substr(index));
        if(now.getFullYear()== date_year && now.getMonth()== date_month-1 && now.getDate()== date_date) return true;
        else return false;
}
function returnTimeToday()
{
    var table = document.getElementById("example");
    var time = 0;
    for (i = 1; i < table.rows.length; i++) {
        if (isToday(table.rows[i].cells[0].innerHTML))time += secondBetween(table.rows[i].cells[3].innerHTML,table.rows[i].cells[1].innerHTML);
        else if(table.rows[i].cells[1].innerHTML=="0.00.0 0:00") i++;
        else break;

    }
    return time;
}
function returnTimeOnTimer()
{
  var timer=document.getElementsByClassName("timer")[0];
    var seconds=parseInt(timer.value)*3600;
    seconds+=parseInt(timer.value.substr(3))*60;
    seconds+=parseInt(timer.value.substr(6));
    return seconds;

}
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
            PageMethods.create_session(_day, _month, _year, _sec, _min, _hour, response.id, onSucess, onError);
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
var year1,month1,day1,hour1,min1,sec1;
var id;
function start(count_curent_time,loaq) {
    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
			id = response.id;
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
            function onSucess(result) { }
            function onError(result) { }
            PageMethods.session_time(day, month, year, sec, min, hour, response.id, onSucess, onError);
            function onSucess(result) {
				
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
	count_curent_time+=returnTimeToday();//отримує дані з таблиці на сайті
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
	disableEditButton();
	addStartTr(day, month, year, sec, min, hour,loaq);
}
function fff(result){
	alert(result[1]);
}
//функция для старта секундомера
function startTIME(count_curent_time) {
	//передаєш змінну, в секундах, наприклад A
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

function remove(element, index, array){
	element.style.display = 'none';
}
//функция для паузы
function pause() {
    activeButton(document.getElementById("stopButton"));
    show = false;
    var now = new Date();
    var year, month, day, hour, min, sec;
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
	enableEditButtons();
	user_session_finish(day, month, year, sec, min, hour);
	addStopTr(day, month, year, sec, min, hour);
    
	PageMethods.checkTimeDelete(id, day, month, year, sec, min, hour, onSucess, onError);
	function onSucess(result) {
	    if (result == true)
	    {
	        $('tr:eq(1)').remove();
	    }
	}
	function onError(result) { }
}
function activeButton(obj) {
    obj.disabled = "disabled";
    if (obj.id == "startButton") {
        document.getElementById("stopButton").disabled = "";
    } else {
        document.getElementById("startButton").disabled = "";
    }
}

function checkButtonStatusAndStop(activeStop) {
    var onError = function () {
        location.reload();
    };

    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
            var onSucess = function (result) {
                if (result == true)
                    activeStop();                   
                else
                    onError();
            }
            PageMethods.start_status(response.id, onSucess, onError);
        });
    });
};

function checkButtonStatusAndStart(actionStart) {
    var onError = function () {
        location.reload();
    };

    FB.getLoginStatus(function (response) {
        FB.api('/me', function (response) {
            var onSucess = function (result) {
                if (result == true)
                    onError();
                else
                    actionStart();
            }
            PageMethods.start_status(response.id, onSucess, onError);
        });
    });
};

function addStartTr(day, month, year, sec, min, hour,loaq){
		var mi = min;
	var mon = min;
	if (min<10){
		mi='0'+min;
	}
	if (month<10){
		mon='0'+month;
	}
if(loaq){
	var tr = document.createElement('tr');

        var td = $('<td>')
            .appendTo(tr)
            .text(day+"."+mon+"."+year+" "+hour+":"+mi)
            .addClass("el");
        var td1 = $('<td>')
            .appendTo(tr)
            .text('')
            .addClass("el");

        var td2 = $('<td>')
			.appendTo(tr)
			.text("button")
			.addClass("reg");

        var td3 = $('<td>')
			.appendTo(tr)
			.attr('class', 'center')
			.text("0:00");
		var td4 = $('<td>')
			.appendTo(tr);
			
		var wall = document.getElementById('wall');
        var first = wall.childNodes[0];
        wall.insertBefore(tr, first);
}
}

function addStopTr(day, month, year, sec, min, hour){
	var m=min;
	if (min<10){
		m='0'+min;
	}
	var wall = document.getElementById('wall');
	var td =  wall.rows[0].cells[1].innerHTML = day+"."+month+"."+year+" "+hour+":"+m;
	var td3 = getInterval();
	wall.rows[0].cells[3].innerHTML = td3;
    var ww = wall.rows;
	
    for(var i=0;i<ww.length;i++){
        ww[i].removeChild(ww[i].cells[4]);
    }
	TABLE.formwork('#example');
}

function isLessMinute(year1,month1,day1,hour1,min1,sec1,year2,month2,day2,hour2,min2,sec2)
{
	date1=new Date(year1,month1,day1,hour1,min1,sec1);
	date2 = new Date (year2,month2,day2,hour2,min2,sec2);
	if((date2-date1)/1000<60)return true;
	else 
		return false;
}
function getInterval(){
	var wall = document.getElementById('wall');
	var _timeStart = new Date(year1,month1-1,day1,hour1,min1,sec1); 
	var now  = new Date();
	var sec = (now - _timeStart)/1000;
	var hour= parseInt(sec / 3600);
	var min= parseInt((sec - (parseInt(sec / 3600) * 3600)) / 60);
	if (min<10)min = "0"+min;
	str = hour+":"+min;
	
	return str;
}