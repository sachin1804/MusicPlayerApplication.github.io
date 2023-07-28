const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    duration: Number,
    filePath: String
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;