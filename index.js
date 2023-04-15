const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('{ "response": "Hello From Rinney" }')
});

app.get('/will', (req, res) => {
    res.send('{ "response": "Hello World" }')
})

app.get('/ready', (req, res) => {
    res.send('{ "response": " Great!, It works!" }')
})

app.listen(process.env.PORT || 3000)
module.exports = app