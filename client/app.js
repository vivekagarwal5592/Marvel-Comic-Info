const socket = io()

const comicComponent = {
  template : `
  <div class="card" >
  <div class="card-header">
  {{type}}
  </div>
  <ul class="list-group list-group-flush">
  <li v-for="comic in comics" class="list-group-item"  @click="sendURL(comic.resourceURI)"
  style="cursor:pointer;" data-toggle="modal" data-target="#exampleModal">{{comic.name}}</li>
  </ul>
  </div>
  `,
  props : {
    comics: {
      name:'comics',
      type: Array,
      required:true},
      type: {name:'type',
      type: String,
      required:true}
    },
    methods : {
      sendURL : function(url){
        this.$emit('url-clicked', url)
      }
    }
  }

  const searchComponent = {
  template : `  <div class="card text-white bg-dark" >
      <div class="card-header border-light">
        Search History
      </div>
      <ul class="list-group list-group-flush">
        <li style="cursor:pointer;"  v-for="p in previoussearches" class="list-group-item bg-dark border-light"
        @click="previouscharacterinformation(p)">{{p}}</li>
      </ul>
    </div>`,
      props : {
        previoussearches: {
          name:'previoussearches',
          type: Array,
          required:true
        }
      },
      methods : {
        previouscharacterinformation : function(characterclicked){
          this.$emit('previous-search-clicked', characterclicked)
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
      type: ['Comics','Series','Events'],
      showDetails : false,
      showSearchBar : true,
      noResult : 'Sorry, there are no results for your Search',
      shownoResult: false
    },
    methods: {
      characterinformation : function(){
        let vm = this

        axios.get(`http://localhost:8080/characterinfo/${this.charactername}`)
        .then(result =>{
          if(result.data.data.count>0 ){
          vm.previoussearches.push(vm.charactername)
          vm.characterInfo = []
          vm.showSearchBar = false;
          result.data.data.results.forEach(items=>{
            let d = {}
            d['charcaterId'] =items.id
            d['charcatername'] = items.name
            d['about_charcater'] = items.description
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
            vm.characterInfo.push(d)

          });

}
else{
  vm.shownoResult = true
}
        })
      },
      getComicInfo : function(comicurl){
        let vm = this
        let temp = comicurl.split('/')
        let comicid = temp[temp.length-1]
        let checkForComicSeriesEvent =  temp[temp.length-2]
        vm.showDetails = true
        vm.characterInfo = []
        vm.charactername = ""
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
      searchagain : function(){
          let vm = this
          vm.showSearchBar = true
        vm.showDetails = false
      },
      previouscharacterinformation : function(charactername){
        socket.emit('get-character-info',charactername)
      },
    },

    components: {
      'comic-component': comicComponent,
      'search-component': searchComponent
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

  })
