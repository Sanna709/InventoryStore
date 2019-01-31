$(document).ready(function () {

    if (sessionStorage.getItem("email") !== null) {
        location.href = "/deviceStore";
    }

    $('form').on('submit', function (e) {
        e.preventDefault();
        var item = $('form input');
        $.ajax({
            type: 'POST',
            url: '/login',
            data: item,
            success: function (data) {
                // console.log("Returning" + data)
                if (data === "Fail"||data === "No User") {
                    alert("Either Email or password is wrong!!");
                    location.reload();
                }
                else {
                    sessionStorage.setItem("email",document.getElementById('email').value );
                    sessionStorage.setItem("id",data );
                    location.href = "/deviceStore";
                }
            },
        });
        return false;
    });
});
function signup() {
    location.href = "/signup";
}