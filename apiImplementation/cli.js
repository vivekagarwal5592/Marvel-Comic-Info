const
comicapplication = require('./comicapplication'),
characterapplication = require('./characterapplication'),
<<<<<<< HEAD
//Creator=require('./Creator')
=======
storiesapplication = require('./storiesapplication')
Creator=require('./Creator')
>>>>>>> 607ea451c633c51a02948747c6926e78d135e509
yargs = require('yargs')

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
        default: false
 })
          .option('series', {
            alias:'series',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
        default: false
 })
           .option('stories', {
            alias:'story',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
       default: false
 })
    },
    handler: (argv) => {
      if(argv.story === true)
      {
        Creator.getcreator_stories(argv.id)
      }
      else {
        Creator.run(argv)
      }
       }
})
.command({
    command: 'events',
    desc: 'Fetches lists of crators',
    builder: (yargs) => {
        return yargs
        .option('yargsid', {
            alias:'id',
            describe: 'This method fetches a single comic resource.',
            default: null
        })
        .option('characters', {
            alias:'char',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
            type:'boolean',
        default: false
 })
         .option('comics', {
            alias:'comic',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
            type:'boolean',
        default: false
 })
          .option('creators', {
            alias:'creator',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
            type:'boolean',
        default: false
 })
           .option('stories', {
            alias:'s',
            describe: 'Fetches lists of characters which appear in a specific creators. Needs to be used in conjuction with creators id',
            type:'boolean',
       default: false
 })
    },
    handler: (argv) => {  comicapplication.run(argv) }
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
