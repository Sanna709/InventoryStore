$(document).ready(function () {

    if (sessionStorage.getItem("email") === null) {
        location.href = "/login";
    }
    $(".return").click(function () {
        $.ajax({
            type: 'POST',
            url: '/deleteOrder', 
            data: {
                "dId": this.value,
                "id": sessionStorage.getItem("id"),
            },   
            success: function (data) {
                console.log(data)
                if (data === "Fail") {
                    location.href="/default";
                }
                else {
                    location.href = "/myDevice/"+sessionStorage.getItem("id");
                }
            },
        });
    })


});