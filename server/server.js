const
express = require('express'),
path = require('path')
api = require('./marvelapi/index.js')

const app = express(),
server = require('http').Server(app)

app.use(express.static('../client'))
require('./sockets')(server)

app.get('/characterinfo/:charactername',function(req,res){
  console.log(req.params.charactername)
  api.getcharacterbyname(req.params.charactername).then(result=>{
    res.send(result)
  })
})

app.get('/getcomicsbyid/:comicid',function(req,res){
  api.getcomicsbyid(req.params.comicid).then(result=>{
    console.log(result)
    res.send(result)
  })
})

app.get('/getseriesbyid/:seriesid',function(req,res){
  api.getSeriesById(req.params.seriesid).then(result=>{
    console.log(result)
    res.send(result)
  })
})

app.get('/geteventsbyid/:eventsid',function(req,res){
  api.geteventsbyid(req.params.eventsid).then(result=>{
    console.log(result)
    res.send(result)
  })
})


server.listen(8080)
