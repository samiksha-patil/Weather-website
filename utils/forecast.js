const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/75e863a263cb29cd4383da63edfa692f/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service ', undefined)

        }
        else if (response.body.error) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degree celsius . There are ' + response.body.currently.precipProbability + '% chances of rain')
        }
    })

}

module.exports=forecast