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
            this.displayFriendIndex = this.onlineUsers.push(this.self) - 1;
            // Session 记录登录状态和个人信息
            sessionStorage.setItem('_id', this.self._id);
            sessionStorage.setItem('isLogin', true);
            // 左下角那个随机加人的按钮改成退出功能
            return 0;
        }
    },
    async beforeCreate() {
        console.log("$store.state.isLogin: " + this.$store.state.isLogin);
    },

    async created() {
        // Login with selfId
        let loginSuccess = await this.login();
        while(loginSuccess != 0) loginSuccess = await this.login('Id not found. Please enter a valid id:');
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