const Restaurant = require('./schema').Restaurant

let restaurant_1 = new Restaurant({
	restaurant_name: 'Restaurant 1',
	img:
		'https://d2bxpc4ajzxry0.cloudfront.net/TripAdvisorInsights/sites/default/files/styles/tamc_featured/public/premiumforrestaurants_0.jpg?itok=e6grCBgm&c=0c491fcd5196a03c06210c8c3eac0ce0',
	street_address: '111 restaurant street',
	city: 'Washington',
	state: 'DC',
	zipcode: 11111,
	phone_number: 1111111111,
	website_url: 'http://restaurant1.com',
	food_type: 'Sea food'
})

let restaurant_2 = new Restaurant({
	restaurant_name: 'Restaurant 2',
	img: 'https://static.pexels.com/photos/5317/food-salad-restaurant-person.jpg',
	street_address: '111 restaurant street',
	city: 'Washington',
	state: 'DC',
	zipcode: 22222,
	phone_number: 2222222222,
	website_url: 'http://restaurant2.com',
	food_type: 'Sea food'
})

let restaurant_3 = new Restaurant({
	restaurant_name: 'Restaurant 3',
	img:
		'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
	street_address: '111 restaurant street',
	city: 'Washington',
	state: 'DC',
	zipcode: 33333,
	phone_number: 3333333333,
	website_url: 'http://restaurant3.com',
	food_type: 'Sea food'
})

let restaurants = [restaurant_1, restaurant_2, restaurant_3]

Restaurant.remove({})
	.then(() => {
		console.log('Restaurant remove successfully!')

		Restaurants.forEach((restaurant, i) => {
			restaurants[i].save((err, restaurant) => {
				err ? console.log(err) : console.log(restaurant)
			})
		})
	})
	.catch(err => console.log(err))
