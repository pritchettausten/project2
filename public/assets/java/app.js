//API KEY:
// AIzaSyAkRCGxPbugNrJuV7hLigTJRxIU-F3bTlY


//initialize parallax
$(document).ready(function () {
    $('.parallax').parallax();

    //pushpin initialization
    // $('.stick-bar').pushpin({
    //     top: 565,
    //     bottom: 5000,
    //     offset: 0
    // });

    //pushpin initialization
    $('.stick-side').pushpin({
        top: 0,
        bottom: 5000,
        offset: 60
    });

    //initialize scrollfire
    // var options = [{
    //     selector: '#activity-side',
    //     offset: 560,
    //     callback: function (el) {
    //         $("#activity-side").toggleClass("hide");
    //         Materialize.fadeInImage($(el));
    //     }
    // }];
    // Materialize.scrollFire(options);

    //initialize modals
    $('.modal').modal();

    //chips
    $('.chips').material_chip();
    $('.chips-initial').material_chip({
        data: [{
            tag: 'Hiking',
            id: 1
        }, {
            tag: 'Camping',
            id: 2
        }],
    });
    $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
    });
    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
            data: {
                'hiking': null,
                'camping': null,
                'kayaking': null
            },
            limit: Infinity,
            minLength: 1
        }
    });

    $('.chips').on('chip.add', function (e, chip) {
        Materialize.toast('I am a ' + chip.tag + " chip", 4000);
    });

});

//GOOGLE MAPS
function initMap() {
    var uluru = {
        lat: -25.363,
        lng: 131.044
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}