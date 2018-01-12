const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const Restaurant = require('./db/schema').Restaurant

const app = express()

let cors_list = {
	origin: 'http://localhost:3000',
	default: 'http://localhost:3000'
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

app.listen(4000, () => {
	console.log('app listening on port 4000')
})
