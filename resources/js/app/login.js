﻿$(document).ready(function () {
    //check_enter();
    $('.enterCP').click(function () {
        $('.user_login').remove();
        enter_CP();
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
    var form = $('<form>')
    .appendTo(admin_login)
    .attr('class', 'form-horizontal contact_form')
    .attr('action', '#')
    .attr('method', 'post')
    .attr('name', 'contact_form')
     .attr('novalidate', 'novalidate');
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
    var button1 = $('<button>')
        .appendTo(p1)
        .attr('type', 'submit')
        .attr('class', 'btn btn-primary')
    .text('Войти');
}