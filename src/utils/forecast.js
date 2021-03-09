const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6fd8e8dea64d70d5188afdaf92c26186&query=' + latitude +  ',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {  //instead of url: url

        if(error) {
            callback("Unable to connect to a weather service!", undefined)
        } else if(body.error) {
            callback("Unable to find location", undefined)
        } else {
            //callback(undefined, response.body.daily.data[0].summary + " It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " though!")
            callback(undefined, " It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " though!")

        }
})
}

module.exports = forecast