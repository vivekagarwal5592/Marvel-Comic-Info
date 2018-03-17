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

//Fetches lists of comic characters with optional filters. See notes on individual parameters below.
exports.characters = () => {
        return _fetch('v1/public/characters')  
}

exports.getcharacterbyname = (charcatername) => {
        return _fetchbyname('v1/public/characters',charcatername)
}

exports.getcharacterbyid = (id) => {
    return _fetch(`v1/public/characters/${id}`)
}

exports.getcharacterbycomic = (id) => {
    return _fetch(`v1/public/characters/${id}/comics`)
}

exports.getcharacterbyevent = (id) => {
    return _fetch(`v1/public/characters/${id}/events`)
}

exports.getcharacterbyseries = (id) => {
    return _fetch(`v1/public/characters/${id}/series`)
}

exports.getcharacterbystories = (id) => {
    return _fetch(`v1/public/characters/${id}/stories`)
}




exports.comics = () => {
        return _fetch('v1/public/comics') 
}

exports.getcomicbyname = (comicname) => {
        return _fetchbyname('v1/public/comics',comicname)
}

exports.getcomicbyid = (id) => {
    return _fetch(`v1/public/comics/${id}`)
}

exports.getcomicbycharacter = (id) => {
    return _fetch(`v1/public/comics/${id}/characters`)
}

exports.getcomicbyevent = (id) => {
    return _fetch(`v1/public/comics/${id}/events`)
}

exports.getcomicbyseries = (id) => {
    return _fetch(`v1/public/comics/${id}/series`)
}

exports.getcomicbystories = (id) => {
    return _fetch(`v1/public/comics/${id}/stories`)
}



























//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=84e3724042b71f9fe7a8456a11068da3&hash=7581c5870f9020b12ea7ec3c3c454c69
//public key :84e3724042b71f9fe7a8456a11068da3
//private key: 96f392916eb4bdfb4f9175b03dfa8366f97f4d5d