const request = require('postman-request')

const forecast = (longitude, latitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=8daec6bd66fb1646a711870d20ce7eae&query='+ latitude +','+ longitude +'&units=f';

    request({url, json: true}, (err, res, body) => {
        if(err)
        {
            callback('Unable to connect.')
        }
        else if(body.error){
            callback('Unable to find location' + body.error.info)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature  +' degree out. It feels like ' + body.current.feelslike + ' degree out with humidity of '+ body.current.humidity + " %");
        }
    })
}

module.exports = forecast;