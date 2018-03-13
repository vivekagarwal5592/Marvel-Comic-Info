const
     config = require('./config'),
     superagent = require('superagent')


const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}?apikey=84e3724042b71f9fe7a8456a11068da3`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

//Fetches lists of comic characters with optional filters. See notes on individual parameters below.
exports.characters = () => {
        return _fetch('v1/public/characters')
   
}

exports.getcharacterbyid = (id) => {
    return _fetch(`v1/public/characters/${id}`)
}




//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=84e3724042b71f9fe7a8456a11068da3&hash=7581c5870f9020b12ea7ec3c3c454c69


//public key :84e3724042b71f9fe7a8456a11068da3

//private key: 96f392916eb4bdfb4f9175b03dfa8366f97f4d5d