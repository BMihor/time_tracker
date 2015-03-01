function onSucess_check_teacher_connection_status(result) {
    if (result == true) {
        PageMethods.get_user_name(onSucess_get_user_name, onError);
        PageMethods.get_year(onSucess_get_year, onError);
    }
    else {
        redirect("login.aspx");
    }
}

var status_user_check = false;
var status_month_check = false;
var status_year_check = false;
var user_id = 0;
var month_number = 0;
var year_number = 0;
var count_hour_week = 0;
var count_min_week = 0;
var count_hour_month = 0;
var count_min_month = 0;
var arr_befor = new Array(3);
var arr_after = new Array(3);
var arr_hour = new Array();

function onSucess_get_user_name(result) {
    generation_user(result);
}
function onError(result) { alert("System Error"); }

function onSucess_get_year(result) {
    generation_year(result);
}

$(document).ready(function () {
    $('.properties-page').hide();
    $('.officeConfiguration').hide();
    PageMethods.check_teacher_connection_status(onSucess_check_teacher_connection_status, onError);
});

function generation_user(arr) {
    var possition = arr.length / 3;
    for (var i = 0; i < possition; i++) {
        var currentPosition = $('#name_user');
        var tr = $('<tr>')
        .appendTo(currentPosition);
        var td = $('<td>')
        .appendTo(tr)
        .attr("onclick", "user_check(" + arr[i] + ", this)");
        var a = $('<a/>')
        .text(arr[possition + i] + " " + arr[possition * 2 + i])
        .appendTo(td);
    }
}

function generation_year(arr) {
    for (var i = 0; i < arr.length; i++) {
        var currentPosition = $('#year_name');
        var tr = $('<tr>')
        .appendTo(currentPosition);
        var td = $('<td>')
        .appendTo(tr)
        .attr("onclick", "year_check(" + arr[i] + ", this)");
        var a = $('<a/>')
        .text(arr[i])
        .appendTo(td);
    }
}

function onSucess_get_user_information(result) { generation_table(result); }


function generation_choose(month, year, count_hour, count_min) {
    var _month_ = month;
    if (_month_ == undefined) {
        _month_ = "...";
        count_hour = "... ";
        count_min = " ...";
    }

    if (year == 0) {
        year = "...";
    }
    $('.choose').remove();
    var currentPosition = $('#head');
    var span5 = $('<span>')
        .attr("class", "choose")
.appendTo(currentPosition)
         .text("Выбранный месяц: " + _month_ + ", " + year + ", всего за месяц: ");
    if (_count_work_month_ <= count_hour * 3600 + count_min * 60) {
        var span6 = $('<span>')
            .attr("class", "choose")
    .appendTo(currentPosition)
             .text(count_hour + ":" + count_min + "");
    }
    else {
        var span6 = $('<span>')
    .appendTo(currentPosition)
            .attr("class", "choose _time_false_month")
             .text(count_hour + ":" + count_min + "");
    }

}


function user_check(id, obj) {
    $('td').removeClass("pressed");
    $(obj).addClass("pressed");
    status_user_check = true;
    user_id = id;

    if (status_user_check == true && status_month_check == true && status_year_check == true) {
        PageMethods.get_user_information(user_id, month_number, year_number, onSucess_get_user_information, onError);
    }
}

function year_check(year, obj) {
    $('td').removeClass("pressed_3");
    $(obj).addClass("pressed_3");
    status_year_check = true;
    year_number = year;
    generation_choose(arr_month[month_number - 1], year_number, count_hour_month, count_min_month);
    if (status_user_check == true && status_month_check == true && status_year_check == true) {
        PageMethods.get_user_information(user_id, month_number, year_number, onSucess_get_user_information, onError);
    }
}

var arr_month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь",
"Октябрь", "Ноябрь", "Декабрь"]

var arr_week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

function month_check(number, obj) {
    $('td').removeClass("pressed_2");
    $(obj).addClass("pressed_2");
    status_month_check = true;
    month_number = number;
    generation_choose(arr_month[month_number - 1], year_number, count_hour_month, count_min_month);
    if (status_user_check == true && status_month_check == true && status_year_check == true) {
        PageMethods.get_user_information(user_id, month_number, year_number, onSucess_get_user_information, onError);
    }
}

