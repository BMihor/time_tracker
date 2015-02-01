function checkIP()
{
    PageMethods.check_ip(onSucess, onError);
    function onSucess(result) {
        spinner.stop();
        if (result == true) {
            alert("Доступ разрешен");
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