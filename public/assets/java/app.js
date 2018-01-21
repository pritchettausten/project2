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

    var userInput = {
        locationName: $("#location_name").val(),
        activity: $("#activity_select option:selected").text(),
        body: $("#write-post").val()    
    };
    console.log(userInput);
    $.ajax({
        type: "POST",
        url:"/api/posts",
        data: userInput,
    })
    //return false;
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
      
      
       function pushPic (pic) {

      };
      
       function getUsername (g) {
          var a = g.split("@");
          var b = a[0];
          console.log(a);
          console.log(b);
          return b;
       };

   });