function count_hour_work(sec) {
    var count_hour = new Array();
    count_hour[0] = parseInt(sec / 3600);
    count_hour[1] = parseInt((sec - (parseInt(sec / 3600) * 3600)) / 60);
    return count_hour;
}

var _count_work_week_ = 0;
var _count_work_day_ = 0;
var _count_work_month_ = 0;



var arr_final_work = new Array();

function onSucess_check_work(result) {
    _count_work_week_ = result[1];
    _count_work_day_ = result[0];
    _count_work_month_ = result[2];
    $('.student_table').remove();
    var j = 0;
    for (var i = 0; i < arr_final_work.length / 2; i += 5) {
        var currentPosition = $('#center-block');
        var table = $('<table>')
            .appendTo(currentPosition)
            .attr('border', '0')
        .attr('class', 'table-striped table-bordered example weeks student_table')
        var thead = $('<thead>')
            .appendTo(table);
        var tr = $('<tr>')
            .appendTo(thead);
        var th = $('<th>')
            .text('Дата')
                .appendTo(tr);
        var th1 = $('<th>')
            .text('День недели')
        .appendTo(tr);
        var th2 = $('<th>')
             .text('Количество часов работы')
.appendTo(tr);
        var tbody = $('<tbody>')
    .attr('class', 'wall student_table')
        .appendTo(table);

        for (var k = 0; k < 5; k++) {
            arr_hour = count_hour_work(arr_final_work[arr_final_work.length / 2 + j]);
            var tr1 = $('<tr>')
              .appendTo(tbody);
                var td = $('<td>')
                      .text(arr_final_work[j])
                    .appendTo(tr1);

                    var td1 = $('<td>')
                        .text(arr_week[k])
                .appendTo(tr1);
                    if (_count_work_day_ <= arr_hour[0] * 3600 + arr_hour[1] * 60) {
                        var td2 = $('<td>')
            .text(arr_hour[0] + ":" + arr_hour[1])
            .appendTo(tr1);
                    }
                    else {
                        var td2 = $('<td>')
.text(arr_hour[0] + ":" + arr_hour[1])
.attr("class", "_time_false")
.appendTo(tr1);
                    }
            j++;
            count_hour_week += arr_hour[0];
            count_min_week += arr_hour[1];
        }

        if (_count_work_week_ <= count_hour_week * 3600 + count_min_week * 60) {
            var tr2 = $('<tr>')
    .appendTo(tbody);
            var td3 = $('<td>')
                      .text("Всього за неделю:")
                .attr("colspan", "2")
                    .appendTo(tr2);
            var td4 = $('<td>')
                .text(count_hour_week + ":" + count_min_week)
        .appendTo(tr2);
        }
        else {
            var tr2 = $('<tr>')
            .appendTo(tbody);
            var td3 = $('<td>')
                      .text("Всього за неделю:")
                .attr("colspan", "2")
                    .appendTo(tr2);
            var td4 = $('<td>')
                        .attr("class", "_time_false")
                .text(count_hour_week + ":" + count_min_week)
        .appendTo(tr2);
        }
        count_hour_month += count_hour_week;
        count_min_month += count_min_week;
    }


    generation_choose(arr_month[month_number - 1], year_number, count_hour_month, count_min_month);
    count_hour_month = 0;
    count_min_month = 0;
    count_hour_week = 0;
    count_min_week = 0;

}

function generation_table(arr) {
    arr_final_work = arr;
    PageMethods.check_work(onSucess_check_work, onError);
}

function logout() {
    redirect("login.aspx");
}

function teacherPageShow() {
    $('.teacher-page').show();
    $('.properties-page').hide();
    $('.officeConfiguration').hide();
}

function onSucess_properties(result) {
    table_properties(result);
}

function propertiesShow() {
    $('.properties-page').show();
    $('.teacher-page').hide();
    $('.officeConfiguration').hide();
    PageMethods.generation_table_properties(onSucess_properties, onError);
}

var TABLE = {};
TABLE.formwork = function (table) {
    var $tables = $(table);

    $tables.each(function () {
        var _table = $(this);
        _table.find('tbody tr').append($('<td class="edit"><input type="button" value="EDIT"/></td>'));

    });
    $tables.find('.edit :button').on('click', function (e) {
        TABLE.editable(this);
        e.preventDefault();

    });
}

function onSucess_update_properties(result) {
}

