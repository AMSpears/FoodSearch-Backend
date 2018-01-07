// follow user authentication steps from https://blog.jscrambler.com/implementing-jwt-using-passport/

const express = require('express')
const app = express()

app.get('/', (request, response) => {
	response.send('Hello World!')
})

app.listen(4000, () => {
	console.log('app listening on port 4000')
})
