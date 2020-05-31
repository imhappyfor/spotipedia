<template>
<div>
<button v-on:click="getAccessCode">Click to receive code</button>
<button v-on:click="getAccessToken">Click to receive token</button>
<button v-on:click="getFollowedArtist">Get your followed artists</button>
<ul>
  <li v-for="artist in artists" :key="artist">
    {{artist}}
  </li>
</ul>
</div>
</template>

<script>
import * as SpotifyWebApi from 'spotify-web-api-js';
let s = new SpotifyWebApi();
export default {
  name: 'home',
  data(){
    return {
      authCode : null,
      accessToken: null,
      artists: [],
      seenCursors : []
    }
  },
  created(){
    console.log(this.$store.state.spotifyObj,"asdfasdf")
  },
  methods: {
    getFollowedArtist(){
      let tempCursorArr = []
      let recursiveGetFollowed = function(after = null){
              let body 
              if (after === null) {
                  body = { type: 'artist', limit: 50 }
              }
              else{
                  body = { type: 'artist', limit: 50, after: after}
              }
              s.getFollowedArtists(body,function (err, data) {
                if (err) console.error(err);
                else {
                  if (tempCursorArr.includes(data.artists.cursors.after) || data.artists.cursors.after === null){
                    console.log(tempCursorArr)
                    return tempCursorArr
                  }
                  else{ 
                      tempCursorArr.push(data.artists.cursors.after) 
                      console.log(data.artists.cursors.after, tempCursorArr)
                  return recursiveGetFollowed(data.artists.cursors.after)
                  }
                }
              })
      }
      this.seenCursors = recursiveGetFollowed();
    },
    getAccessCode(){
      let authUrl = 'https://accounts.spotify.com/authorize?' +'client_id='+ process.env.VUE_APP_SCID +
          '&response_type=code'+'&redirect_uri='+ process.env.VUE_APP_BASE_URL+'&scope=user-follow-read'
      let authUrlEncode = encodeURI(authUrl);
      window.location.href = authUrlEncode;
    },

    getAccessToken(){

  }
}
}
</script>
<style lang="scss" scoped>



</style>