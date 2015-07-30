$('#map-canvas').css('height', ($(window).height() - $('.navbar').height()) + 'px');
$('#map-canvas').css('margin-top', $('.navbar').height() + 'px');

$(document).on('click', '#infobutton', function() {
    $.ajax({
        type: 'GET',
        url:'proxy.php?url=https://maps.googleapis.com/maps/api/place/details/json?placeid=' + $(this).data('info') + '&key=AIzaSyAfUa2-g732LxbljShjVoz16JUKclQCtSc',
        dataType: "json",
        success: function(data){
            console.log(data);
        }, error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
    // $('.modal-body').html(text);
});
