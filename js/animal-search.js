function watchDogForm() {
  $('#dog-form').submit(event => {
    event.preventDefault();
    let zip = $('#zip').val();
    let distance = $('#distance').val();
    let maxResults = $('#max-results').val();
    let type = "Dog";
    getAnimals(type, zip, distance, maxResults);
  });
};
  
function watchCatForm() {
  $('#cat-form').submit(event => {
    event.preventDefault();
    let zip = $('#zip').val();
    let distance = $('#distance').val();
    let maxResults = $('#max-results').val();
    let type = "Cat";
    getAnimals(type, zip, distance, maxResults);
  });
};
  
function getAnimals(type, zip, distance, maxResults) {
  const apiKey = 'KDMmCz21JbuiHaR1Byz70ioQBMNqOy1Sbh8lstgYDWlMSlMjY2';
  const secret = 'yvZvirTKswWy7BHNelnesKljNOEmUof3APwZS4yd'
  const searchURL = 'https://api.petfinder.com/v2/oauth2/token';

  // Call the API
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (resp) {
    $(".loader-container").removeClass('hidden');
    // Return the response as JSON
    return resp.json();
  }).then(function (data) {
    // Return a second API call
    return fetch('https://api.petfinder.com/v2/animals?location=' + zip + '&distance=' + distance + '&type=' + type + '&status=adoptable' + '&limit=' + maxResults, {
      headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message} (Check your zip code and try again!)`);
  });
}
  
  function displayResults(responseJson) {
    $('.results-list').empty();
    for (let i = 0; i < responseJson.animals.length; i++){

      let petPhotoUrl = "media/logo.png";
      let defaultCatImg = "media/default-profile-cat.png";
      let petName ="One Cute Cat";  
      let petAddress = "Not yet determined";
      let petCity = "Nearby";
      let petState = "USA";
      let petPhone = "Click on link below";
      let petUrl = "Not Yet Given";

      (responseJson.animals[i].primary_photo_cropped !== null && responseJson.animals[i].type === "Cat") ? petPhotoUrl = responseJson.animals[i].primary_photo_cropped.full: defaultCatImg;
      (responseJson.animals[i].primary_photo_cropped !== null && responseJson.animals[i].type === "Dog") ? petPhotoUrl = responseJson.animals[i].primary_photo_cropped.full: petPhotoUrl;
      (responseJson.animals[i].name !== null) ? petName = responseJson.animals[i].name: petName;
      (responseJson.animals[i].contact.address.address1 !== null) ? petAddress = responseJson.animals[i].contact.address.address1: petAddress; 
      (responseJson.animals[i].contact.address.city !== null) ? petCity = responseJson.animals[i].contact.address.city: petCity;
      (responseJson.animals[i].contact.address.state !== null) ? petState = responseJson.animals[i].contact.address.state: petState;
      (responseJson.animals[i].contact.phone !== null) ? petPhone = responseJson.animals[i].contact.phone: petPhone;
      (responseJson.animals[i].url !== null) ? petUrl = responseJson.animals[i].url: petUrl;
      
      $(".loader-container").addClass('hidden');
      $('.results-list').append(
        `<div class="item item-results">
          <li>
            <img class="results-img" src="${petPhotoUrl}" alt="cat image" width="90%">
            <div class="img-profile">
              <i class="fas fa-paw fa-paw-profile"></i>
              <h3 class="profile-name">${petName}</h3>
              <div class="profile-text">
                <p><i class="fas fa-map-marker-alt mr-5"></i> ${petAddress}</p>
                <p>${petCity}, ${petState}</p>
                <p><i class="fas fa-phone-alt mr-5"></i>  ${petPhone}</p>
              </div>
              <a class="profile-link" href="${petUrl}" target="_blank">Find Out More <i class="fas fa-arrow-right"></i></a>
            </div>
          </li>
        </div>`
      )};
    $('#results').removeClass('hidden');
};  

$("#search-submit").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $("#results-target").offset().top
  }, 2500);
});

$(watchCatForm);
$(watchDogForm);
  