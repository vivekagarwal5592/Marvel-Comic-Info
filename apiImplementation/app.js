const
application = require('./application'),
yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
.command({
    command: 'characters',
    desc: 'Fetches lists of comic characters',
    builder: (yargs) => {
        return yargs
        .option('characterid', {
            alias:'id',
            describe: 'This method fetches a single character resource.',
            default: null
        })
        .option('comics', {
            alias:'c',
            describe: 'Fetches lists of comics containing a specific character.Need to be used along with id',
        default: false
 })
         .option('events', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'e',
          default: false
    })
       .option('series', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'s',
          default: false
    })
         .option('stories', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'st',
          default: false
    })
    },
    handler: (argv) => { application.run(argv) }
})

.command({
    command: 'comics',
    desc: 'Fetches lists of comics',
    builder: (yargs) => {
        return yargs
        .option('comicid', {
            alias:'id',
            describe: 'This method fetches a single comic resource.',
            default: null
        })
        .option('characters', {
            alias:'char',
            describe: 'Fetches lists of characters which appear in a specific comic. Needs to be used in conjuction with comic id',
        default: false
 })
         .option('creators', {
            alias:'creator',
            describe: 'Fetches lists of characters which appear in a specific comic. Needs to be used in conjuction with comic id',
        default: false
 })
          .option('events', {
            alias:'e',
            describe: 'Fetches lists of characters which appear in a specific comic. Needs to be used in conjuction with comic id',
        default: false
 })
           .option('stories', {
            alias:'s',
            describe: 'Fetches lists of characters which appear in a specific comic. Needs to be used in conjuction with comic id',
       default: false
 })
    },
    handler: (argv) => { application.run(argv) }
})
.help('help')
.argv




  /*  .options('characters', {
        alias: 'char',
        describe: 'Fetches lists of comic characters',
    //    default: ['+']
    })
    .options('id', {
        describe: 'This method fetches a single character resource.',
        default: null
    })
    .options('comics', {
        describe: 'Fetches lists of comics containing a specific character.Need to be used along with id',
        default: false
    })
     .options('events', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
        default: false
    })
       .options('series', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
        default: false
    })
         .options('stories', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
        default: false
    })
    .help()
    .argv

application.run(flags)*/