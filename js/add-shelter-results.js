// add more results //
let page = 2;

function addedShelterHtml() {
  $('.results-list').append(
    `<div class="item item-results">
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
    )
};

function addMoreResults() {
  $('#more-results').click(event => {
    event.preventDefault();
    let zip = $('#zip').val();
    let distance = $('#distance').val();
    let maxResults = $('#max-results').val();
    getMoreShelters(zip, distance, maxResults);
  });
};

function getMoreShelters(zip, distance, maxResults) {
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
  .then(responseJson => addResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
  page++;
}

  
  
function addResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
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

      addedShelterHtml();
    };
  $('#results').removeClass('hidden');  
};  

$("#more-results").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $("#more-results").offset().top
  }, 2500);
});

$(addMoreResults);