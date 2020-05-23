const request = require('postman-request')

const geocode = (place, callback) =>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiMTBzaW5naHNoaXZhbmkiLCJhIjoiY2thNmFiYXBqMDUwdjMycGs5d3ZsZnlhMiJ9.Snfd6HNN2b8yaeGKQVi03g&limit=1';
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect')
        }else if (body.features.length == 0){
            callback('Unable to find the loaction. Try another search.');
        }
        else{
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;