<template>
    <div class="app">
        <div class="FriendListDiv">
            <OnlineList :users="onlineUsers" :displayFriendIndex="displayFriendIndex" @clickFriendItem="clickFriendItem"/>
        </div>
        <div class="MessageDiv">
            <Message :messages="messages" :self="self"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OnlineList from "./components/OnlineList.vue"
import Message from "./components/Message.vue"
const requireBaseURL = "http://localhost:80";

export default {
    components: {
        OnlineList, 
        Message
    },
    methods: {
        clickFriendItem: function () {
            // this.displayFriendIndex = this.displayFriendIndex == index ? -1 : index;
        },
        login: async function (promptMsg = "What's your id?") {
            let selfId = +prompt(promptMsg);
            let res = await axios.get(requireBaseURL + '/api/user/' + selfId);
            this.self = res.data.result;
            if(this.self == null) return 1;
            // vuex 记录登录状态和个人信息
            this.$store.state.loginUserInfo = this.self;
            this.$store.state.isLogin = true;
            this.saveStore();
            // 左下角那个随机加人的按钮改成退出功能
            return 0;
        },
        saveStore: function () {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        }
    },
    async beforeCreate() {
        window.addEventListener("beforeunload", () => {
            this.saveStore();
        })

        // Read store from sessionStorage
        if(sessionStorage.getItem('store')) {
            console.log(sessionStorage.getItem('store'));
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        }
        console.log("$store.state.isLogin: " + this.$store.state.isLogin);
    },

    async created() {
        // Login with selfId
        if(this.$store.state.isLogin == false) {
            let loginSuccess = await this.login();
            while(loginSuccess != 0) loginSuccess = await this.login('Id not found. Please enter a valid id:');
        } else {
            this.self = this.$store.state.loginUserInfo;
        }
        this.displayFriendIndex = this.onlineUsers.push(this.self) - 1;
        // Pull message history
        let messageResult = await axios.get(requireBaseURL + '/api/chatroomMessages');
        this.messages = messageResult.data.result;
    },

    data() {
        return {
            self: {},
            displayFriendIndex: -1,
            onlineUsers: [],
            messages: []
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