$(document).ready(function () {
    if (sessionStorage.getItem("email") === null) {
        location.href = "/login";
    }

});