
const marvel = require('marvelapi')
var Radio = require('prompt-radio');
const  Inquirer = require('inquirer');

module.exports.run = options => {

	//console.log(options)

	if(options.id ==null && options.title==null){
		marvel.comics()
		.then(result =>{ //console.log(result)
			result.data.results.forEach(items=>{

				console.log(`Comic Id:${items.id}`)
				console.log(`Comic Title: ${items.title}`)
				if(items.description != '' && items.description != null){
					console.log(`About the Comic:${items.description}`)
				}
				else{
					console.log(`About the Comic: Sorry! No Description available`)
				}

				items.urls.forEach(u=>{
					console.log(`URL: ${u.url}`)
				});

				/*console.log(`Appeared in Comics: ${items.comics.available}`)
				console.log(`Appeared in Series: ${items.series.available}`)
				console.log(`Appeared in Stories: ${items.stories.available}`)
				console.log(`Appeared in Events: ${items.events.available}`)*/
				console.log()

			});
		});
	}

	else if(options.title !=null){
		console.log(options.title)
//console.log(options.name)
marvel.getcomicbytitle(options.title)
		.then(result =>{ //console.log(result)
//	console.log(options.name)

result.data.results.forEach(items=>{

	console.log(`Comic id:${items.id}`)
	console.log(`Comic title: ${items.title}`)
	if(items.description != ''){
		console.log(`About the Comic:${items.description}`)
	}
	else{
		console.log(`About the Comic: Sorry! No Description available`)
	}


	items.urls.forEach(u=>{
		console.log(`URL: ${u.url}`)
	});

	/*console.log(`Appeared in Comics: ${items.comics.available}`)
	console.log(`Appeared in Series: ${items.series.available}`)
	console.log(`Appeared in Stories: ${items.stories.available}`)
	console.log(`Appeared in Events: ${items.events.available}`)*/
	console.log()

//return items.id
});
return result.data.results[0].id
}).then(comicid=>{


	givechoices(comicid)
	console.log()
	

});
}

else if(options.id !=null ){
	
//marvel.getcharacterbyid(options.id)
if(options.characters == true){
	getcharacters(options.ids)
}

if(options.events == true){
	getevents(options.id)
}
if(options.series == true){
	getseries(options.id)
}
if(options.stories == true){
	getstories(options.id)
}
}
}

getcreators = (comicid)=>{
	marvel.getcomicsbycreators(comicid)
	.then(result=>{
		console.log()
		result.data.results.forEach(items=>{
			console.log(`FullName:${items.fullName}`)
			
			items.urls.forEach(url=>{
				console.log(`URL:${url.url}`)
			})

			console.log()
		});
	}).then(()=>{
givechoices(comicid)
	})


	
	console.log()
}


getstories= (comicid)=>{

	marvel.getcomicsbystories(comicid)
	.then(result=>{


		result.data.results.forEach(items=>{

			console.log(`Story Id:${items.id}`)
			console.log(`Story title: ${items.title}`)
			if(items.description != '' && items.description != null  ){
				console.log(`Story:${items.description}`)
			}
			else{
				console.log(`About the Series Sorry! No Description available`)
			}



			console.log()
		});
	}).then(()=>{
givechoices(comicid)
	})


	console.log()
}


getevents = (comicid)=>{
	marvel.getcomicsbyevent(comicid)
	.then(result=>{

		if(result.data.results.length ==0){
			console.log("Sorry! No results")
		}
		else{
			result.data.results.forEach(items=>{

				console.log(`Event Id:${items.id}`)
				console.log(`Event title: ${items.title}`)
				if(items.description != '' && items.description != null  ){
					console.log(`Story:${items.description}`)
				}
				else{
					console.log(`About the Comic: Sorry! No Description available`)
				}

				items.urls.forEach(url=>{
					console.log(`URL:${url.url}`)
				})

				console.log()
			});
		}
	}).then(()=>{
givechoices(comicid)
	})


	console.log()
}

getcharacters = (comicid)=>{
	

	marvel.getcomicsbycharacter(comicid)
	.then(result=>{

		if(result.data.results.length ==0){
			console.log("\nSorry! No Data available")
		}
		else{
			result.data.results.forEach(items=>{

				console.log(`Character Id:${items.id}`)
				console.log(`Character title: ${items.title}`)
				if(items.description != '' && items.description != null  ){
					console.log(`Story:${items.description}`)
				}
				else{
					console.log(`About the Comic: Sorry! No Description available`)
				}

				items.urls.forEach(url=>{
					console.log(`URL:${url.url}`)
				})

				console.log()
			});
		}

	}).then(()=>{
givechoices(comicid)
	})
	
	console.log()

}


givechoices =(comicid) =>{

	object = {}

	prompt.run().then(answer=> {
		object.choice = answer[0] 
}).then((choice)=>{
	Inquirer.prompt(questions)
	.then((ans)=>{
		object.comicid = ans;
		
	if(object.choice = '1'){
			
getcharacters(object.comicid.answer)
}
else if(object.choice = '2'){
	object.choice = 2
getcreators(object.comicid.answer)
}
else if(object.choice = '3'){
	object.choice = 3
getstories(object.comicid.answer)
}
else if(object.choice = '4'){
	object.choice = 4
getevents(object.comicid.answer)
}
console.log(object)

	})
});

}


var prompt = new Radio({
	name: 'choice',
	message: 'Want to know more about the character?',
	choices: [
	'1.Comic characters',
	'2.Comic Creators',
	'3.Appeared in Stories',
	'4.Fetches lists of events in which a specific comic appears',
	'5.Exit',
	]
});

const questions = [
{
	type : 'input',
	name: 'answer',
	message : 'Enter firstname ...',
}
];

