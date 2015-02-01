$(document).ready(function () {
    $('.enter').click(function () {
        redirect("login.aspx");
    });
});

function redirect(address) {
    document.location.href = address;
}