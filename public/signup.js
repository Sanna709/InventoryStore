$(document).ready(function () {

    $('form').on('submit', function (e) {
      e.preventDefault();
        var item = $('form input');
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: item,
            success: function (data) {
                console.log(data)
            if(data==="Exited")
               {
                   alert("User Already Exited!!");
                   location.reload();
               }
               else if(data==="Fail"){

               }
               else
               {
                alert("New User Created!!");
                location.href="/login";
               }
            },
        });
        return false;
    });
    // function login() {
    //     location.href = "/login";
    // }

});