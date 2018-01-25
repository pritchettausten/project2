//API KEY:
//AIzaSyAkRCGxPbugNrJuV7hLigTJRxIU-F3bTlY
var userId;
$(".activity-icon").on("click", function (){
    $(this).toggleClass("z-depth-2");
    console.log("is it working?")
 });

 
 
 //initialize parallax
 $(document).ready(function () {
    $('.parallax').parallax();
 //initialize select menu
    $('select').material_select();
 //initialize tabs
    $('ul.tabs').tabs();
 
    $.ajax("/auth", {
        type: "get",
    }).then(function(data) {
        if (data) {
            userId = data.id;
            console.log("I'm logged in");
            $("#create").removeClass("hide");
            $("#logout").removeClass("hide");
            $("#profile").removeClass("hide");
            $("#loginModal").addClass("hide");
            $("#profile").attr("href", "/user/"+userId);
        }
    });
    //pushpin initialization
    // $('.stick-bar').pushpin({
    //     top: 565,
    //     bottom: 5000,
    //     offset: 0
    // });
 
    //pushpin initialization
    // $('.stick-side').pushpin({
    //     top: 0,
    //     bottom: 5000,
    //     offset: 60
    // });
 
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
    // $('.chips').material_chip();
    // $('.chips-initial').material_chip({
    //     data: [{
    //         tag: 'Hiking',
    //         id: 1
    //     }, {
    //         tag: 'Camping',
    //         id: 2
    //     }],
    // });
    // $('.chips-placeholder').material_chip({
    //     placeholder: 'Enter a tag',
    //     secondaryPlaceholder: '+Tag',
    // });
    // $('.chips-autocomplete').material_chip({
    //     autocompleteOptions: {
    //         data: {
    //             'hiking': null,
    //             'camping': null,
    //             'kayaking': null
    //         },
    //         limit: Infinity,
    //         minLength: 1
    //     }
    // });
 
    // $('.chips').on('chip.add', function (e, chip) {
    //     Materialize.toast('I am a ' + chip.tag + " chip", 4000);
    // });
 
 });

//GOOGLE MAPS
function initMap(data, cb) {
    var uluru = {
         lat: 39.3210,
         lng: -111.0937
    };
    var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 6,
         center: uluru
    });
    infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();
    
    document.getElementById('submit').addEventListener('click', function() {
            geocodeAddress(geocoder, map);
    });

    populateMap(map);
    //filterMap(map);
    
    // $.ajax("/coord", {
    //     type: "Get",
    // }).then(function(data) {
    //     // console.log(data);
    //     for (let i = 0; i < data.length; i++) {
    //         var newMark = {
    //         lat: parseFloat(data[i].lat),
    //         lng: parseFloat(data[i].lng)
    //     };
    //     var marker = new google.maps.Marker({
    //         position: newMark,
    //         map: map
    //     });
    //     google.maps.event.addListener(marker, 'click', function() {
    //         infowindow.setContent(
    //             data[i].locationName 
    //             + "<hr>Activity: " + data[i].activity  
    //             + "<br>" + data[i].body);
    //         infowindow.open(map, this);
    //         });       
    //     }     
    // });   
};
 
function geocodeAddress(geocoder, resultsMap, cb) {
    var address = document.getElementById('location_name').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        var lng = results[0].geometry.location.lng();
        var lat = results[0].geometry.location.lat();

        addUserData(lat, lng);

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
};
 
function populateMap(map){
    $.ajax("/coord", {
        type: "Get",
    }).then(function(data) {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            var newMark = {
            lat: parseFloat(data[i].lat),
            lng: parseFloat(data[i].lng)
        };
        var marker = new google.maps.Marker({
            position: newMark,
            map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(
                data[i].locationName 
                + "<hr>Activity: " + data[i].activity  
                + "<br>" + data[i].body);
            infowindow.open(map, this);
            });       
        }     
    });   
}

function filterMap(map){
    $.ajax("/filter", {
        type: "Get",
    }).then(function(data) {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            var newMark = {
            lat: parseFloat(data[i].lat),
            lng: parseFloat(data[i].lng)
        };
        var marker = new google.maps.Marker({
            position: newMark,
            map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(
                data[i].locationName 
                + "<hr>Activity: " + data[i].activity  
                + "<br>" + data[i].body);
            infowindow.open(map, this);
            });       
        }     
    });   
}

$('select').material_select();

