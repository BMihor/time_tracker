var spinner;

$(document).ready(function () {
    spinner = loaderAnimationON('loading');
    checkIP();
    $('.enter').click(function () {
        redirect("login.aspx");
    });
});

function redirect(address) {
    document.location.href = address;
}