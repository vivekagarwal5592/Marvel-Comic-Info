const
    marvel = require('marvelapi'),
    inquirer = require('inquirer')
let Radio = require('prompt-radio');

const start = (commandArgv)=>{
    //console.log(commandArgv)
    if (commandArgv.id==null){
    //  console.log(" i am at id")
        marvel.stories()
        .then(result=>{

          if(result.code!=200){
              console.log("Sorry ! No Data Available")
          }
          else{

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
          }

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

       if(result.code!=200){
              console.log("Sorry ! No Data Available")
          }
          else{
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
       choices(storyId)
    }

     

  	})

}

getCharacters =(storyId) =>{

    marvel.getCharacterByStory(storyId)
    .then(result=>{
        if(result.code!=200){
              console.log("\n\n Sorry !No data available")
          }
          else{
            //console.log(result)
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
            choices(storyId)
          }
    })
    .catch(error=>{
        console.log("Cannot Read data from API")
    })
}

getComics = (storyId) =>{

  marvel.getComicsByStory(storyId)
  .then(result=>{
        if(result.code!=200){
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
          choices(storyId)
        }
  })
}

getCreators =(storyId) =>{

  marvel.getCreatorsByStory(storyId)
  .then(result=>{
     if(result.status!=200){
              console.log("Sorry ! No Data Available")
          }
          else{
    result.data.results.forEach(res=>{
      console.log(`FullName:${res.fullName}`)

      res.urls.forEach(url=>{
        console.log(`URL:${url.url}`)
      })

      console.log()
    });
    choices(storyId)
  }
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
      choices(storyId)
    }
  })

}

getEvents= (storyId) =>{
  marvel.getEventsByStory(storyId)
  .then(result=>{

    if(result.code!=200){
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
      choices(storyId)
    }
  })

}


choices =(id) =>{
  //console.log("i am here")
	if(id== null)
	{

	}
	else {
		prompt2.run()

			.then(answer=> {
				if(answer[0] == '1'){

          inquirer.prompt([{
              type: 'input',
              name: 'answer',
              message: `Enter the character id`,
              filter: (input) => {
                  return parseInt(input)
              }
          }]).then((input) => {
              marvel.getStoriesByType(input.answer,'characters')
              .then(result=>{
                displayStory(result)
              })
          })

				}
				else if(answer[0] == '2'){
          inquirer.prompt([{
              type: 'input',
              name: 'answer',
              message: `Enter the Comic id`,
              filter: (input) => {
                  return parseInt(input)
              }
          }]).then((input) => {
            marvel.getStoriesByType(input.answer,'comics')
            .then(result=>{
              displayStory(result)
            })
          })
				}
				else if(answer[0] == '3'){
          inquirer.prompt([{
              type: 'input',
              name: 'answer',
              message: `Enter the Series id`,
              filter: (input) => {
                  return parseInt(input)
              }
          }]).then((input) => {
            marvel.getStoriesByType(input.answer,'series')
            .then(result=>{
              displayStory(result)
            })
          })
				}
				else if(answer[0] == '4'){
          inquirer.prompt([{
              type: 'input',
              name: 'answer',
              message: `Enter the Event id`,
              filter: (input) => {
                  return parseInt(input)
              }
          }]).then((input) => {
            marvel.getStoriesByType(input.answer,'events')
            .then(result=>{
              displayStory(result)
            })
          })
				}
        else if(answer[0] == '5'){
          inquirer.prompt([{
              type: 'input',
              name: 'answer',
              message: `Enter the Creator id`,
              filter: (input) => {
                  return parseInt(input)
              }
          }]).then((input) => {
            marvel.getStoriesByType(input.answer,'creators')
            .then(result=>{
              displayStory(result)
            })
          })
        }


			});
	}

}

displayStory =(result) =>{

  if (result.data.results.length==0){
    console.log(" Sorry ! No data avaliable for this id!!")
  }

  result.data.results.forEach(res=>{
    console.log(`Story Id : ${res.id}`)
    console.log(`Story Title: ${res.title}`)
    if(res.description != '' && res.description != null){
      console.log(`Story Description:${res.description}`)
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


}
  let prompt2 = new Radio({
  	name: 'colors',
  	message: 'Get the stories based on below parameters:',
  	choices: [
  	'1.Fetch Stories by Character Id',
  	'2.Fetch Stories by Comic Id',
    '3.Fetch Stories by Series Id',
    '4.Fetch Stories by Events Id',
    '5.Fetch Stories by Creator Id',
    '6.Exit',
  	]
  });


module.exports={

  start
}
