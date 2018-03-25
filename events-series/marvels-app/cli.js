const
    // Requires eventsapp.js to call init/start function for events command.
    eventsapp = require('./eventsapp'),
    // Requires seriesapp.js to call init/start function for series command.
    seriesapp = require('./seriesapp'),
    // Requires yargs module to parse command line arguments and/or commands elegantly.
    yargs = require('yargs')

// Creating commands for node module.
const flags = yargs.usage('$0: Usage <cmd> [options]')
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