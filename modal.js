$('#map-canvas').css('height', ($(window).height() - $('.navbar').height()) + 'px');
$('#map-canvas').css('margin-top', $('.navbar').height() + 'px');

$(document).on('click', '#infobutton', function() {

    $('#mapdata .modal-body').html('<h3 class="text-center">Loading. Please wait.</h3>');

    var photo = $(this).data('photo');

    $.ajax({
        type: 'GET',
        url:'proxy.php?id=' + $(this).data('info'),
        dataType: "text",
        success: function(data){
            data = jQuery.parseJSON( data );
            data = data.result;
            var text = '<button type="button" class="close btn btn-lg" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            if (photo == '') {
                text = text + '<h5 class="text-center">No image available</h5>';
            } else {
                text = text + '<p class="text-center"><img style="max-width: 100%; margin: 0 auto" src="' + photo + '"></p>'
            }
            text = text + '<hr><h4 class="text-center">Description</h4>';
            if (data.opening_hours == undefined) {
                text = text + '<hr><h5 class="text-center">Can not retrieve opening hours. Please check the location\'s website.</h5>';
            } else {
                text = text + '<hr><h4 class="text-center">Opening Hours</h4>';
                $.each(data.opening_hours.weekday_text, function(index, value) {
                    text = text + '<h5 class="text-center">' + value + '</h5>';
                });
            }
            text = text + '<hr><h4 class="text-center">Weather</h4>';
            $.ajax({
                type: 'GET',
                url:'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + data.geometry.location.lat + '&lon=' + data.geometry.location.lon + '&cnt=10',
                dataType: "text",
                async: false,
                success: function(weatherdata){
                    var dateCurrent = new Date();
                    var days =
                    [
                        'Today',
                        'Tomorrow',
                        moment().add(2, 'days').format("DD/MM/YYYY"),
                        moment().add(3, 'days').format("DD/MM/YYYY"),
                        moment().add(4, 'days').format("DD/MM/YYYY"),
                        moment().add(5, 'days').format("DD/MM/YYYY"),
                        moment().add(6, 'days').format("DD/MM/YYYY"),
                        moment().add(7, 'days').format("DD/MM/YYYY"),
                        moment().add(8, 'days').format("DD/MM/YYYY"),
                        moment().add(9, 'days').format("DD/MM/YYYY")
                    ];
                    weatherdata = jQuery.parseJSON(weatherdata);
                    $.each(weatherdata.list, function(index,value) {
                        mintemp = parseInt(value.temp.min - 273.15);
                        maxtemp = parseInt(value.temp.max - 273.15);
                        weather = value.weather[0].description;
                        text = text + '<h5 class="text-center">' + days[index] + ': ' + weather.charAt(0).toUpperCase() + weather.slice(1) + ' Min: ' + mintemp + "&deg;C Max: " + maxtemp + '&deg;C</h5>';
                    })
                }
            });
            text = text + '<hr><h4 class="text-center">Phone number</h4>';
            if (data.formatted_phone_number != undefined) {
                text = text + '<h5 class="text-center">' + data.formatted_phone_number + '</h5>'
            }
            if (data.international_phone_number != undefined) {
                text = text + '<h5 class="text-center">' + data.international_phone_number + '</h5>'
            }
            if (data.international_phone_number == undefined && data.formatted_phone_number != undefined) {
                text = text + '<h5 class="text-center">No phone number available. Please check the locations website.</h5>'
            }
            text = text + '<hr><h4 class="text-center">Address</h4>';
            if (data.formatted_address != undefined) {
                text = text + '<h5 class="text-center">' + data.formatted_address + '</h5>'
            } else {
                text = text + '<h5 class="text-center">No address available. Please check the locations website.</h5>'
            }
            text = text + '<hr><h4 class="text-center">Web address</h4>';
            if (data.website != undefined) {
                text = text + '<a href="' + data.website + '"><h5 class="text-center">' + data.name + ' Website</h5></a>'
            }
            text = text + '<hr><h4 class="text-center">Reviews</h4>';
            if (data.reviews != undefined) {
                $.each(data.reviews, function(index, value) {
                    if (value.rating < 3 && value.language == 'en' && value.text.length > 19) {
                        text = text + '<hr><h5 style="color: red">Rating: ' + value.rating + '/5</h5>';
                        text = text + '<h5 style="color: red">' + value.text + '</h5>';
                    } else if (value.rating == 3 && value.language == 'en' && value.text.length > 19) {
                        text = text + '<hr><h5 style="color: orange">Rating: ' + value.rating + '/5</h5>';
                        text = text + '<h5 style="color: orange">' + value.text + '</h5>';
                    } else if (value.language == 'en' && value.text.length > 19){
                        text = text + '<hr><h5 style="color: green">Rating: ' + value.rating + '/5</h5>';
                        text = text + '<h5 style="color: green">' + value.text + '</h5>';
                    }
                })
            } else {
                text = text + '<h5 class="text-center">There are no reviews for this location.</h5>'
            }
            $('#mapdata .modal-body').html(text);
        }, error: function(jqXHR, textStatus, errorThrown) {
            $('.modal-body').html('<h3 class="text-center">Unable to retrieve data. Please try again later</h3>');
        }
    });
    // $('.modal-body').html(text);
});
