fetch('https://gnews.io/api/v3/search?q="{pet of the week}"&image=required&mindate=2020-07-01&articleCount=25&token=67e792384d757cf176559f869d647b25')
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

function displayResults(responseJson) {
  console.log(responseJson);
  console.log(responseJson.articles);
  // for loop
  for (let i = 0; i < responseJson.articles.length; i++) {
    $('.results-list').append(
        `
        <div class="item item-results">
          <li>
            <img class="results-img" src="${responseJson.articles[i].image}" alt="animal image" width="90%">
            <div class="img-profile">
              <i class="fas fa-paw fa-paw-profile"></i>
              <h3 class="profile-name">${responseJson.articles[i].title}</h3>
              <div class="profile-text">
                <p>${responseJson.articles[i].description}</p>
              </div>
              <a class="profile-link" href="${responseJson.articles[i].url}">Find Out More <i class="fas fa-arrow-right"></i></a>
            </div>
          </li>
        </div>
        `
    )
  }
}