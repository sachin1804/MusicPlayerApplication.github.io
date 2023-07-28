module.exports.getTracks = function (req, res) {
    let token = req.query.token;
    let tracksEndPoint = req.query.tracksEndPoint;
    let playlistName = req.query.playlistName;
    let total = req.query.total;
    console.log(token);

    let allTracksArray = [];
    fetch(`${tracksEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then((result) => {
        return result.json();
    }).then((tracks_data) => {
        let tracks = tracks_data.items;
        for (let t of tracks) {
            let trackObj = {
                id: t.track.id,
                artists: getArtist(t.track.artists),
                duration: convertMsToMinutesSeconds(t.track.duration_ms),
                imageUrl: getImage(t.track.album.images),
                trackEndPoint: t.track.href,
                trackName: t.track.name,
                trackPlayUrl: t.track.external_urls.spotify
            }

            // t.track.album.images[0].url
            allTracksArray.push(trackObj);
        }

        function getArtist(artists) {
            let artist = "";
            // let artistsArray = artists;
            if (artists.length == 1) {
                return artists[0].name;
            }
            for (let i of artists) {
                artist = i.name + " || " + artist;
            }

            return artist;
        }

        function getImage(images) {
            for (let img of images) {
                if (img.url != null) {
                    return img.url;
                }
                else {
                    continue;
                }
            }

            return "";
        }

        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function convertMsToMinutesSeconds(milliseconds) {
            const minutes = Math.floor(milliseconds / 60000);
            const seconds = Math.round((milliseconds % 60000) / 1000);

            return seconds === 60
                ? `${minutes + 1}:00`
                : `${minutes}:${padTo2Digits(seconds)}`;
        }


        console.log(total);
        res.render('_tracks', {
            title: 'tracks_page',
            playlistName: playlistName,
            allTracksArray: allTracksArray,
            total: total,
            token: token
        })
    })
}



