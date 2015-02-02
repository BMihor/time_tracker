var spinner;
$(document).ready(function () {
    $('.error_403_js').remove();
    $('.enter_user').hide();
    spinner = loaderAnimationON('loading');
    checkIP();
    $('.enter').click(function () {       
        redirect("login.aspx");
    });
});
function checkIP() {
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        spinner.stop();
        if (result == true) {
            $('.enter_user').show();
        }
        else {
            redirect("error_403.aspx");
        }
    }
    function onError(result) {
        alert("System Error");
    }
}
function redirect(address) {
    document.location.href = address;
}