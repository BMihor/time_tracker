$(window).load(function () {
    registration();
});

function fill_forms(first_name, last_name, email) {
    document.getElementById('name').value = first_name;
    document.getElementById('surname').value = last_name;
    document.getElementById('email').value = email;
}