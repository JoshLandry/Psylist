'use strict';

var mongoose = require('mongoose');

var releaseSchema = new mongoose.Schema({
  albumName: String,
  artistName: String,
  isVA: String,
  recordLabel: String,
  year: String,
  genre: String,
  review: String
});

module.exports = mongoose.model('Release', releaseSchema);