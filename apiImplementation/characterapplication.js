
const marvel = require('marvelapi')
var Radio = require('prompt-radio');

module.exports.run = options => {

	//console.log(options)



if(options.id ==null && options.name==null){
		marvel.characters()
		.then(result =>{ //console.log(result)
console.log("I am in charcaters")

			result.data.results.forEach(items=>{

				console.log(`Character Id:${items.id}`)
				console.log(`Charcater Name: ${items.name}`)
				if(items.description != ''){
					console.log(`About the Charcater:${items.description}`)
				}
				else{
					console.log(`About the Charcater: Sorry! No Description available`)
				}

				console.log(`Appeared in Comics: ${items.comics.available}`)
				console.log(`Appeared in Series: ${items.series.available}`)
				console.log(`Appeared in Stories: ${items.stories.available}`)
				console.log(`Appeared in Events: ${items.events.available}`)
				console.log()

			});
		});
	}

	else if(options.name !=null){

//console.log(options.name)
marvel.getcharacterbyname(options.name)
		.then(result =>{ //console.log(result)
//	console.log(options.name)
if(result.data.results.length >0){
result.data.results.forEach(items=>{

	console.log(`Character Id:${items.id}`)
	console.log(`Charcater Name: ${items.name}`)
	if(items.description != ''){
		console.log(`About the Charcater:${items.description}`)
	}
	else{
		console.log(`About the Charcater: Sorry! No Description available`)
	}

	console.log(`Appeared in Comics: ${items.comics.available}`)
	console.log(`Appeared in Series: ${items.series.available}`)
	console.log(`Appeared in Stories: ${items.stories.available}`)
	console.log(`Appeared in Events: ${items.events.available}`)
	console.log()

//return items.id
});
return result.data.results[0].id
}
else{
	console.log("No Details found for the given character name")
	return null
}
}).then(charcaterbyid=>{

if(charcaterbyid !=null){
givechoices(charcaterbyid) 
}


	

});
}


else if(options.id !=null ){
//	console.log(options)
//marvel.getcharacterbyid(options.id)
if(options.comics == true){
getcharacterbycomics(options.id)
}

else if(options.events == true){
getcharacterbyevents(options.id)
}
else if(options.series == true){
getcharacterbyseries(options.id)
}
else if(options.stories == true){
getcharacterbystories(options.id)
}

else{
	//console.log(options.name)
marvel.getcharacterbyid(options.id)
		.then(result =>{ //console.log(result)
//	console.log(options.name)

if(result.code == 200){



result.data.results.forEach(items=>{

	console.log(`Character Id:${items.id}`)
	console.log(`Charcater Name: ${items.name}`)
	if(items.description != ''){
		console.log(`About the Charcater:${items.description}`)
	}
	else{
		console.log(`About the Charcater: Sorry! No Description available`)
	}

	console.log(`Appeared in Comics: ${items.comics.available}`)
	console.log(`Appeared in Series: ${items.series.available}`)
	console.log(`Appeared in Stories: ${items.stories.available}`)
	console.log(`Appeared in Events: ${items.events.available}`)
	console.log()

});
return result.data.results[0].id
}
else{
	console.log("No Details found for the given character id")
	return null
}
}).then(charcaterbyid=>{
	if(charcaterbyid !=null){

givechoices(charcaterbyid)
	}

});


}


}

}


getcharacterbystories = (charcaterbyid)=>{

marvel.getcharacterbystories(charcaterbyid)
	.then(result=>{

	if(result.data.results.length >0){
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

	}else{
				console.log(`About the Comic: Sorry! No Description available`)
			}
	}).then(()=>{
givechoices(charcaterbyid)
	})

	
}


getcharacterbyseries = (charcaterbyid)=>{
 	marvel.getcharacterbyseries(charcaterbyid)
	.then(result=>{
		if(result.data.results.length >0){
		result.data.results.forEach(items=>{
			console.log(`Series Id:${items.id}`)
			console.log(`Series title: ${items.title}`)
			if(items.description != '' && items.description != null  ){
				console.log(`Story:${items.description}`)
			}
			else{
				console.log(`About the Series Sorry! No Description available`)
			}

			items.urls.forEach(url=>{
				console.log(`URL:${url.url}`)
			})

			console.log()
		});
}else{
				console.log(`About the Comic: Sorry! No Description available`)
			}
	}).then(()=>{
givechoices(charcaterbyid)
	})

	
}


getcharacterbyevents = (charcaterbyid)=>{
	marvel.getcharacterbyevent(charcaterbyid)
	.then(result=>{
		if(result.data.results.length >0){
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
givechoices(charcaterbyid)
	})

	
}

getcharacterbycomics = (charcaterbyid)=>{

marvel.getcharacterbycomic(charcaterbyid)


	.then(result=>{

if(result.data.results.length >0){
		result.data.results.forEach(items=>{
			console.log(`Comic Id:${items.id}`)
			console.log(`Comic title: ${items.title}`)
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
else{
	console.log("Sorry. No description for comics available")
}
	}).then(()=>{

givechoices(charcaterbyid)
	})
}



givechoices =(charcaterbyid) =>{

prompt.run()

	.then(answer=> {
		if(answer[0] == '1'){
getcharacterbycomics(charcaterbyid)
		}
		else if(answer[0] == '2'){
getcharacterbyseries(charcaterbyid)
		}
		else if(answer[0] == '3'){
getcharacterbystories(charcaterbyid)
		}
		else if(answer[0] == '4'){
getcharacterbyevents(charcaterbyid)
		}
	});

}


var prompt = new Radio({
	name: 'colors',
	message: 'Want to know more about the character?',
	choices: [
	'1.Appeared in Comics',
	'2.Appeared in Series',
	'3.Appeared in Stories',
	'4.Appeared in Events',
	'5.Exit',
	]
});