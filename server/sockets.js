
api = require('./marvelapi/index.js')

const _findUser = (users, name) => {
    return users.find(user => {
        return user.name.toLowerCase() === name.toLowerCase()
    })
}

module.exports = (server) => {
    const
        io = require('socket.io')(server),
        moment = require('moment')

    let
        users = [],
        messages = []

    io.on('connection', socket => {
        // when a connection is made - load in the content already present on the server
        socket.emit('refresh-messages', messages)
        socket.emit('refresh-users', users)

        socket.on('get-character-info',charactername=>{

          api.getcharacterbyname(charactername).then(result=>{

            io.emit('found-character-info',result)

          })

        })


        socket.on('join-user', userName => {
            const found = _findUser(users, userName)

            if (found)
                return io.emit('failed-join', userName)

            const user = {
                id: socket.id,
                name: userName,
                avatar: `https://robohash.org/${userName}?set=set3`
            }
            users.push(user)

            io.emit('successful-join', user)
        })

        socket.on('send-message', data => {
            const content = {
                user: data.user,
                message: data.message,
                date: moment(new Date()).format('MM/DD/YY h:mm a')
            }
            messages.push(content)

            io.emit('successful-message', content)
        })

        socket.on('disconnect', () => {
            users = users.filter(user => {
                return user.id != socket.id
            })

            io.emit('refresh-users', users)
        })
    })
}
