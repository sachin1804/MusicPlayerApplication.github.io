const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0/MPP_development');


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error: '));
db.once('open', function () {
    console.log('Connected to mongodb');
});

module.exports = db;