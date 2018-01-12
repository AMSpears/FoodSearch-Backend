const mongoose = require('mongoose')

if (process.env.NODE_ENV == 'production') {
	mongoose.connect(process.env.MLAB_URL)
} else {
	mongoose.connect('mongodb://localhost/restaurants')
}

mongoose.Promise = Promise

module.exports = mongoose

const db = mongoose.connection

db.on('error', err => {
	console.log(err)
})

db.once('open', () => {
	console.log('You are connected!')
})
