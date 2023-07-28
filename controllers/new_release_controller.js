const User = require("../models/user");

module.exports.newRelease = function (req, res) {
    let token = req.query.token;
    let tracksendpoint = req.query.tracksendpoint;

    let allTracksArray = [];
    fetch(`${tracksendpoint}`, {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + token }
    }).then((result) => {
        return result.json();
    }).then((data) => {
        let imageUrl = data.images[1].url;
        let totalTracks = data.tracks.total;
        let playListName = data.name;
        let tracksArray = data.tracks.items;

        for (let i = 0; i < tracksArray.length; i++) {
            let track = {
                artists: getArtists(tracksArray[i].artists),
                duration: convertMsToMinutesSeconds(tracksArray[i].duration_ms),
                id: tracksArray[i].id,
                trackName: tracksArray[i].name,
                trackPlayUrl: tracksArray[i].external_urls.spotify
            }

            // console.log(tracksArray[i]);
            allTracksArray.push(track);
        }
        // console.log(" // " + imageUrl + " // " + totalTracks);

        function getArtists(artists) {
            let artist = "";

            if (artists.length == 1) {
                return artists[0].name;
            }
            for (let i of artists) {
                artist = i.name + " || " + artist;
            }

            return artist;
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


        // if (req.cookies.user_id) {
        //     User.findById(req.cookies.user_id)
        //         .then((user) => {
        //             if (user) {
        //                 return 
        //             }
        //             return res.redirect("/users/sign-in");
        //         })
        // }
        // else {
        //     res.redirect("/users/sign-in");
        // }

        res.render('new_release', {
            title: 'new_release_page',
            playListName: playListName,
            imageUrl: imageUrl,
            totalTracks: totalTracks,
            newReleases: allTracksArray
        });

    })
}