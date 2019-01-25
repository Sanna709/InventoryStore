$(document).ready(function () {

    $('form').on('submit', function (e) {
      e.preventDefault();
        var item = $('form input');
        $.ajax({
            type: 'POST',
            url: '/login',
            data: item,
            success: function (data) {
                console.log("Returning"+data)
            if(data==="Fail")
               {
                   alert("Either Email or password is wrong!!");
                   location.reload();
               }
               else
               {
                location.href="/deviceStore";
               }
            },
        });
        return false;
    });

});