$(document).ready(function () {

    $('form').on('submit', function (e) {
      alert(e);
      e.preventDefault();
        var item = $('form input');
        // var todo = { item: item.val() };
        console.log(item);

        $.ajax({
            type: 'POST',
            url: '/signup',
            data: item,
            success: function (data) {
            
            }
        });
        return false;
    });

});