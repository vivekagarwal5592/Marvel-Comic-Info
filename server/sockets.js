api = require('./marvelapi/index.js')

module.exports = (server) => {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    socket.on('get-character-info',charactername=>{
      api.getcharacterbyname(charactername).then(result=>{
        io.emit('found-character-info',result)
      })
    })
  })
}
