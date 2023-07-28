// const { startSession } = require("mongoose");

// let token = JSON.parse(localStorage.getItem("access_token"));
module.exports.searchResults = function (req, res) {

    let value = req.query.value
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
    };

    let albumsArray = []

    fetch(`https://v1.nocodeapi.com/sachin1804/spotify/HxANfwRHSMSjHiHS/search?q=${value}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            let albums = data.albums.items;
            for (let i = 0; i < albums.length; i++) {
                let album = {
                    tracksEndPoint: albums[i].external_urls.spotify,
                    imageUrl: albums[i].images[0].url,
                    name: albums[i].name,
                    id: albums[i].id,
                    total: albums[i].total_tracks
                }

                albumsArray.push(album);
            }

            function getArtists(artists) {
                let artist = "";
                if (artists.length == 1) {
                    return artists[0].name;
                }

                for (let i = 0; i < artists.length; i++) {
                    artist = artists[i].name + " || " + artist
                }

                return artist;
            }

            return res.render('_search_results', {
                value,
                title: 'Search Results',
                albumsArray: albumsArray
            })
        })
}