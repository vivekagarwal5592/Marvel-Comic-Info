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


const _fetchbyfirstname = (command,specialname) => {
    return superagent.get(`${config.url}/${command}?ts=${ts}&apikey=${apikey}&hash=${hash}&firstName=${specialname}`)
    .then(response => response.body)
    .catch(error => error.response.body)
}

const _fetchbytitle = (command,specialname) => {
    return superagent.get(`${config.url}/${command}?ts=${ts}&apikey=${apikey}&hash=${hash}&title=${specialname}`)

        .then(response => response.body)
        .catch(error => error.response.body)
}

const _fetchbyparameter = (command,parameter,id) =>{

  return superagent.get(`${config.url}/${command}?ts=${ts}&apikey=${apikey}&hash=${hash}&${parameter}=${id}`)

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

exports.getcomicbytitle = (title) => {
        return _fetchbytitle('v1/public/comics',title)
}

exports.getcomicsbyid = (id) => {
    return _fetch(`v1/public/comics/${id}`)
}

exports.getcomicsbycharacter = (id) => {
	console.log(id)
    return _fetch(`v1/public/comics/${id}/characters`)
}

exports.getcomicsbycreators = (id) => {
    return _fetch(`v1/public/comics/${id}/creators`)
}

exports.getcomicsbystories = (id) => {
    return _fetch(`v1/public/comics/${id}/stories`)
}


exports.getcomicsbyevent = (id) => {
    return _fetch(`v1/public/comics/${id}/events`)
}


// All the functions of Comics Creators

//This will fetch all the name of the creator and number of comics ,series,stories and events that creators have.
exports.getcreator=()=>
{
  return _fetch('v1/public/creators')
}

// To fetch the particular creator by id
exports.getcreatorbyid =(id) => {
    return _fetch(`v1/public/creators/${id}`)
}

// Addtional method to fetch the particular creator by name
exports.getcreatorbyname =(creatorname) =>{
  return _fetchbyfirstname('v1/public/creators',creatorname)
}

// Fetches lists of comics in which the work of a specific creator appears

exports.getcreatorbycomics =(id)=>{

  return _fetch(`v1/public/creators/${id}/comics`)
  }

// Fetches lists of events featuring the work of a specific creator
  exports.getcreatorbyevents =(id)=>{

    return _fetch(`v1/public/creators/${id}/events`)
  }

  //Fetches lists of comic series in which a specific creator's work appears
exports.getcreatorbyseries=(id)=>{
return _fetch(`v1/public/creators/${id}/series`)
}

//Fetches lists of comic stories by a specific creator
exports.getcreatorbystories=(id)=>{

    return _fetch(`v1/public/creators/${id}/stories`)



}

// Function Module that will fetch Marvel Stories

//Get all the stories with story id,story desc.
exports.stories=()=>
{
  return _fetch('v1/public/stories')
}

//Get the particular Story by id
exports.getStoriesById =(id) => {
    return _fetch(`v1/public/stories/${id}`)
}

// Get List of Characters by Stories
exports.getCharacterByStory =(id) =>{
  return _fetch(`v1/public/${id}/character`)
}

// Get list of Comics by Story

exports.getComicsByStory =(id)=>{

  return _fetch(`v1/public/stories/${id}/comics`)
  }

// Get list of Events by Story
  exports.getEventsByStory =(id)=>{

    return _fetch(`v1/public/stories/${id}/events`)
  }

  //Get list of Series by Story
exports.getSeriesByStory=(id)=>{
return _fetch(`v1/public/stores/${id}/series`)
}

//Get list of creators by story
exports.getCreatorsByStory=(id)=>{

    return _fetch(`v1/public/stories/${id}/creators`)

}
// Get list of stories by type(eg: characterid,comicid,seriesid)
exports.getStoriesByType =(id,type)=>{

      return _fetchbyparameter(`v1/public/stories`,type,id)
}


// Fetch the lists of all events.
// or, fetch a specific event by id, name.
// Look for characters, stories... in a specific event.
exports.events = () => {
    return _fetch('v1/public/events')
}

exports.getEventsByName = (eventName) => {
    return _fetchbyname('v1/public/events',eventName)
}

exports.geteventsbyid = (id) => {
    return _fetch(`v1/public/events/${id}`)
}

exports.getEventByIdCharacters = (id) => {
    return _fetch(`v1/public/events/${id}/characters`)
}

exports.getEventByIdComics = (id) => {
    return _fetch(`v1/public/events/${id}/comics`)
}

exports.getEventByIdCreators = (id) => {
    return _fetch(`v1/public/events/${id}/creators`)
}

exports.getEventByIdSeries = (id) => {
    return _fetch(`v1/public/events/${id}/series`)
}

exports.getEventByIdStories = (id) => {
    return _fetch(`v1/public/events/${id}/stories`)
}


// Fetch the lists of all series.
// or, fetch a specific series by id, name.
// Look for characters, stories... in a specific series.
exports.series = () => {
    return _fetch('v1/public/series')
}

exports.getSeriesByName = (serieName) => {
    return _fetchbyname(`v1/public/series`, serieName)
}

exports.getSeriesById = (id) => {
    return _fetch(`v1/public/series/${id}`)
}

exports.getSeriesByIdCharacters = (id) => {
    return _fetch(`v1/public/series/${id}/characters`)
}

exports.getSeriesByIdComics = (id) => {
    return _fetch(`v1/public/series/${id}/comics`)
}

exports.getSeriesByIdCreators = (id) => {z
    return _fetch(`v1/public/series/${id}/creators`)
}

exports.getSeriesByIdEvents = (id) => {
    return _fetch(`v1/public/series/${id}/events`)
}

exports.getSeriesByIdStories = (id) => {
    return _fetch(`v1/public/series/${id}/stories`)
}

//https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=84e3724042b71f9fe7a8456a11068da3&hash=7581c5870f9020b12ea7ec3c3c454c69
//public key :84e3724042b71f9fe7a8456a11068da3
//private key: 96f392916eb4bdfb4f9175b03dfa8366f97f4d5d
