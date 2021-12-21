<template>
<div>
    <h1 style="text-align: center; margin: 1rem 0">Online</h1>
    <div>
        <OnlineListItem v-for="(user, index) in onlineUsers" :key="index" :index="index" :user="user" :displayFriendIndex="displayFriendIndex" @click.native="$emit('clickFriendItem', index)"/>
    </div>
    <!--lightgoldenrodyellow-->
    <button @click="logOut" style="position: absolute; bottom: 0rem; width: 100%; height: 5rem; cursor: pointer; background-color: rgb(229, 243, 255); color: rgb(68, 144, 249); font-weight: 666; border: none;">Log out</button>
</div>
</template>

<script>
/**
 * Author: Sunwish
 * 
 * 单纯负责渲染在线列表，附带实现一个登出功能，实现就是简单的清空 sessionStorage 并刷新页面。
 * 
 * 在线列表维护逻辑：
 * 1. 用户在 App.vue 提交登录请求时附加 socket.io 的 id，若登录成功，则将该登录成功的用户
 * 信息连同其连接号一起广播给所有在线用户，这样就实现了用户加入时的列表更新。
 * 2. 用户在断开连接时，服务端知道断开者的 id，将断开者 id 广播给所有在线用户，这样就实现了
 * 用户退出时的列表更新。因为这也是为什么登录时要将自己的 socket id 给服务器广播给其它用户。
 */
import OnlineListItem from "./OnlineListItem.vue"
let randomId = 1;
export default {
    components: {
        OnlineListItem
    },
    props: {
        onlineUsers: {
            type: Array,
            required: true
        },
        displayFriendIndex: {
            type: Number,
            required: true
        },
        socket: {
            type: Object,
            required: true
        }
    },
    data () {
        return { randomCount: randomId }
    },
    created () {
        this.socket.on('user_connect', (user) => {
            let userObject = JSON.parse(user);
            this.onlineUsers.push(userObject);
            // console.log('user_connect: ', userObject.connId, 'onlineList now: ', this.onlineUsers);
        })
        this.socket.on('user_disconnect', (disconnectId) => {
            const i = this.onlineUsers.findIndex(user => user.connId == disconnectId);
            i > -1 && this.onlineUsers.splice(i, 1)
            && console.log('user_disconnect: ', disconnectId);
        })
    },
    methods: {
        saveStore: function (state = this.$store.state) {
            sessionStorage.setItem('store', JSON.stringify(state));
        },
        logOut () {
            this.$store.state.isLogin = false;
            this.$store.state.loginUserInfo = {};
            this.saveStore();
            location.reload();
            /*
            this.users.push({
                id: this.users.length,
                username: 'randomFriend' + randomId++,
                avater: 'avater1.jpg'
            });*/
        }
    }
}
</script>