module.exports.getPlaylist = function (req, res) {
    let genreId = req.query.genreId;
    let token = req.query.token;
    let genreName = req.query.genreName;
    const playlistInfoArray = [];
    console.log(genreName);
    // const allPlaylistsContainer = this.document.getElementById("All-playlists");

    fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then((result) => {
        return result.json();
    }).then((data) => {
        let playlist = data.playlists.items;
        for (let i = 0; i < playlist.length; i++) {

            let playListInfo = {
                description: playlist[i].description,
                id: playlist[i].id,
                imageUrl: playlist[i].images[0].url,
                playListName: playlist[i].name,
                tracksEndPoint: playlist[i].tracks.href,
                total: playlist[i].tracks.total
            }
            playlistInfoArray.push(playListInfo);
        }

        return res.render('_playlist', {
            playlistInfoArray: playlistInfoArray,
            genreName: genreName,
            token: token,
            title: 'Playlist_page'
        });
    })
}