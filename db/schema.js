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

const FavoritedRestaurantSchema = new mongoose.Schema({
	restaurant_id: String
})

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	favorited_restaturants: [FavoritedRestaurantSchema]
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const User = mongoose.model('User', UserSchema)
const FavoritedRestaurant = mongoose.model(
	'FavoritedRestaurant',
	FavoritedRestaurantSchema
)

module.exports = {
	Restaurant,
	User,
	FavoritedRestaurant
}
