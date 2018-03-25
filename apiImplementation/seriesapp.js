const
    // Custom module to query external api: marvel.com
    marvels = require('marvelapi'),
    // Required to display radio options.
    Radio = require('prompt-radio');

    getSeriesByIdCreators = (seriesID) => {
        marvels.getSeriesByIdCreators( seriesID )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Creators for Series ID = ${seriesID} is available...`)
                    } else {                    
                        resources.data.results.forEach( (items) => {
                            console.log(`Creators ID: ${items.id}`)
                            console.log(`Creators Name: ${items.fullName}`)
                            console.log()
                        });
                    }
                });
                if ( seriesID == null )
                    giveEventChoices(seriesID);
    }

    getSeriesByIdCharacters = (seriesID) => {
        marvels.getSeriesByIdCharacters( seriesID )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Characters for Series ID = ${seriesID} is available...`)
                    } else {                     
                        resources.data.results.forEach( (items) => {
                            console.log(`Character ID: ${items.id}`)
                            console.log(`Character Name: ${items.name}`)
                            const description = (items.description != '' || items.description != null) ? `Character Description: ${items.description}` : `Character Description: Sorry! No Description available`;
                            console.log(description)
                            console.log()
                        });
                    }
                });
                if ( seriesID == null )
                    giveEventChoices(seriesID);
    }

    getSeriesByIdStories = (seriesID) => {
        marvels.getSeriesByIdStories( seriesID )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Stories for Series ID = ${seriesID} is available...`)
                    } else {                   
                        resources.data.results.forEach( (items) => {
                            console.log(`Stories ID: ${items.id}`)
                            console.log(`Stories Name: ${items.title}`)
                            const description = (items.description != '' || items.description != null) ? `Stories Description: ${items.description}` : `Stories Description: Sorry! No Description available`;
                            console.log(description)
                            console.log()
                        });
                    }
                });
                if ( seriesID == null )
                    giveEventChoices(seriesID);
    }

    getSeriesByIdComics = (seriesID) => {
        marvels.getSeriesByIdComics( seriesID )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Comics for Series ID = ${seriesID} is available...`)
                    } else {                     
                        resources.data.results.forEach( (items) => {
                            console.log(`Comics ID: ${items.id}`)
                            console.log(`Comics Name: ${items.title}`)
                            const description = (items.description != '' || items.description != null) ? `Comics Description: ${items.description}` : `Comics Description: Sorry! No Description available`;
                            console.log(description)
                            console.log()
                        });
                    }
                });
                if ( seriesID == null )
                    giveEventChoices(seriesID);
    }

    getSeriesByIdEvents = (seriesID) => {
        marvels.getSeriesByIdEvents( seriesID )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Events for Series ID = ${seriesID} is available...`)
                    } else {                     
                        resources.data.results.forEach( (items) => {
                            console.log(`Events ID: ${items.id}`)
                            console.log(`Events Name: ${items.title}`)
                            const description = (items.description != '' || items.description != null) ? `Events Description: ${items.description}` : `Events Description: Sorry! No Description available`;
                            console.log(description)
                            console.log()
                        });
                    }
                });
                if ( seriesID == null )
                    giveEventChoices(seriesID);
    }

    giveSeriesChoices = ( seriesID ) => {
        seriesPrompt.run()
                .then( (answer) => {
                    if ( answer[0] == '1' ) getSeriesByIdCreators( seriesID)
                    else if ( answer[0] == '2' ) getSeriesByIdCharacters( seriesID)
                    else if ( answer[0] == '3' ) getSeriesByIdStories( seriesID)
                    else if ( answer[0] == '4' ) getSeriesByIdComics( seriesID)
                    else if ( answer[0] == '5' ) getSeriesByIdEvents( seriesID)
                }) 
    }

    var seriesPrompt = new Radio({
        name: 'seriesCat',
        message: '\nWant to know more about the Series?',
        choices: [
            '1. Appeared in Creators.',
            '2. Appeared in Characters',
            '3. Appeared in Stories',
            '4. Appeared in Comics',
            '5. Appeared in Events',
            '6. Exit\n\n'
        ]
    });
    
module.exports.run = options => {

    if ( options.id == null && options.name == null ) {
        marvels.series()
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log("Sorry, no Series available...")
                    } else {
                        resources.data.results.forEach( (items) => {
                            console.log(`Series ID: ${items.id}`);
                            console.log(`Series Name: ${items.title}`)
                            const description = (items.description != '' || items.description != null) ? `About the Series: ${items.description}` : `About the Series: Sorry! No Description available`;
                            console.log(description);
                            console.log(`Appeared in Creators: ${items.creators.available}`);
                            console.log(`Appeared in Characters: ${items.characters.available}`);
                            console.log(`Appeared in Stories: ${items.stories.available}`)
                            console.log(`Appeared in Comics: ${items.comics.available}`)
                            console.log(`Appeared in Events: ${items.events.available}`)
                            console.log()
                        });
                    }
                });  
    } else if ( options.name != null ) {
        marvels.getSeriesByName( options.name.replace(/ /g, "%20") )
                .then( (resources) => {
                    console.log()
                    if ( resources.code == 404 ) {
                        console.log(`Sorry, no Series with Name=${options.name} is available...`)
                    } else {                    
                        resources.data.results.forEach( (items) => {
                            console.log(`Series ID: ${items.id}`);
                            console.log(`Series Name: ${items.title}`)
                            const description = (items.description != '' || items.description != null) ? `About the Series: ${items.description}` : `About the Series: Sorry! No Description available`;
                            console.log(description);
                            console.log(`Appeared in Creators: ${items.creators.available}`);
                            console.log(`Appeared in Characters: ${items.characters.available}`);
                            console.log(`Appeared in Stories: ${items.stories.available}`)
                            console.log(`Appeared in Comics: ${items.comics.available}`)
                            console.log(`Appeared in Events: ${items.events.available}`)
                            console.log()
                        });
                        return resources.data.results[0].id;
                    }
                })
                .then( (seriesID) => {
                    if ( seriesID != null )
                        giveEventChoices( seriesID);
                })
    } else if ( options.id != null ) {
        if ( !options.creators && !options.characters && !options.stories && !options.comics && !options.events) {
            marvels.getSeriesById(options.id)
                    .then( (resources) => {
                        console.log()
                        if ( resources.code == 404 ) {
                            console.log(`Sorry, no Series with ID=${options.id} is available...`)
                        } else {                     
                            resources.data.results.forEach( (items) => {
                                console.log(`Series ID: ${items.id}`);
                                console.log(`Series Name: ${items.title}`)
                                const description = (items.description != '' || items.description != null) ? `About the Series: ${items.description}` : `About the Series: Sorry! No Description available`;
                                console.log(description);
                                console.log(`Appeared in Creators: ${items.creators.available}`);
                                console.log(`Appeared in Characters: ${items.characters.available}`);
                                console.log(`Appeared in Stories: ${items.stories.available}`)
                                console.log(`Appeared in Comics: ${items.comics.available}`)
                                console.log(`Appeared in Events: ${items.events.available}`)
                                console.log()
                            });
                            return resources.data.results[0].id;
                        }
                    })
                    .then( (seriesID) => {
                        if ( seriesID != null )
                            giveEventChoices( seriesID );
                    })
        }
        if ( options.creators == true ) {
            getSeriesByIdCreators(options.id)
        }
        if ( options.characters == true ) {
            getSeriesByIdCharacters(options.id)
        }
        if ( options.stories == true ) {
            getSeriesByIdStories(options.id)
        }
        if ( options.comics == true ) {
            getSeriesByIdComics(options.id)
        }
        if ( options.events == true ) {
            getSeriesByIdEvents(options.id)
        }
    }

}