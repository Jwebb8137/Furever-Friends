fetch('https://gnews.io/api/v3/search?q="{pet of the week}"&image=required&mindate=2020-07-01&token=67e792384d757cf176559f869d647b25')
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
    for (let i = 0; i < responseJson.articles.length; i++) {

        let photoUrl = "media/logo.png";
        let title = "Not Specified";
        let description = "Visit Website";
        let url = "Not Specified";
        (responseJson.articles[i].image !== null) ? photoUrl = responseJson.articles[i].image: photoUrl;
        (responseJson.articles[i].title !== null) ? title = responseJson.articles[i].title: title;
        (responseJson.articles[i].description !== null) ? description = responseJson.articles[i].description: description;
        (responseJson.articles[i].url !== null) ? url = responseJson.articles[i].url: url;
    
        $('.results-list').append(
        `<div class="item item-results">
        <li>
            <img class="results-img" src="${photoUrl}" alt="animal image" width="90%">
            <div class="img-profile">
            <i class="fas fa-paw fa-paw-profile"></i>
            <h3 class="profile-name">${title}</h3>
            <div class="profile-text">
                <p>${description}</p>
            </div>
            <a class="profile-link" href="${url}" target="_blank">Find Out More <i class="fas fa-arrow-right"></i></a>
            </div>
        </li>
        </div>`
        )
    };
};