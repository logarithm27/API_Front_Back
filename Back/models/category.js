const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  npm : { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);