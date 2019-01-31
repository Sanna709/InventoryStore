$(document).ready(function () {
    if(sessionStorage.getItem("email")===null)
{
    location.href = "/login";
}
    var device = {}
    $('form').on('submit', function (e) {
        e.preventDefault();
        var dName = document.getElementById('dName').value
        var desc = document.getElementById('desc').value
        var photo = document.getElementById("Photo").files[0];
        let formData = new FormData();
        device["dName"] = dName;
        device["desc"] = desc;
        formData.append("photo", photo);
        fetch('/upload', { method: "POST", body: formData })
            .then(res => {
                res.json().then(data => {
                    device["dphoto"]=data.photo
                    submit();
                })
            })
            .catch(err => {
                location.href="/default";
            })
        return false;
    });
    function submit() {
        console.log(device)
        $.ajax({
            type: 'POST',
            url: '/addDevice',
            data:device,
            success: function (data) {
                console.log(data)
                if (data === "Done") {
                    location.href = "/deviceStore";
                }
            },
        });
    };
})


