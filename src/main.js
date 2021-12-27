import Vue from 'vue'
import App from './App.vue'
//import store from './store'
const { io } = require('socket.io-client');

Vue.config.productionTip = false

const requireBaseURL = "http://localhost:80";
var socket = io(requireBaseURL);
socket.on('connect', () => {
  new Vue({
    //store,
    render: h => h(App, {
      props: {
        requireBaseURL: requireBaseURL,
        socket: socket
      }
    }),
  }).$mount('#app')
})