//$("#submit").on("click", function(event)
function addUserData(lat, lng){
    //event.preventDefault();
    //event.stopPropagation();
    var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/outdoorproject/upload"; 
    var CLOUDINARY_UPLOAD_PRESET = "th8ye3vy";
    var picture = $("#activityPic");
    var file = picture[0].files[0];
    var formData = new FormData();
       formData.append("file", file);
       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    // console.log(file);
    $.ajax({
        url: CLOUDINARY_URL,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false
      }).then(function(res) {
        // console.log(res);
        var picUrl = res.url;
        
        var resize = function (p) {
            var a = p.split("upload");
            var b = a[0] + "upload/w_1000,h_1000,c_crop/w_200," + a[1];
            console.log(b);
            return b;
        };
        var aUrl = resize(picUrl);
        // console.log(picUrl)
        // console.log(userInput);
        console.log(userId);
        var userInput = {
            locationName: $("#location_name").val(),
            activity: $("select option:selected").text(),
            body: $("#write-post").val(),
            lat: lat,
            lng: lng,
            picture: aUrl,
            UserId: userId    
        };
        // console.log(userInput);
        $.ajax({
            type: "POST",
            url:"/api/posts",
            data: userInput,
        }).then(function(data){
            location.reload();
        })
    });
};

$("#click").on("click", function() {
    event.preventDefault();
        var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/outdoorproject/upload";
        var CLOUDINARY_UPLOAD_PRESET = "th8ye3vy";
      
       var Name = $("#full-name").val().trim();
        var Email = $("#email").val().trim();
        var About = $("#about").val().trim();
        var Password =  $("#password").val().trim();
        var picture = $("#picture");
        var file = picture[0].files[0];

       console.log(picture[0].files[0]);

       var Username = getUsername(Email);
        var formData = new FormData();

       formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    $.ajax({
        url: CLOUDINARY_URL,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false
    }).then(function(res) {
        
       var picUrl = res.url;
        var resize = function (p) {
            var a = p.split("upload");
            var b = a[0] + "upload/w_1000,h_1000,c_crop/w_200," + a[1];
            console.log(b);
            return b;
        };
        var aUrl = resize(picUrl);
        var User = {
           name: Name,
           email: Email,
           about: About,
           username: Username,
           password: Password,

     
          picture: aUrl
       };
       console.log(User);

       $.ajax("/user/new", {
            type: "POST",
            data: User
        }).then(function(data) {
            var U = Username;
            var P = Password;
            var login = {
                username: U,
                password: P
            }
            $.ajax("/login", {
                type: "Post",
                data: login
            }).then(function(data) {
                location.reload();
            });
        });
    });

   function getUsername (g) {
        var a = g.split("@");
        var b = a[0];
        return b;
    };
});

   
$("#click").on("click", function() {
    event.preventDefault();
    
    var Name = $("#name").val().trim();
    var Email = $("#email").val().trim();
    var About = $("#about").val().trim();
    var Password =  $("#password").val().trim();
    var Username = getUsername(Email);
    var User = {
        name: Name,
        email: Email,
        about: About,
        username: Username,
        password: Password
    };
    console.log(User);
    
    $.ajax("/user/new", {
        type: "POST",
        data: User
    }).then(function(err) {
        if (err) {
            console.log(err);
        }
    });
    
    function pushPic (pic) {};
    
    function getUsername (g) {
        var a = g.split("@");
        var b = a[0];
        console.log(a);
        console.log(b);
        return b;
    };
});



$("#login").on("click", function() {
    var Username = $("#login-name").val().trim();
    var Password = $("#login-password").val().trim();
    var login = {
        username: Username,
        password: Password
    }
    $.ajax("/login", {
        type: "Post",
        data: login
    }).then(function(data) {
        // if (data) {
        //     console.log("this Works");
        //     $("#create").removeClass("hide");
        //     $("#profile").removeClass("hide");
        //     $("#loginModal").addClass("hide");    
        // }
        location.reload();
    });

});

$("#logout").on("click", function() {
    var logout = {
        id: userId
    };
    $.ajax("/logout", {
        type: "Post",
        data: logout
    }).then(function(res) {
        location.reload();
    });
});

//    $("#user").on("click", function() {
//         var Id = 1;
//         var data = {
//             id: Id
//         };
//         $.ajax("/user", {
//             type: "Get",
//             data: data
//         }).then(function(err) {
//             if (err) {
//                 console.log(err);
//             }
//         });
//    });

