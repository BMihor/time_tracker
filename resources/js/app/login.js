﻿$(document).ready(function () {
    $('.go_to_user_panel').show();
    $('.user_login').hide();
    enter_CP();
    $('.go_to_admin_panel').hide();
    $('.go_to_admin_panel').click(function () {
        $('.user_login').hide();
        $('.go_to_user_panel').show();
        $('.go_to_admin_panel').hide();
        enter_CP();
    });
    $('.go_to_user_panel').click(function () {
        $('.admin_login').remove();
        $('.user_login').show();
        $('.go_to_admin_panel').show();
        $('.go_to_user_panel').hide();
    });
});

function enter_CP() {
    var currentPosition = $('.row_pos');
    var admin_login = $('<div>')
    .appendTo(currentPosition)
    .attr('class', 'well col-md-5 center login-box admin_login');
    var div2 = $('<div>')
    .appendTo(admin_login)
    .attr('class', 'alert alert-info')
    .text('Авторизация');
    var br1 = $('<br />')
    .appendTo(div2);
    var span1 = $('<span>')
    span1.appendTo(div2)
    span1.text('Пожалуйста, войдите под своим именем пользователя и паролем.');
    var form = $('<div>')
    .appendTo(admin_login)
    .attr('class', 'form-horizontal contact_form')
    var ul = $('<ul>')
    .appendTo(form);
    var li1 = $('<li>')
     .appendTo(ul);
    var div3 = $('<div>')
        .appendTo(li1)
        .attr('class', 'input-group input-group-lg');
    var span2 = $('<span>')
        .appendTo(div3)
        .attr('class', 'input-group-addon');
    var i = $('<i>')
        .appendTo(span2)
        .attr('class', 'glyphicon glyphicon-user red');
    var input = $('<input/>')
    .appendTo(div3)
    .attr('type', 'text')
    .attr('class', 'form-control login')
    .attr('id', 'login')
    .attr('placeholder', 'Введите логин:')
       .attr('autocomplete', 'off')
       .attr('onfocus', 'placeholder=\'\';')
       .attr('onblur', 'placeholder=\'Введите логин.\';')
       .attr('required', 'required')
  .attr('title', 'Maximum 16 characters')
  .attr('pattern', '^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$');
    var div4 = $('<div>')
    .appendTo(li1)
    .attr('class', 'clearfix');
    var br2 = $('<br />')
        .appendTo(li1);
    var li2 = $('<li>')
 .appendTo(ul);
    var div5 = $('<div>')
        .appendTo(li2)
        .attr('class', 'input-group input-group-lg');
    var span3 = $('<span>')
        .appendTo(div5)
        .attr('class', 'input-group-addon');
    var i2 = $('<i>')
        .appendTo(span3)
        .attr('class', 'glyphicon glyphicon-user red');
    var input2 = $('<input/>')
    .appendTo(div5)
    .attr('type', 'password')
    .attr('class', 'form-control password')
    .attr('id', 'password')
    .attr('placeholder', 'Введите пароль:')
       .attr('autocomplete', 'off')
       .attr('onfocus', 'placeholder=\'\';')
       .attr('onblur', 'placeholder=\'Введите пароль.\';')
       .attr('required', 'required')
  .attr('title', 'Maximum 16 characters')
  .attr('pattern', '^[a-zA-Zа-яА-ЯіЇ0-9_-]{2,15}$');
    var div6 = $('<div>')
    .appendTo(li2)
    .attr('class', 'clearfix');
    var li3 = $('<li>')
     .appendTo(ul);
    var p1 = $('<p>')
        .appendTo(li3)
        .attr('class', 'center col-md-5');

    var input_t = $('<input/>')
        .appendTo(p1)
        .attr('type', 'submit')
        .attr('class', 'btn btn-primary submit')
        .attr('value', 'Войти')
    .attr('onclick', 'check_teacher();');
}
function onSucess_check_teacher(result) {
    if (result == true) {
        redirect("teacher.aspx");
    }
    else {
        redirect("index.aspx");
    }
}
function onError_check_teacher(result) {
    alert("System Error");
}

function check_teacher() {
    if (document.getElementById('login').value != "" && document.getElementById('password').value != "") {
        PageMethods.check_is_teacher(document.getElementById('login').value, document.getElementById('password').value, onSucess_check_teacher, onError_check_teacher);
    }
}