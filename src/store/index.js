import Vue from 'vue'
import Vuex from 'vuex'

// 挂载 Vuex
Vue.use(Vuex);

// Create VueX Object
const store = new Vuex.Store({
    state: {
        // Store states want to be management
        isLogin: false,
        loginUserInfo: {}
    }
});

export default store;