function checkValue(input) {
    var value = input.value;
    var rep = /[-`;)",+_?(|}{:'a-zA-Zа-яА-Я!@#$%^&><*\\\/]/;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        input.value = value;
    }
}

TABLE.editable = function (button) {
    var i = 0;
    var $button = $(button);
    var $row = $button.parents('tbody tr');
    var $cells = $row.children('td').not('.edit');
    if ($row.data('flag')) {
        $cells.each(function () {
            var _cell = $(this);
            arr_after[i] = _cell.find('input').val();
            i++;
            _cell.html(_cell.find('input').val());
        });
        $row.data('flag', false);
        $button.val('EDIT');
        PageMethods.update_table_properties(arr_befor, arr_after, onSucess_update_properties, onError);
    }
    else {
        $cells.each(function () {
            var _cell = $(this);
            var date, date1, day, month, year, hour, min;
            _cell.data('text', _cell.html()).html('');
            arr_befor[i] = _cell.data('text');
            i++;

            var $input = $('<input type="text" onkeyup="return checkValue(this);" />')
            .val(_cell.data('text'))
              .width("100");
            _cell.append($input);
        });

        $row.data('flag', true);
        $button.val('SAVE');
    }
}

function table_properties(arr) {

    $('#tr_properties').remove();
    var currentPosition = $('#wall_properties');
    var tr = $('<tr>')
        .attr("id", "tr_properties")
        .appendTo(currentPosition);

    for (var i = 0; i < arr.length; i++) {
        var td = $('<td>')
        .appendTo(tr)
            
        .text(parseInt(arr[i] / 3600));
    }
    TABLE.formwork('#example');
}

function onSucess_get_ip_user(result)
{
    var currentPosition = $('#current_ip');
    currentPosition.val(result);
    
}

function officeConfigurationShow() {
    PageMethods.get_ip_user(onSucess_get_ip_user, onError);

    current_ip
    PageMethods.check_ip_office(onSucess_check_ip_oficce, onError);

    $('.officeConfiguration').show();
    $('.teacher-page').hide();
    $('.properties-page').hide();
}

var TABLE_Add_oficce = {};
TABLE_Add_oficce.formwork = function (table) {
    var $tables = $(table);

    $tables.each(function () {
        var _table = $(this);
        _table.find('tbody tr').append($('<td class="ed"><input type="button" value="Edit"/></td>'));

    });
    $tables.find('.ed :button').on('click', function (e) {
        TABLE_Add_oficce.editable(this);
        e.preventDefault();

    });
}

var arr_befor_ip = new Array(2);
var arr_after_ip = new Array(2);

TABLE_Add_oficce.editable = function (button) {
    var i = 0;
    var $button = $(button);
    var $row = $button.parents('tbody tr');
    var $cells = $row.children('td').not('.ed');
    if ($row.data('flag')) {
        $cells.each(function () {
            var _cell = $(this);
            arr_after_ip[i] = _cell.find('input').val();
            i++;
            _cell.html(_cell.find('input').val());            
        });
        PageMethods.update_table_ip(arr_befor_ip, arr_after_ip, onSucess_update_properties, onError);
        $row.data('flag', false);
        $button.val('Edit');
    }
    else {
        $cells.each(function () {
            var _cell = $(this);
            var date, date1, day, month, year, hour, min;
            _cell.data('text', _cell.html()).html('');
            arr_befor_ip[i] = _cell.data('text');
            i++;
            var $input = $('<input type="text" />')
            .val(_cell.data('text'))
              .width("100");
            _cell.append($input);
        });

        $row.data('flag', true);
        $button.val('SAVE');
    }
}

function onSucess_check_ip_oficce(result) {
    $('.tr_office').remove();
    var currentPosition = $('#wall_office');

    for (var i = 0; i < result.length / 2; i++)
    {
        var tr = $('<tr>')
        .attr("class", "tr_office")
        .appendTo(currentPosition);
        var td = $('<td>')
.appendTo(tr)
.text(result[i]);

        var td3 = $('<td>')
.appendTo(tr)
.text(result[result.length / 2 + i]);
    }
    TABLE_Add_oficce.formwork('#example_2');
}

function onSucess_add_ipAddress(result)
{
}

function add_ip()
{
    if (document.getElementById('current_ip').value != "" && document.getElementById('current_name').value != "")
    {
        PageMethods.add_ipAddress(document.getElementById('current_ip').value, document.getElementById('current_name').value, onSucess_add_ipAddress, onError);    
    }
}