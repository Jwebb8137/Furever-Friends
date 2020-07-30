'use strict';

//Html for responsive site navigation menu
$('#my-sidenav').html(`
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="index.html">Home <i class="fas fa-home"></i></a>
  <a href="cat-search.html">Cats <i class="fas fa-cat"></i></a>
  <a href="dog-search.html">Dogs <i class="fas fa-dog"></i></a>
  <a href="shelter-search.html">Shelters <i class="far fa-building"></i></a>
  <a href="#">Donate <i class="fas fa-dollar-sign"></i></a>
  <a href="#">About <i class="far fa-address-card"></i></a>
`);

function openNav() {
  $("#my-sidenav").css("width","250px");
}

function closeNav() {
  $("#my-sidenav").css("width","0");
}

$("body").mouseup(function() {
  $("#my-sidenav").css("width","0");
});


