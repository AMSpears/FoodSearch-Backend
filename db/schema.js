const mongoose = require('./connection')

const RestaurantSchema = new mongoose.Schema({
	id: String,
	term: String,

	location: {
		address1: String,
		city: String,
		state: String,
		zip_code: Number,
		country: String
	}
})

const FavoriteRestaurantSchema = new mongoose.Schema({
	restaurant_id: String
})

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	favorite_restaturant: [FavoriteRestaurantSchema]
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const User = mongoose.model('User', UserSchema)
const FavoriteRestaurant = mongoose.model(
	'FavoriteRestaurant',
	FavoriteRestaurantSchema
)

module.exports = {
	Restaurant,
	User,
	FavoriteRestaurant
}
