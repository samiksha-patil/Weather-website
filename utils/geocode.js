const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Frc2hpc2FtaSIsImEiOiJjazQwejE4OHgwNmdsM3Bwb2kxOWM5YzB1In0.c8XGOOSuJOh93FPRKtltng'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect location services', undefined)
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find location.Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
