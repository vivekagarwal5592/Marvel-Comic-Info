const socket = io()

const comicComponent = {
  template : `
  <div class="card" >
  <div class="card-header">
  {{type}}
  </div>
  <ul class="list-group list-group-flush">
  <li v-for="comic in comics" class="list-group-item"  @click="abc(comic.resourceURI)"
  style="cursor:pointer;" data-toggle="modal" data-target="#exampleModal">{{comic.name}}</li>
  </ul>
  </div>
  `,
  props : {
    comics: {
      name:'comics',
      type: Object,
      required:true
    },
    type: {
      name:'type',
      type: String,
      required:true
    }
  }
  ,
  data: {
    comicinfo : {title:null},


  },
  methods : {
    abc : function(url){
      console.log("test")
      this.$emit('event', url)
    }
  }
}

const app = new Vue({
  el: '#marvel-app',
  data: {
    charactername:'',
    characterInfo: [],
    comicinfo :{title:null},
    previoussearches : [],
    type: ['Comics','Series','Events']
  },
  methods: {

    characterinformation : function(){
      let vm = this
      vm.previoussearches.push(vm.charactername)
      console.log('clicked')

      axios.get(`http://localhost:8080/characterinfo/${this.charactername}`)
      .then(result =>{
        let vm = this
        vm.characterInfo = []

        //console.log(JSON.stringify(result.data.))

        result.data.data.results.forEach(items=>{



          let d = {}
          d['charcaterId'] =items.id
          d['charcatername'] = items.name
          d['about_charcater'] = items.description
          d['appeared_in_comics'] = items.comics.available
          d['appeared_in_series'] = items.series.available
          d['appeared_in_stories'] = items.stories.available
          d['appeared_in_events'] = items.events.available
          d['image'] = items.thumbnail.path + '.' + items.thumbnail.extension
          d['comics'] = []
          d['series'] = []
          d['events'] = []

          //  let count =0
          for(let count=0;count<10 && count<items.events.items.length;count++){
            d.comics.push({'resourceURI':items.comics.items[count].resourceURI,'name':items.comics.items[count].name})
          }

          for(let count=0;count<10 && count<items.events.items.length;count++){
            d.series.push({'resourceURI': items.series.items[count].resourceURI,'name':items.series.items[count].name})
          }

          for(let count=0;count<10 && count<items.events.items.length;count++){
            d.events.push({'resourceURI':items.events.items[count].resourceURI,'name':items.events.items[count].name})
          }

          vm.characterInfo.push(d)




        });
        //alert(response.data)
        //     console.log(response.data)
      })
    },
    getComicInfo : function(comicurl){
      console.log(comicurl)
      let vm = this
      //  let comicid = comicurl.substring(comicurl.lastIndexOf("/")+1);
      let temp = comicurl.split('/')
      let comicid = temp[temp.length-1]
      let checkForComicSeriesEvent =  temp[temp.length-2]

      axios.get(`http://localhost:8080/get${checkForComicSeriesEvent}byid/${comicid}`).then(
        results=>{
          results.data.data.results.forEach(items=>{
            vm.comicinfo['title'] = items.title
            vm.comicinfo['description'] =  items.description
            vm.comicinfo['image'] = items.thumbnail.path + "." + items.thumbnail.extension
            vm.comicinfo['url'] = items.urls[0].url
          })
        }
      )

    },


    previouscharacterinformation : function(charactername){
      socket.emit('get-character-info',charactername)
      console.log(charactername)
    },

    onChildMsg: function(msg) {
      console.log("reaches")
      console.log(msg)
    }


  },


  components: {
    'comic-component': comicComponent

  }
})

socket.on('found-character-info', result => {
  app.characterInfo = []
  result.data.results.forEach(items=>{
    let d = {}
    d['charcaterId'] =items.id
    d['charcatername'] = items.name
    d['about_charcater'] = items.description
    d['appeared_in_comics'] = items.comics.available
    d['appeared_in_series'] = items.series.available
    d['appeared_in_stories'] = items.stories.available
    d['appeared_in_events'] = items.events.available
    d['image'] = items.thumbnail.path + '.' + items.thumbnail.extension
    d['comics'] = []
    d['series'] = []
    d['events'] = []

    for(let count=0;count<10 && count<items.events.items.length;count++){
      d.comics.push({'resourceURI':items.comics.items[count].resourceURI,'name':items.comics.items[count].name})
    }

    for(let count=0;count<10 && count<items.events.items.length;count++){
      d.series.push({'resourceURI': items.series.items[count].resourceURI,'name':items.series.items[count].name})
    }

    for(let count=0;count<10 && count<items.events.items.length;count++){
      d.events.push({'resourceURI':items.events.items[count].resourceURI,'name':items.events.items[count].name})
    }


    app.characterInfo.push(d)

  });



  //alert(response.data)
  //     console.log(response.data)
})
