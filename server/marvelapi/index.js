const
     config = require('./config'),
     superagent = require('superagent')

const ts ='1'
const apikey = '84e3724042b71f9fe7a8456a11068da3'
const hash = '7581c5870f9020b12ea7ec3c3c454c69'


const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}?ts=${ts}&apikey=${apikey}&hash=${hash}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

const _fetchbyname = (command,specialname) => {
    return superagent.get(`${config.url}/${command}?ts=${ts}&apikey=${apikey}&hash=${hash}&name=${specialname}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.getcharacterbyname = (charcatername) => {
        return _fetchbyname('v1/public/characters',charcatername)
}

exports.getcomicsbyid = (id) => {
    return _fetch(`v1/public/comics/${id}`)
}

exports.geteventsbyid = (id) => {
    return _fetch(`v1/public/events/${id}`)
}

exports.getSeriesById = (id) => {
    return _fetch(`v1/public/series/${id}`)
}



//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=84e3724042b71f9fe7a8456a11068da3&hash=7581c5870f9020b12ea7ec3c3c454c69
//public key :84e3724042b71f9fe7a8456a11068da3
//private key: 96f392916eb4bdfb4f9175b03dfa8366f97f4d5d
