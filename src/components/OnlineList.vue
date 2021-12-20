<template>
<div>
    <h1 style="text-align: center; margin: 1rem 0">Online</h1>
    <div>
        <OnlineListItem v-for="(user, index) in users" :key="index" :index="index" :user="user" :displayFriendIndex="displayFriendIndex" @click.native="$emit('clickFriendItem', index)"/>
    </div>
    <!--lightgoldenrodyellow-->
    <button @click="logOut" style="position: absolute; bottom: 0rem; width: 100%; height: 5rem; cursor: pointer; background-color: rgb(229, 243, 255); color: rgb(68, 144, 249); font-weight: 666; border: none;">Log out</button>
</div>
</template>

<script>
import OnlineListItem from "./OnlineListItem.vue"
let randomId = 1;
export default {
    components: {
        OnlineListItem
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        displayFriendIndex: {
            type: Number,
            required: true
        }
    },
    data () {
        return { randomCount: randomId }
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