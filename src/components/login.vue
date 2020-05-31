<template>
  <div>    
    <h1>Spodi-Pedia</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import * as SpotifyWebApi from 'spotify-web-api-js';
const querystring = require('querystring');
const axios = require('axios');
let s = new SpotifyWebApi();
export default {
data(){
    return {
        authCode: null,
    }
},
components: {
},
methods: {
    login(){
    let authUrl = 'https://accounts.spotify.com/authorize?' +'client_id='+ process.env.VUE_APP_SCID +
        '&response_type=code'+'&redirect_uri=' + process.env.VUE_APP_BASE_URL + '&scope=user-follow-read'


    console.log(process.env.VUE_APP_BASE_URL)
    authUrl = encodeURI(authUrl);
    console.log('asdf', authUrl)
    window.location.href = authUrl;
    console.log(process.env.VUE_APP_BASE_URL)
    },
    pushToMainApp(){
        this.$router.push('home')
    }
},
created(){
},
mounted(){
        console.log(this.authCode)
        let userCode = window.location.href
        if (userCode.includes("code") || this.authCode){
        this.authCode =  userCode.split('?')[1].slice(5);
        let body = {   
            'code' : this.authCode,
            'redirect_uri' : process.env.VUE_APP_BASE_URL,
            'grant_type' : 'authorization_code',
        }
        let config = {
            headers: { 'Authorization': 'Basic ' + btoa(process.env.VUE_APP_SCID +':'+ process.env.VUE_APP_CS) }
        }
        axios.post('https://accounts.spotify.com/api/token',querystring.stringify(body), config).then((res)=>{
            this.accessToken = res.data.access_token
            s.setAccessToken(this.accessToken);
            this.$store.commit('authSpotify',s);
            this.pushToMainApp();
        }).catch((error) => {
            console.log(`this is an error ${error}`)
        });
    }
    
},
watch:{

}
}
</script>

<style>
h1 {
 color: whitesmoke;
 font-family: monospace;
 font-style: italic;
 font-weight: 500;
}
</style>

