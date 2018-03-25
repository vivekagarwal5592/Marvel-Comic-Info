const
    marvel = require('marvelapi'),
    inquirer = require('inquirer')


const start = (commandArgv)=>{
    //console.log(commandArgv)
    if (commandArgv.id==null){
    //  console.log(" i am at id")
        marvel.stories()
        .then(result=>{

            result.data.results.forEach(res=>{
              console.log(`Story Id : ${res.id}`)
              console.log(`Story Title: ${res.title}`)
              if(res.description != '' && res.description != null){
                console.log(`Story Description:${items.description}`)
              }
              else{
                console.log(`Story Description:Sorry,No Description is avaible for this story`)
              }
              console.log(`Story Type:${res.type}`)
              console.log("Stories appering in :")
              console.log(`  ->Comics  :${res.comics.available} times`)
              console.log(`  ->Series  :${res.series.available} times`)
              console.log(`  ->Events  :${res.events.available} times ` )
              console.log()
              console.log(`Number of Characters appear in this story   :${res.characters.available}`)
              console.log(`Number of Creators who worked for this story:${res.creators.available}`)
              console.log(`Originally published in :${res.originalIssue.name}`)

              console.log("-----------------------------------------------------------------------------------\n\n")
            })

        })

    }
    else if(commandArgv.id!=null){

      if(commandArgv.characters){
          getCharacters(commandArgv.id)
      }
      else if(commandArgv.comics){
        getComics(commandArgv.id)
      }
      else if(commandArgv.creators){
        getCreators(commandArgv.id)
      }
      else if(commandArgv.events){
        getEvents(commandArgv.id)
      }
      else if(commandArgv.series){
        getSeries(commandArgv.id)
      }
      else{
          //console.log(" i am here")
        getStoriesById(commandArgv.id)
      }

    }
}
getStoriesById=(storyId)=>{


    marvel.getStoriesById(storyId)
    .then(result=>{
      result.data.results.forEach(res=>{
        console.log(`Story Id : ${res.id}`)
        console.log(`Story Title: ${res.title}`)
        if(res.description != '' && res.description != null){
          console.log(`Story Description:${items.description}`)
        }
        else{
          console.log(`Story Description:Sorry,No Description is avaible for this story`)
        }
        console.log(`Story Type:${res.type}`)
        console.log("Stories appering in :")
        console.log(`  ->Comics  :${res.comics.available} times`)
        console.log(`  ->Series  :${res.series.available} times`)
        console.log(`  ->Events  :${res.events.available} times ` )
        console.log()
        console.log(`Number of Characters appear in this story   :${res.characters.available}`)
        console.log(`Number of Creators who worked for this story:${res.creators.available}`)
        console.log(`Originally published in :${res.originalIssue.name}`)

        console.log("-----------------------------------------------------------------------------------\n\n")
      })

  	})

}

getCharacters =(storyId) =>{

    marvel.getCharacterByStory(storyId)
    .then(result=>{
        console.log(result)
          if(result.data.results.length==0){
              console.log("\n\n Sorry !No data available")
          }
          else{
            console.log(result)
            result.data.results.forEach(res=>{

              console.log(`Character Id:${res.id}`)
              console.log(`Character title: ${res.name}`)
              if(res.description != '' && res.description != null  ){
                console.log(`Description:${res.description}`)
              }
              else{
                console.log(`Description: Sorry! No Description available`)
              }

              res.urls.forEach(url=>{
                console.log(`URL:${url.url}`)
              })

              console.log()
            });
          }
    })
    .catch(error=>{
        console.log("Cannot Read data from API")
    })
}

getComics = (storyId) =>{

  marvel.getComicsByStory(storyId)
  .then(result=>{
        if(result.data.results.length==0){
            console.log("\n\n Sorry !No data available")
        }
        else{

          result.data.results.forEach(res=>{

            console.log(`Comic Id:${res.id}`)
            console.log(`Comic title: ${res.title}`)
            if(res.description != '' && res.description != null  ){
              console.log(`Comic Description:${res.description}`)
            }
            else{
              console.log(`Comic Description: Sorry! No Description available`)
            }

            res.urls.forEach(url=>{
              console.log(`URL:${url.url}`)
            })

            console.log()
          });
        }
  })
}

getCreators =(storyId) =>{

  marvel.getCreatorsByStory(storyId)
  .then(result=>{
    console.log()
    result.data.results.forEach(res=>{
      console.log(`FullName:${res.fullName}`)

      res.urls.forEach(url=>{
        console.log(`URL:${url.url}`)
      })

      console.log()
    });
  })
}

getSeries =(storyId)=>{
  marvel.getSeriesByStory(storyId)
  .then(result=>{

    if(result.data.results.length ==0){
      console.log("Sorry! No results")
    }
    else{
      result.data.results.forEach(res=>{

        console.log(`Series Id:${res.id}`)
        console.log(`Series title: ${res.title}`)
        if(res.description != '' && res.description != null  ){
          console.log(`Description:${res.description}`)
        }
        else{
          console.log(`Description: Sorry! No Description available`)
        }

        res.urls.forEach(url=>{
          console.log(`URL:${url.url}`)
        })

        console.log(`Series Start Year :${res.startYear}`)
        console.log(`Series End year:${res.endYear}`)

        console.log()
      });
    }
  })

}

getEvents= (storyId) =>{
  marvel.getEventsByStory(storyId)
  .then(result=>{

    if(result.data.results.length ==0){
      console.log("Sorry! No results")
    }
    else{
      result.data.results.forEach(res=>{

        console.log(`Event Id:${res.id}`)
        console.log(`Event title: ${res.title}`)
        if(res.description != '' && res.description != null  ){
          console.log(`Story:${res.description}`)
        }
        else{
          console.log(`About the Comic: Sorry! No Description available`)
        }

        res.urls.forEach(url=>{
          console.log(`URL:${url.url}`)
        })

        console.log()
      });
    }
  })

}


  /*  select =(storyId) =>{

    	object = {}

    	prompt.run().then(answer=> {
    		object.choice = answer[0]
    }).then((choice)=>{
    	Inquirer.prompt(questions)
    	.then((ans)=>{
    		object.storyId = ans;

    	if(object.choice = '1'){

    getcharacters(object.storyId.answer)
    }
    else if(object.choice = '2'){
    	object.choice = 2
    getcreators(object.storyId.answer)
    }
    else if(object.choice = '3'){
    	object.choice = 3
    getstories(object.storyId.answer)
    }
    else if(object.choice = '4'){
    	object.choice = 4
    getevents(object.storyId.answer)
    }
    console.log(object)

    	})
    });

  }*/



module.exports={

  start
}
