const
    // Required to get the configurations for api.
     config = require('./config'),
     // Required to request the api URL.
     superagent = require('superagent')

// Uses get method to call api, and returns either body on success or error.
const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}?ts=${config.timestamp}&apikey=${config.public_key}&hash=${config.auth_hash}`)
        .then( (response) => response.body )
        .catch( (error) => error.response.body )
}

// Uses get method to call api, and returns either body on success or error.
const _fetchByName = (command) => {
    console.log(`${config.url}/${command}&ts=${config.timestamp}&apikey=${config.public_key}&hash=${config.auth_hash}`)
    return superagent.get(`${config.url}/${command}&ts=${config.timestamp}&apikey=${config.public_key}&hash=${config.auth_hash}`)
        .then( (response) => response.body )
        .catch( (error) => error.response.body )
}

//Fetches lists of events.
exports.events = () => {
    return _fetch('events')
}

exports.getEventsByName = (eventName) => {
    return _fetchByName(`events?name=${eventName}`)
}

exports.getEventById = (id) => {
    return _fetch(`events/${id}`)
}

exports.getEventByIdCharacters = (id) => {
    return _fetch(`events/${id}/characters`)
}

exports.getEventByIdComics = (id) => {
    return _fetch(`events/${id}/comics`)
}

exports.getEventByIdCreators = (id) => {
    return _fetch(`events/${id}/creators`)
}

exports.getEventByIdSeries = (id) => {
    return _fetch(`events/${id}/series`)
}

exports.getEventByIdStories = (id) => {
    return _fetch(`events/${id}/stories`)
}


// Fetches lists of series.
exports.series = () => {
    return _fetch('series')
}

exports.getSeriesByName = (serieName) => {
    return _fetchByName(`series?name=${serieName}`)
}

exports.getSeriesById = (id) => {
    return _fetch(`series/${id}`)
}

exports.getSeriesByIdCharacters = (id) => {
    return _fetch(`series/${id}/characters`)
}

exports.getSeriesByIdComics = (id) => {
    return _fetch(`series/${id}/comics`)
}

exports.getSeriesByIdCreators = (id) => {
    return _fetch(`series/${id}/creators`)
}

exports.getSeriesByIdEvents = (id) => {
    return _fetch(`series/${id}/events`)
}

exports.getSeriesByIdStories = (id) => {
    return _fetch(`series/${id}/stories`)
}