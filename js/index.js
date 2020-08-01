'use strict';

// Html for responsive site navigation menu
$('#my-sidenav').html(`
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="index.html">Home <i class="fas fa-home"></i></a>
  <a href="cat-search.html">Cats <i class="fas fa-cat"></i></a>
  <a href="dog-search.html">Dogs <i class="fas fa-dog"></i></a>
  <a href="shelter-search.html">Shelters <i class="far fa-building"></i></a>
  <a href="featured-pets.html">Featured <i class="far fa-star"></i></a>
  <a href="#">About <i class="far fa-address-card"></i></a>
`);

// Html for Header
$('.header').html(`
  <h1 class="logo"><a href="index.html"><img src="media/logo.png" width="150px"></a></h1>
  <ul class="main-nav">
      <li><a href="index.html">Home</a></li>
      <li><a href="cat-search.html">Cats</a></li>
      <li><a href="dog-search.html">Dogs</a></li>
      <li><a href="shelter-search.html">Shelters</a></li>
      <li><a href="featured-pets.html">Featured</a></li>
  </ul>
`);

// Html for footer
$('.footer-distributed').html(`
  <div class="footer-left">
    <p class="footer-links">
        <a class="link-1" href="index-html">Home</a>
        <a href="cat-search.html">Cats</a>
        <a href="dog-search.html">Dogs</a>
        <a href="shelter-search.html">Shelters</a>
        <a href="featured-pets.html">Featured</a>
        <img id="footer-logo" src="media/logo.png" alt="logo" width="200px">
    </p>
    <p>Furever Friends &copy; 2020</p>
  </div>
`);

// Mobile-nav functionality
function openNav() {
  $("#my-sidenav").css("width","250px");
}

function closeNav() {
  $("#my-sidenav").css("width","0");
}

$("body").mouseup(function() {
  $("#my-sidenav").css("width","0");
});


// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      videoId: 'ieHv-6UUftc',
      events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
      }
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 0);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}






