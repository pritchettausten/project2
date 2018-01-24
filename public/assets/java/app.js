//API KEY:
// AIzaSyAkRCGxPbugNrJuV7hLigTJRxIU-F3bTlY

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

$('select').material_select();


$("#submit").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/outdoorproject/upload"; 
    var CLOUDINARY_UPLOAD_PRESET = "th8ye3vy";
    var picture = $("#activityPic");
    var file = picture[0].files[0];
    var formData = new FormData();
       formData.append("file", file);
       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    console.log(file);
    $.ajax({
        url: CLOUDINARY_URL,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false
      }).then(function(res) {
        console.log(res);
        var picUrl = res.url;
        var resize = function (p) {
            var a = p.split("upload");
            var b = a[0] + "upload/w_1000,h_1000,c_crop/w_200," + a[1];
            console.log(b);
            return b;
        };
        var aUrl = resize(picUrl);
        console.log(picUrl)
    console.log(userInput);
    var userInput = {
        locationName: $("#location_name").val(),
        activity: $("select option:selected").text(),
        body: $("#write-post").val(),
        picture: aUrl    
    };
    console.log(userInput);
    $.ajax({
        type: "POST",
        url:"/api/posts",
        data: userInput,
    });
    });
});

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
        }).then(function(err) {
            if (err) {
                console.log(err);
            }
        });
      });

       function getUsername (g) {
          var a = g.split("@");
          var b = a[0];
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
        if (data) {
            console.log("this Works");
            $("#create").removeClass("hide");
            $("#loginModal").addClass("hide");
            

        }
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