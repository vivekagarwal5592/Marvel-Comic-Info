
const marvel = require('marvelapi')
var Radio = require('prompt-radio');


module.exports.run = options => {

	if(options.title !=null){
		let list = []
		marvel.getcomicbytitle(options.title)
		.then(result =>{ 

if(result.data.results.length >0){


			result.data.results.forEach(items=>{
				val = items.title + ':' + items.id
				list.push(val)

			});
			return list
		}
		else {
			console.log("Sorry! No comic found with the given title")
			return null
		}
		}).then(list=>{
			if(list !=null){
givecomicchoices(list)
			console.log()
			}

			
		});
	}

else if(options.id !=null ){
getcomicsbyid(options.id)
}

else{

let list = []
		marvel.comics()
		.then(result =>{ 

if(result.data.results.length >0){


			result.data.results.forEach(items=>{
				val = items.title + ':' + items.id
				list.push(val)

			});
			return list
		}
		else {
			console.log("Sorry! No comic found with the given title")
			return null
		}
		}).then(list=>{
			if(list !=null){
givecomicchoices(list)
			console.log()
			}

			
		});

}


}

givecomicchoices =(list) =>{
	var prompt_comic_application = new Radio({
		name: 'choice',
		message: 'Select Comic',
		choices: list
	});

prompt_comic_application.run().then(answer=> {


	val = answer.substring(answer.indexOf(":")+1)
getcomicsbyid(val)


});
}

getcomicsbyid =(val)=>{
	marvel.getcomicsbyid(val).then(result=>{

if(result.code == 200){


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

});
}
else{
	console.log("Sorry! No data for the given comic id")
}

})


}