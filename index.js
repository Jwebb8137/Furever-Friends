'use strict';

//Html for responsive site navigation menu
$('#my-sidenav').html(`
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="/">Home <i class="fas fa-home"></i></a>
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

function watchShelterForm() {
  $('#shelter-form').submit(event => {
    event.preventDefault();
    let zip = $('#zip').val();
    let distance = $('#distance').val();
    let maxResults = $('#max-results').val();
    getShelters(zip, distance, maxResults);
  });
};


function getAnimals(type, zip, distance, maxResults) {
  // put your own value below!
  const apiKey = 'KDMmCz21JbuiHaR1Byz70ioQBMNqOy1Sbh8lstgYDWlMSlMjY2';
  const secret = 'yvZvirTKswWy7BHNelnesKljNOEmUof3APwZS4yd'
  const searchURL = 'https://api.petfinder.com/v2/oauth2/token';

  // Call the API
  // This is a POST request, because we need the API to generate a new token for us
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (resp) {

    // Return the response as JSON
    return resp.json();

  }).then(function (data) {

    // Log the API data
    console.log('token', data);

    // Return a second API call
    // This one uses the token we received for authentication

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
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('.results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.animals.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail

    let photoUrl = "media/logo.png";
    let petAddress = "Not yet determined";
    let petPhone = "Click on link below";

    if (responseJson.animals[i].primary_photo_cropped !== null) {
      photoUrl = responseJson.animals[i].primary_photo_cropped.full;
    };

    if (responseJson.animals[i].contact.address.address1 !== null) {
      petAddress = responseJson.animals[i].contact.address.address1;
    }

    if (responseJson.animals[i].contact.phone !== null) {
      petPhone = responseJson.animals[i].contact.phone;
    }

    $('.results-list').append(
      `<div class="item">
        <li>
          <img class="results-img" src="${photoUrl}" alt="cat image" width="90%">
          <div class="img-profile">
            <i class="fas fa-paw fa-paw-profile"></i>
            <h3 class="profile-name">${responseJson.animals[i].name}</h3>
            <div class="profile-text">
              <p><i class="fas fa-map-marker-alt mr-5"></i> ${petAddress}</p>
              <p>${responseJson.animals[1].contact.address.city}, ${responseJson.animals[1].contact.address.state}</p>
              <p><i class="fas fa-phone-alt mr-5"></i>  ${petPhone}</p>
            </div>
            <a class="profile-link" href="${responseJson.animals[i].url}">Find Out More <i class="fas fa-arrow-right"></i></a>
          </div>
        </li>
      </div>
      <i class="far fa-heart"></i>
      `
    )};
  $('#results').removeClass('hidden');
};

function getShelters(zip, distance, maxResults) {
  // put your own value below!
  const apiKey = 'KDMmCz21JbuiHaR1Byz70ioQBMNqOy1Sbh8lstgYDWlMSlMjY2';
  const secret = 'yvZvirTKswWy7BHNelnesKljNOEmUof3APwZS4yd'
  const searchURL = 'https://api.petfinder.com/v2/oauth2/token';

  // Call the API
  // This is a POST request, because we need the API to generate a new token for us
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (resp) {

    // Return the response as JSON
    return resp.json();

  }).then(function (data) {

    // Log the API data
    console.log('token', data);

    // Return a second API call
    // This one uses the token we received for authentication

    return fetch('https://api.petfinder.com/v2/organizations?location=' + zip + '&distance=' + distance + '&limit=' + maxResults, {
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
  .then(responseJson => displayShelters(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayShelters(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('.results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.organizations.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail

    let photoUrl = "media/logo.png";
    let shelterAddress = "Not Specified";
    let shelterPhone = "Visit Website";
    if (responseJson.organizations[i].photos.length !== 0) {
      photoUrl = responseJson.organizations[i].photos[0].medium;
    }
    if (responseJson.organizations[i].address.address1 !== null) {
      shelterAddress = responseJson.organizations[i].address.address1;
    }

    if (responseJson.organizations[i].phone !== null) {
      shelterPhone = responseJson.organizations[i].phone;
    }

    $('.results-list').append(
      `<div class="item">
        <li>
          <img class="results-img" src="${photoUrl}" alt="cat image" width="90%">
          <div class="img-profile">
            <i class="fas fa-paw fa-paw-profile"></i>
            <h3 class="profile-name">${responseJson.organizations[i].name}</h3>
            <div class="profile-text">
              <p><i class="fas fa-map-marker-alt mr-5"></i> ${shelterAddress}</p>
              <p>${responseJson.organizations[i].address.city}, ${responseJson.organizations[i].address.state}</p>
              <p><i class="fas fa-phone-alt mr-5"></i>  ${shelterPhone}</p>
            </div>
            <a class="profile-link" href="${responseJson.organizations[i].url}">Find Out More <i class="fas fa-arrow-right"></i></a>
          </div>
        </li>
      </div>`
    )};
  $('#results').removeClass('hidden');
};

$(watchCatForm);
$(watchDogForm);
$(watchShelterForm);

