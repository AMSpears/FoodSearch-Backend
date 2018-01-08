const mongoose = require('./connection')

const RestaurantSchema = new mongoose.Schema({
	owner_id: String,
	street_address: String,
	state: String,
	city: String,
	zipcode: Number,
	phone_number: Number,
	website_url: String,
	ratings: String,
	img: String,
	food_type: String
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
