const
    comicapplication = require('./comicapplication'),
    characterapplication = require('./characterapplication'),
    storiesapplication = require('./storiesapplication'),
    Creator=require('./Creator'),
    // Requires eventsapp.js to call init/start function for events command.
    eventsapp = require('./eventsapp'),
    // Requires seriesapp.js to call init/start function for series command.
    seriesapp = require('./seriesapp'),
    yargs = require('yargs');

const flags = yargs.usage('$0: Usage <cmd> [options]')
.command({
    command:'characters',
    desc: 'Fetches lists of comic characters',
    builder: (yargs) => {
        return yargs
        .option('characterid', {
            alias:'id',
            describe: 'This method fetches a single character resource.',

            default: null
        })
         .option('charactername', {
            alias:'name',
            describe: 'This method fetches a single character resource by name.',
            default: null
        })
        .option('comics', {
            alias:'c',
            describe: 'Fetches lists of comics containing a specific character.Need to be used along with id',
             type:'boolean',
        default: false
 })
         .option('events', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'e',
          type:'boolean',
          default: false
    })
       .option('series', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'s',
         type:'boolean',
          default: false
    })
         .option('stories', {
        describe: 'Fetches lists of events in which a specific character appears, with optional filters.Need to be used along with id',
         alias:'st',
         type:'boolean',
          default: false
    })
    },
    handler: (argv) => { characterapplication.run(argv) }
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
         .option('title', {
            alias:'t',
            describe: 'This method fetches a single comic resource.',
            default: null
        })

    },
    handler: (argv) => { comicapplication.run(argv) }
})

.command({
    command:'creators',
    desc: 'Fetches lists of creators',
    builder: (yargs) => {
        return yargs
        .option('creatorsid', {
            alias:'id',
            describe: 'This method fetches a single record for the creator.',
            default: null
        })
        .option('creator_name', {
            alias:'name',
            describe: 'Fetches specific creators Record.' ,
            default: null
        })
        .option('comics', {
            alias:'comic',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
            default: false,
            type:'boolean'
        })
    },
    handler: (argv) => {
        Creator.run(argv)
      }
})

.command({
    command: 'stories',
    desc: 'Fetches lists of Stories',
    builder: (yargs) => {
        return yargs
        .option('storiesid', {
            alias:'id',
            describe: 'This method fetches a single comic resource.',
            default: null
        })
        .option('characters', {
            alias:'char',
            describe: 'Fetches lists of characters which appear in a specific stories. Needs to be used in conjuction with stories id',
            type:'boolean',
            default: false
        })
        .option('comics', {
            alias:'comic',
            describe: 'Fetches lists of comics which appear in a specific stories. Needs to be used in conjuction with stories id',
            type:'boolean',
            default: false
        })
        .option('creators', {
            alias:'creator',
            describe: 'Fetches lists of creators whose work appear in a specific story. Needs to be used in conjuction with stories id',
            type:'boolean',
            default: false
        })
        .option('events', {
            alias:'e',
            describe: 'Fetches lists of events which appear in a specific stories. Needs to be used in conjuction with stories id',
            type:'boolean',
            default: false
        })
        .option('series', {
            alias:'s',
            describe: 'Fetches lists of comic series in which the specified story takes place. Needs to be used in conjuction with stories id',
            type:'boolean',
            default: false
        })
    },
    handler: (argv) => {  storiesapplication.start(argv) }
})

// Command: events
//              - To play around events api of marvel.   
// Calls  : eventsapp.run()
.command({
    command: 'events',
    desc: 'Fetches lists of events.',
    builder: (yargs) => {
        return yargs
            .option('name', {
                alias: 'n',
                describe: 'Fetches a single event resource with specified name.',
                type: 'string',
                default: null
            })
            .option('eventid', {
                alias:'id',
                describe: 'This method fetches a single event resource with specified ID.',
                default: null
            })
            .option('characters', {
                alias:'ch',
                describe: 'Fetches lists of characters which appear in a specific event. Needs to be used in conjuction with event id',
                type:'boolean',
                default: false
            })
            .option('comics', {
                alias:'co',
                describe: 'Fetches lists of comics which appear in a specific event. Needs to be used in conjuction with event id',
                type:'boolean',
                default: false
            })
            .option('creators', {
                alias:'cr',
                describe: 'Fetches lists of creators which appear in a specific event. Needs to be used in conjuction with event id',
                type:'boolean',
                default: false
            })
            .option('series', {
                alias:'se',
                describe: 'Fetches lists of series which appear in a specific event. Needs to be used in conjuction with event id',
                type:'boolean',
                default: false
            })
            .option('stories', {
                alias:'st',
                describe: 'Fetches lists of stories which appear in a specific event. Needs to be used in conjuction with event id',
                type:'boolean',
                default: false
            })
    },
    handler: (argv) => {  eventsapp.run(argv) }
})

// Command: series
//              - To play around series api of marvel.   
// Calls  : seriesapp.run()
.command({
    command: 'series',
    desc: 'Fetches lists of series.',
    builder: (yargs) => {
        return yargs
            .option('name', {
                alias: 'n',
                describe: 'Fetches a single series resource with specified name.',
                type: 'string',
                default: null
            })
            .option('seriesid', {
                alias:'id',
                describe: 'This method fetches a single series resource with specified ID.',
                default: null
            })
            .option('characters', {
                alias:'ch',
                describe: 'Fetches lists of characters which appear in a specific series. Needs to be used in conjuction with series id',
                type:'boolean',
                default: false
            })
            .option('comics', {
                alias:'co',
                describe: 'Fetches lists of comics which appear in a specific series. Needs to be used in conjuction with series id',
                type:'boolean',
                default: false
            })
            .option('creators', {
                alias:'cr',
                describe: 'Fetches lists of creators which appear in a specific series. Needs to be used in conjuction with series id',
                type:'boolean',
                default: false
            })
            .option('events', {
                alias:'ev',
                describe: 'Fetches lists of events which appear in a specific series. Needs to be used in conjuction with series id',
                type:'boolean',
                default: false
            })
            .option('stories', {
                alias:'st',
                describe: 'Fetches lists of stories which appear in a specific series. Needs to be used in conjuction with series id',
                type:'boolean',
                default: false
            })
    },
    handler: (argv) => {  seriesapp.run(argv) }
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
