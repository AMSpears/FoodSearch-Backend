// follow user authentication steps from https://blog.jscrambler.com/implementing-jwt-using-passport/

const express = require('express')
const parser = require('body-parser')
const jwt = require('jwt-simple')
const cors = require('cors')
const passport = require('passport')
const bcrypt = require('bcrypt')

const auth = require('./auth.js')()
const cfg = require('./config.js')
const Restaurant = require('./db/schema').Restaurant
const User = require('./db/schema').User
const FavoriteRestaurant = require('./db/schema').FavoriteRestaurant

const app = express()

let cors_list = {
	origin: 'http://localhost:3000',
	default: 'http://localhost:3000'
}

app.use(cors(cors_list))
app.use(parser.json())
app.use(auth.initialize())

app.get('/', (req, res) => {
	res.send('Hello World!')
})
//LogIn and signUp routes

app.post('/api/login', function(req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, function(
					err,
					response
				) {
					if (response) {
						var payload = { id: user.id }
						var token = jwt.encode(payload, cfg.jwtSecret)
						res.json({ token: token })
					} else {
						res.sendStatus(500)
					}
				})
			} else {
				res.sendStatus(500)
			}
		})
	} else {
		res.sendStatus(401)
	}
})

app.post('/api/signup', function(req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				res.sendStatus(500)
				console.log(err)
			} else {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					User.create({ email: req.body.email, password: hash }).then(user => {
						if (user) {
							var payload = { id: user.id }
							var token = jwt.encode(payload, cfg.jwtSecret)
							res.json({ token: token })
						} else {
							res.sendStatus(401)
							console.log(err)
						}
					})
				})
			}
		})
	} else {
		res.sendStatus(401)
		console.log(err)
	}
})

// Restaurants routes

app.get('/api/restaurants', (req, res) => {
	if (req.headers.token && req.headers.token.length > 0) {
		let userid = jwt.decode(req.headers.token, cfg.jwtSecret).id
		Restaurant.find()
			.then(restaurants => {
				res.json({
					restaurants: restaurants,
					userid: userid
				})
			})
			.catch(err => console.log(err))
	} else {
		Restaurant.find()
			.then(restaurants => {
				res.json({
					restaurants: restaurants,
					userid: ''
				})
			})
			.catch(err => console.log(err))
	}
})

app.listen(4000, () => {
	console.log('app listening on port 4000')
})
