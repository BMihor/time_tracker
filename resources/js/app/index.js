var spinner;

$(document).ready(function () {
    spinner = loaderAnimationON('loading');
    $('.error_403_js').remove();
    $('.enter').click(function () {
        redirect("login.aspx");
    });
    checkIP();
});

function checkIP() {
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        if (result == true) {
            check_logged_user();
            spinner.stop();
        }
        else {
            spinner.stop();
            redirect("error_403.aspx");
        }
    }
    function onError(result) { alert("System Error"); }
}

function initialization_enter_user() {
    var currentPosition = $('body');
    var user_login = $('<div>')
    .appendTo(currentPosition)
    .attr('class', 'content enter_user');

    var container = $('<div>')
    .appendTo(user_login)
    .attr('class', 'ch-container');

    var row = $('<div>')
    .appendTo(container)
    .attr('class', 'row');

    var row_pos = $('<div>')
    .appendTo(row)
    .attr('class', 'row row_pos')
    .attr('id', 'inline_div');

    var well = $('<div>')
    .appendTo(row_pos)
    .attr('class', 'well col-md-5 center login-box user_login');

    var alert = $('<div>')
    .appendTo(well)
    .attr('class', 'alert alert-info')
    .text('Пожалуйста, войдите через социальную сеть.');

    var form = $('<div>')
    .appendTo(well)
    .attr('class', 'form-horizontal contact_form');

    var ul = $('<div>')
    .appendTo(form);

    var li = $('<li>')
    .appendTo(ul);

    var img = $('<img />')
    .appendTo(li)
    .attr('src', 'resources/images/timetracker.png')
    .attr('title', 'timetracker');

    var p = $('<p>')
    .appendTo(li)
    .attr('class', 'center col-md-5');

    var button = $('<button>')
    .appendTo(p)
    .attr('type', 'submit')
    .attr('onclick', 'enter_facebook()')
    .attr('class', 'btn btn-primary')
    .text('Войти через');

    var br = $('<br />')
    .appendTo(button);

    var span = $('<span>')
     .appendTo(button)
    .text('facebook');
}

function redirect(address) {
    document.location.href = address;
}
