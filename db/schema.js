const mongoose = require('./connection')

const RestaurantSchema = new mongoose.Schema({
	id: String,
	term: String,
	food: String,
	image_url: String,
	location: String
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = { Restaurant }
