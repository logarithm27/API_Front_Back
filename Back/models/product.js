const mongoose = require('mongoose');
const category = require('./category')

const productShema = mongoose.Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  nutriGrade: { type: String, required: true },
  image: { type: String, required: true },
  insertAt: { type: Date, required: true, default: Date.now() },
  content: {type: String, required: false},
  category: {type: mongoose.Schema.Types.ObjectId, ref: category }
});

module.exports = mongoose.model('Product', productShema);