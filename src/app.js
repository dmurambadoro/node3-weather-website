const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Sets handlebars engine and views location
app.set('view engine', 'hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //way to customize the server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'The King'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For help please contact me',
        title: 'Help',
        name: 'The King'
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'The King'
    })
})

app.get('/weather', (req, res) => {  //using an object
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
            return res.send({error: error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'The King',
        errorMessage: 'Help article not found'
        })
})

app.get('*', (req, res) => { // * means match anything that hasn't been matched so far
    res.render('404', {
        title: '404',
        name: 'The King',
        errorMessage: 'Page not found'
    })
})
//starts the server; 3000 is the development port
app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})  
