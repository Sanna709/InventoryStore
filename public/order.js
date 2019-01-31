$(document).ready(function () {
    if (sessionStorage.getItem("email") === null) {
        location.href = "/login";
    }
    $('form').on('submit', function (e) {
        e.preventDefault();
        var item = document.getElementById("returnDate").value;
        $.ajax({
            type: 'POST',
            url: '/placeOrder/' + document.getElementById("order").value,
            data: {
                "name": sessionStorage.getItem("email"),
                "id": sessionStorage.getItem("id"),
                "date": item
            },   
            success: function (data) {
                console.log(data)
                if (data === "Done") {
                    location.href = "/myDevice/"+sessionStorage.getItem("id");
                }
            },
        });
        return false;
    });
})