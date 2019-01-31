$(document).ready(function () {

    if (sessionStorage.getItem("email") === null) {
        location.href = "/login";
    }
    $(".resultBTN").click(function () {
        // alert(this.value)
        if (this.value === "Available") {
            location.href = "/order/" + this.parentElement.id;
        }
        else {
            location.href = "/taken/"+this.parentElement.id
        }
    })


});

function search() {
    var key = document.getElementById("key").value;
    $.ajax({
        type: 'POST',
        url: '/deviceStore',
        data: { "key": key },
        contentType: "application/json",
        dataType: "json",
    });
}

function logout(){
    sessionStorage.clear();
    location.href = "/"
}

function load(){
    location.href = "/myDevice/"+sessionStorage.getItem("id")
}


