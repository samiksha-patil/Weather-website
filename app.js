const path = require('path')
const express = require('express')

const port =process.env.PORT ||3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '/public'))


const app = express()
const publicDir = path.join(__dirname, '/public')

app.set('view engine','hbs')
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sakshi and Samiksha'
    })

}) 



app.get('/help/*', (req, res) => {
    res.render('404',)
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})
    
    
   /* res.send({
        forecast: 'Your weather',
        
       address: req.query.address
        })
})

*/


app.listen(port, () => {
    console.log('Serve is up on port'+port)
})