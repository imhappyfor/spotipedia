<template>
<div >
<button v-on:click="getFollowedArtist">Get your followed artists</button>
  <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
  <div v-for="artist in artists" :key="artist.name" >
    <div style="padding-right: 10px">
    <img :src="artist.images[0].url" height="50px" width="50px"/>
    <br>
    {{artist}}
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      authCode : null,
      accessToken: null,
      artists: [],
      seenCursors : [],
      genres: new Set()
    }
  },
  created(){
  },
  methods: {
    getFollowedArtist(){
      let tempCursorArr = []
      let spotifyObj =this.$store.state.spotifyObj
      let artists = this.artists
      let recursiveGetFollowed = function(after = null){
              let body 
              if (after === null) {
                  body = { type: 'artist', limit: 50 }
              }
              else{
                  body = { type: 'artist', limit: 50, after: after}
              }
              spotifyObj.getFollowedArtists(body,function (err, data) {
                if (err) console.error(err);
                else {
                      for (let x of data.artists.items){
                          artists.push(x)
                      }
                  if (tempCursorArr.includes(data.artists.cursors.after) || data.artists.cursors.after === null){
                    console.log(tempCursorArr)
                    return tempCursorArr
                  }
                  else{                   
                  tempCursorArr.push(data.artists.cursors.after)                       
                  return recursiveGetFollowed(data.artists.cursors.after)
                  }
                }
              })
      }
      this.seenCursors = recursiveGetFollowed();
    },
    getAccessToken(){

  }
}
}
</script>
<style lang="scss" scoped>



</style>