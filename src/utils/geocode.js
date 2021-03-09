const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG11cmFtYmFkb3JvIiwiYSI6ImNrbHFyZ2dqajFmcHAydm1weW0za2ZiOGEifQ.TZR0REIKzFdhDFxkwTOoIg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to locattion services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find locaion. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode