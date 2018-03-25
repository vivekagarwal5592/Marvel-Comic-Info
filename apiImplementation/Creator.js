const marvel = require('marvelapi')
var Radio = require('prompt-radio');

module.exports.run = options => {

	// console.log(options)
	if(options.id == null && options.name==null)
  {
			marvel.getcreator()
			.then(result =>{
			result.data.results.forEach(api_result=>{
        console.log("\n");
				console.log(`Creator Id:${api_result.id}`)
        console.log("----------------------------");
				if(api_result.fullName == '')
				{
					console.log("Name: No Information");
				}
				else {
					  console.log(`Name: ${api_result.fullName}`)
				}

        console.log("-----------------------------------");
        console.log(`Total Comics:${api_result.comics.available}`);
        console.log("-----------------------------------");

              //Fetching series from api
		console.log(`Total Series:${api_result.series.available}`)
		console.log("-----------------------------------");
        console.log(`Total stories: ${api_result.stories.available}`);
        console.log("-----------------------------------");
				if(api_result.events.available == '')
				{
					console.log("Total Events: No Information");
				}
				else {
					console.log(`Total Events: ${api_result.events.available}`);
				}
	console.log("\n");

		});
  })
}

else if(options.name !=null)
  {
		let list_name=[]
		marvel.getcreatorbyname(options.name)
			.then(result =>{
			if(result.data.results == '')
			{
						console.log(` OOPS, Sorry No information available for ${options.name} in the API`);
						givechoices_null()
			}
			else {
					result.data.results.forEach(api_name=>{
						value= api_name.fullName+':'+api_name.id
						list_name.push(value)
})
return list_name
}
}).then(list=>{
	if(list !=null)
	{
		givechoices_creator_list(list)
	}

})
}

else if(options.id !=null )
{
if(options.comic == true)
{
getcreatorbycomics(options.id)
}

else {
  	marvel.getcreatorbyid(options.id)
  		.then(result =>{

				if(result.code==404)
				{
					console.log(` OOPS, Sorry No information available for ${options.id} in the API`);
						givechoices_null()
				}
				else {
        result.data.results.forEach(api_id=>{
console.log("\n");
  	console.log(`Creator Id:${api_id.id}`)
      console.log("-----------------------------------");
			if(api_id.fullName == '')
			{
				console.log("Creator Name: No Information");
			}
			else {
					console.log(`Creator Name: ${api_id.fullName}`)
			}
      console.log("-----------------------------------");
    console.log(`Total comics of Creator:${api_id.comics.available}`);
    console.log("-----------------------------------");
		console.log(`Total Series of Creator: ${api_id.series.available}`)
		  console.log("-----------------------------------");
      console.log(`Total stories: ${api_id.stories.available}`);
      console.log("-----------------------------------");
			if(api_id.events.available == '')
			{
				console.log("Total Events: No Information");
			}
			else {
				console.log(`Total Events: ${api_id.events.available}`);
			}
console.log("\n");
})
	return result.data.results[0].id
	return
}
}).then(creatorsid=>{
	if(options.comic != true)
	{
			givechoices_creator(creatorsid)
	}

});
}
}
}

getcreator_stories_id = (creatorsid)=>{
marvel.getcreatorbyid(creatorsid)
	.then(result=>{
		result.data.results.forEach(api_result_story=>{
			console.log("\n");
			console.log(`  Total Stories Return from API:${api_result_story.stories.returned}`);
			api_result_story.stories.items.forEach(api_story=>{
				if(api_story.type =='')
				{
					console.log("Story Type: No Information");
				}
				else {
					console.log(`Story Type: ${api_story.type}`);
				}

			console.log("-----------------------------------");
			console.log(`Story name: ${api_story.name}`)
			console.log("\n");
		});
	})
})
	givechoices_creator(creatorsid)
}

getcreator_series_id = (creatorsid)=>{
	marvel.getcreatorbyid(creatorsid)
		.then(result=>{
			result.data.results.forEach(api_result_series=>{
				console.log("\n");
				console.log(`  Total Series Return from API:${api_result_series.series.returned}`);
						console.log("-----------------------------------");
				api_result_series.series.items.forEach(api_series=>{
				console.log(`series name: ${api_series.name}`)
						console.log("-----------------------------------");
			});
		})
	})
		givechoices_creator(creatorsid)
}


getcreator_events_id = (creatorsid)=>{
	marvel.getcreatorbyid(creatorsid)
		.then(result=>{
			result.data.results.forEach(api_result_events=>{
				console.log("\n");
				console.log(`  Total events Return from API:${api_result_events.events.returned}`);
				if(api_result_events.events.returned == 0)
				{
					console.log("-----------------------------------");
					console.log("No information in the API for the Events");
				}
				api_result_events.events.items.forEach(api_events=>{
				console.log(`Events name: ${api_events.name}`)
					console.log("-----------------------------------");
			});

		})
	})
		givechoices_creator(creatorsid)
}

getcreator_comics_id = (creatorsid)=>{
	marvel.getcreatorbyid(creatorsid)
		.then(result=>{
			result.data.results.forEach(api_result_comics=>{
				console.log("\n");
				console.log(`  Total comics Return from API:${api_result_comics.comics.returned}`);
				api_result_comics.comics.items.forEach(api_comics=>{
				console.log(`Events name: ${api_comics.name}`)
					console.log("-----------------------------------");
			});
		})
	})
		givechoices_creator(creatorsid)
}

getRandom_creators =()=>
{
	marvel.getcreator()
	.then(result =>{
	result.data.results.forEach(api_result=>{
		console.log("\n");
		console.log(`Creator Id:${api_result.id}`)
		console.log("----------------------------");
		if(api_result.fullName == '')
		{
			console.log("Name: No Information");
		}
		else {
				console.log(`Name: ${api_result.fullName}`)
		}

		console.log("-----------------------------------");
		console.log(`Total Comics:${api_result.comics.available}`);
		console.log("-----------------------------------");

					//Fetching series from api
console.log(`Total Series:${api_result.series.available}`)
console.log("-----------------------------------");
		console.log(`Total stories: ${api_result.stories.available}`);
		console.log("-----------------------------------");
		if(api_result.events.available == '')
		{
			console.log("Total Events: No Information");
		}
		else {
			console.log(`Total Events: ${api_result.events.available}`);
		}
		console.log("-----------------------------------");
				api_result.urls.forEach(item=>{
					console.log(`URL: ${item.url}`);
				})
console.log("\n");
});
	console.log("Now You know the name of Creators Right? Try this command \"Node cli.js --name name_you_know\"");
	console.log("\n");
})

}

givechoices_creator =(creatorsid) =>{
	if(creatorsid== null)
	{

	}
	else {
		prompt_creator.run()

			.then(answer=> {
				if(answer[0] == '1'){
		getcreator_comics_id(creatorsid)
				}
				else if(answer[0] == '2'){
		getcreator_series_id(creatorsid)
				}
				else if(answer[0] == '3'){
		getcreator_stories_id(creatorsid)
				}
				else if(answer[0] == '4'){
		getcreator_events_id(creatorsid)
				}
			});
	}

}


let prompt_creator = new Radio({
	name: 'colors',
	message: 'Want to know more about the Creator?',
	choices: [
	'1.Name of Total Comics',
	'2.Name of Total Series',
	'3.Name of Total Stories and Types',
	'4.Name of Total Events',
	'5.Exit',
	]
});

// To handling the Creators with same firstName
givechoices_creator_list =(list) =>{

let prompt_list = new Radio({
		name: 'choices',
		message: 'Select the Creator to know more about them? ',
		choices: list
	});
		prompt_list.run().then(answer=> {

				newcreator_id=answer.substring(answer.indexOf(":")+1)
				getcreatorbycreatorid(newcreator_id)

			});
}


getcreatorbycreatorid=(creatorsid)=>{

	marvel.getcreatorbyid(creatorsid)
		.then(result =>{
			result.data.results.forEach(api_id=>{
console.log("\n");
	console.log(`Creator Id:${api_id.id}`)
		console.log("-----------------------------------");
		if(api_id.fullName == '')
		{
			console.log("Creator Name: No Information");
		}
		else {
				console.log(`Creator Name: ${api_id.fullName}`)
		}
		console.log("-----------------------------------");
	console.log(`Total comics of Creator:${api_id.comics.available}`);
	console.log("-----------------------------------");
	console.log(`Total Series of Creator: ${api_id.series.available}`)
		console.log("-----------------------------------");
		console.log(`Total stories: ${api_id.stories.available}`);
		console.log("-----------------------------------");
		if(api_id.events.available == '')
		{
			console.log("Total Events: No Information");
		}
		else {
			console.log(`Total Events: ${api_id.events.available}`);
		}
console.log("\n");
})
return result.data.results[0].id

}).then(creatorsid=>{

givechoices_creator(creatorsid)
});
}

givechoices_null =()=>{

let prompt_null = new Radio({
		name: 'choices',
		message: 'Don\'t know the name. No Problem try this?',
		choices: [
		'1.Fetch Random Creators from the API',
		'2.Exit',
		]
	});

prompt_null.run()
.then(answer=> {
	if(answer[0] == '1'){
		getRandom_creators()
}
});
}

getcreatorbycomics=(creatorsid)=>{

	marvel.getcreatorbycomics(creatorsid)
				.then(result=>{

					if(result.data.results.length >0){
					result.data.results.forEach(items=>{
						console.log("********************************************************");
						console.log(`Comic Id:${items.id}`)
						console.log("********************************************************");
						console.log(`Comic title: ${items.title}`)
						console.log("********************************************************");
						console.log(`Comic Page_Count:${items.pageCount}`);
						console.log("********************************************************");
				if(items.description != '' && items.description != null  ){
					console.log(`Story:${items.description}`)
				}
				else{
					console.log(`About the Comic: Sorry! No Description available`)
					console.log("********************************************************");
				}
					console.log(`Comic Series: ${items.series.name}`);
					console.log("********************************************************");
					items.prices.forEach(item=>{
						console.log(`Price of Comic:$${item.price}`);
						console.log("********************************************************");
					})
					console.log(`Number of creators of Comics: ${items.creators.available}`);
					console.log("********************************************************");
					console.log(`Characters Appeared in comics: ${items.characters.available}`);
					console.log("\n");
			});
	}
	else{
		console.log("Sorry. No description for comics available")
	}
		}).then(()=>{

			givechoices_comic_creator(creatorsid)
		})
}


let prompt_comics = new Radio({
	name: 'colors',
	message: 'Want to know the name of Different Creators for this comics?',
	choices: [
	'1.Name of Different Creators and their roles',
	'2.Exit',
	]
});

//Choices for comics
givechoices_comic_creator=(creatorsid)=>{
	prompt_comics.run()

		.then(answer=> {
			if(answer[0] == '1'){
	getcomics_creator_id(creatorsid)
			}

		});
}

// Getting the name of Different Creators
getcomics_creator_id=(creatorsid)=>{
	marvel.getcreatorbycomics(creatorsid)
				.then(result=>{

					if(result.data.results.length >0){
					result.data.results.forEach(api_comic_creator=>{
						let count=1
						api_comic_creator.creators.items.forEach(item=>{

								console.log(`${count}). Name of Creator of "${api_comic_creator.title}" comic: ${item.name}`);
								console.log("-------------------------------------------------------------------");
								console.log(`  Role: "${item.role}"`);
								console.log("\n");
								count+=1
						})
			});
	}

		})
}
