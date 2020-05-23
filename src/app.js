const path = require('path');
const express = require('express');
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const http = require('http');

//Define path for express config
const pathName = path.join(__dirname, '../public')
// if view folder is change to template : 
const viewpath = path.join(__dirname, '../templates/view')
const partialPath = path.join(__dirname, '../templates/partial')

//setup handlebar location and view
app.set('view engine', 'hbs' )
app.set('views', viewpath)
hbs.registerPafrtials(partialPath)

//static data to serve
app.use(express.static(pathName))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Home Page',
        name : 'shivani singh'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        name: 'shiavni',
        title: 'About'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {message : "What are your queries. Please provide us fir better understanding."})
})

app.get('/weather',(req, res) => {
    if(!req.query.address)
    {
        return res.send({
            Error : 'address query parameter required'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error)
        {
            return res.send({
                Error : error
            })
        }

        forecast(longitude, latitude, (error, data) => {
            if(error)
            {
                return res.send({
                    Error : error
                })
            }
            res.send({
                forcat : data,
                location,
                address : req.query.address
            });

        })
    });
})

app.get('/products',(req, res) => {
    if(!req.query.name)
    {
        return res.send({
            error : 'name query string is required'
        })
    }
    res.send({
        product : []
    });
})

app.get('/help/*', (req, res) => {
    res.render('Error',{
        title : "404 Page",
        name : "shivani singh",
        message : 'help artical not found'
    })
})

app.get('*',(req,res) => {
    res.render('Error',{
        title : "404 Page",
        name : "shivani singh",
        message : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("Server is upto 3000 port.")
})