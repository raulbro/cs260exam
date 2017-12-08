var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  url: String,
});
mongoose.model('Product', ProductSchema);