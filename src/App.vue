<template>
    <div class="app">
        <div class="FriendListDiv">
            <OnlineList :onlineUsers="onlineUsers" :displayFriendIndex="displayFriendIndex" @clickFriendItem="clickFriendItem" :socket="socket" :requireBaseURL="requireBaseURL"/>
        </div>
        <div class="MessageDiv">
            <Message :messages="messages" :self="self" :socket="socket"/>
        </div>
    </div>
</template>

<script>
/**
 * Author: Sunwish
 * 
 * - 使用 axios 和服务端进行 api 交互，api 设计遵循 RESTful 规范
 * - 登录状态和个人信息记录在 vuex 中，并通过页面加载和登录成功、关闭时取存
 *   sessionStorage 来实现刷新页面后登录状态记忆的效果。
 * 
 * 设计/实现思路：
 * 1. 页面加载时首先读取 sessionStorage 中的登录状态，若未登录就提示输入登录身份
 *    进行登录，登录成功后存储登录状态和用户信息，避免刷新页面后又要重新登录。
 * 2. 登录后向服务器拉取在线列表(Not Implement yet)和历史消息记录，并通过 Vue 
 *    传递给相关组件进行视图更新。
 */
import axios from 'axios';
import OnlineList from "./components/OnlineList.vue"
import Message from "./components/Message.vue"
axios.defaults.withCredentials = true;

// Connect socket.io
//var socket = io(requireBaseURL);
//socket.on('connect', () => {
//    console.log('connect id: ', socket.id);
//});

export default {
    components: {
        OnlineList, 
        Message
    },
    props: {
        requireBaseURL: {
            type: String,
            required: true
        },
        socket: {
            type: Object,
            required: true
        }
    },
    methods: {
        clickFriendItem: function () {
            // this.displayFriendIndex = this.displayFriendIndex == index ? -1 : index;
        },
        login: async function (promptMsg = "What's your username?") {
            let username = prompt(promptMsg);
            let res = await axios.post(this.requireBaseURL + '/api/login', {
                username: username,
                connId: this.socket.id
            });
            this.self = res.data.result;
            if(this.self == null) return 1;
            // vuex 记录登录状态和个人信息
            /*
            this.$store.state.loginUserInfo = this.self;
            this.$store.state.isLogin = true;
            this.saveStore();
            */
            return 0;
        },
        /*
        saveStore: function () {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        }
        */
    },

    beforeCreate() {
        window.addEventListener("beforeunload", () => {
            this.saveStore();
        })
        /*
        // Read store from sessionStorage
        if(sessionStorage.getItem('store')) {
            // console.log(sessionStorage.getItem('store'));
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        }
        */
    },

    async created() {
        // Login with selfId
        this.self = (await axios.post(this.requireBaseURL + '/api/whoami')).data.result;
        console.log('this.self: ', this.self);
        if(this.self == null /*this.$store.state.isLogin == false*/) {
            let loginSuccess = await this.login();
            while(loginSuccess != 0) loginSuccess = await this.login('Id not found. Please enter a valid id:');
        } else {
            // this.self = this.$store.state.loginUserInfo;
        }
        // Pull online users maintain on server-end
        let res = await axios.get(this.requireBaseURL + '/api/onlineUsers');
        this.onlineUsers.push.apply(this.onlineUsers, res.data.result);
        // console.log('onlineUsers get from server: ', res.data.result);

        // Broadcast self online event to update all online users' online list
        axios.post(this.requireBaseURL + '/api/onlineUser', {
            user: this.self,
            connId: this.socket.id
        })
        this.displayFriendIndex = 0;
        // Pull message history
        let messageResult = await axios.get(this.requireBaseURL + '/api/chatroomMessages');
        this.messages = messageResult.data.result;
    },

    data() {
        return {
            self: {},
            displayFriendIndex: -1,
            onlineUsers: [],
            messages: [],
        }
    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
}

.FriendListDiv{
    position: absolute;
    width: 30%;
    height: 100%;
    background-color: rgb(246, 248, 250);
    border: 1px rgb(222, 222, 222) solid;
    box-sizing: border-box;
    /*background-color: mediumvioletred;*/
}

.MessageDiv {
    position: absolute;
    right: 0;
    width: 70%;
    height: 100%;
    /*background-color: darkcyan;*/
    background-color: rgb(255, 255, 255);
}
</style>