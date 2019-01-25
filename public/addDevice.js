$(document).ready(function () {

    $('form').on('submit', function (e) {
      e.preventDefault();
        var dName=document.getElementById('dName')
        var desc=document.getElementById('desc')
        var file=document.getElementById('file')
        console.log(dName.value)
        console.log(desc.value)
        console.log(file.value)
        // $.ajax({
        //     type: 'POST',
        //     url: '/addDevice',
        //     data: item,
        //     success: function (data) {
        //         console.log(data)
        //     if(data==="Fail")
        //        {
        //            alert("Some Err Occured......Plz Re-Enter the Information");
        //            location.reload();
        //        }
        //        else
        //        {
        //         alert("New Device added Successfully!!");
        //         location.href="/deviceStore";
        //        }
        //     },
        // });
        return false;
    });

});

