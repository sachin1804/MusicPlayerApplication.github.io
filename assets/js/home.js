
const categoriesContainer = document.getElementById("categories");
const latestReleaseContainer = document.getElementById("latest-releases");
let categories = [];
window.addEventListener('load', function () {
    const clientID = '5047c2d38a5f45a98e8d73506f8e05d4';
    const clientSecret = 'b87f6cc9f2b74352aea86da9d7cd3a4f';

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    }).then((result) => {
        return result.json();
    }).then((data) => {
        let token = data.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
        // console.log(token);
        fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((result) => {
            return result.json();
        }).then((categories_data) => {
            let genres = categories_data.categories.items;
            // console.log("genres", genres);
            // console.log(genres);
            for (let i = 0; i < genres.length; i++) {
                let genreId = genres[i].id;
                let category = {
                    id: genreId,
                    genreName: genres[i].name,
                    imageUrl: genres[i].icons[0].url
                }

                if (category.genreName == 'Indian Classical') {
                    continue;
                }

                let div = document.createElement("div");
                div.className = 'category';
                div.title = "Click on the name to get playlist"
                div.innerHTML = `
                <img src = ${category.imageUrl}>
                <p title = "Click to get playlist">
                    <a href = "/playlist/?genreId=${genreId}&token=${token}&genreName=${category.genreName}">
                    <span>${category.genreName}</span>
                    </a>
                </p>
                `
                categoriesContainer.appendChild(div);
                categories.push(category);
                // console.log(category);
            }
        })
    })


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,

    };

    // let latestRelease = []; 

    fetch("https://v1.nocodeapi.com/sachin1804/spotify/HxANfwRHSMSjHiHS/browse/new?country=IN", requestOptions)
        .then(response => response.json())
        .then((data) => {
            let playlists = data.albums.items;
            console.log(playlists);
            let token = JSON.parse(localStorage.getItem("access_token"));
            console.log(token);
            for (let i = 0; i < playlists.length; i++) {
                let album = {
                    id: playlists[i].id,
                    imageURL: playlists[i].images[0].url,
                    artistName: playlists[i].artists[0].name,
                    releaseDate: playlists[i].release_date,
                    trackName: playlists[i].name,
                    tracksEndPoint: playlists[i].href
                }

                console.log(album);
                let div = document.createElement('div');
                div.className = 'latest-release';
                div.title = `Release Date ${album.releaseDate}`
                div.innerHTML = `
                <img src=${album.imageURL} alt="album">
                <p>
                    <a href = "/new-release-tracks/?token=${token}&tracksendpoint=${album.tracksEndPoint}">
                    <span>${album.trackName}</span>
                    </a>
                </p>
                `

                latestReleaseContainer.appendChild(div);
            }
        })

});










// for (let j = 0; j < playlist.length; j++) {
    //     let tracksEndPoint = playlist[j].tracks.href;
    //     let limit = 10;
    //     fetch(`${tracksEndPoint}?limit=${limit}`, {
    //         method: 'GET',
    //         headers: { 'Authorization': 'Bearer ' + token }
    //     }).then((result) => {
    //         return result.json();
    //     }).then((tracks) => {
    //         console.log(genres[i].name, j, tracks);
    //     })
    // }



