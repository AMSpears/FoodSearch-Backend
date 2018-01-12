const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const Restaurant = require('./db/schema').Restaurant

const app = express()

if (process.env.NODE_ENV === 'production') {
	cors_list = {
		origin: 'http://localhost:3000',
		default: 'http://localhost:3000'
	}
} else {
	cors_list = {
		origin: 'http://food-searches.surge.sh/ ',
		default: 'http://food-searches.surge.sh/ '
	}
}

app.use(cors(cors_list))
app.use(parser.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

// Yelp api ==> https://www.yelp.com/developers/documentation/v3/business_search
app.post('/api/search', function(req, res) {
	// let api_key = process.env.API_KEY
	let request = axios.create({
		headers: {
			Authorization: `Bearer HBLkugs6PvIPyz5hNupxRUtXC5_dxH3a_lscCNOSr2lTOoHuH-R1S67Wl5cnCCUg6xnJuWN6UnUHCbPZeAILWzsAsO60K8w1mSDYE6-r40SAPnhn7EQA3aVSbhFVWnYx`
		}
	})
	// find a way to store the api key in environment variable
	request
		.get('https://api.yelp.com/v3/businesses/search', {
			params: {
				term: req.body.term,
				location: req.body.location
			}
		})
		.then(response => {
			console.log(response.data)
			res.json(response.data.businesses)
		})
		.catch(err => {
			console.log(err)
		})
})

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
