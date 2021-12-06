<template>
<div>
    <h1 style="text-align: center; margin: 1rem 0">Friends</h1>
    <div>
        <FriendListItem v-for="friend in friends" :key="friend.id" :friend="friend" :displayFriendId="displayFriendId" @click.native="$emit('clickFriendItem', friend.id)"/>
    </div>
    <!--lightgoldenrodyellow-->
    <button @click="addFriend" style="position: absolute; bottom: 0rem; width: 100%; height: 5rem; cursor: pointer; background-color: rgb(229, 243, 255); color: rgb(68, 144, 249); font-weight: 666; border: none;">New friend randomly</button>
</div>
</template>

<script>
import FriendListItem from "./FriendListItem.vue"
let randomId = 1;
export default {
    components: {
        FriendListItem
    },
    props: {
        friends: {
            type: Array,
            required: true
        },
        displayFriendId: {
            type: Number,
            required: true
        }
    },
    data () {
        return { randomCount: randomId }
    },
    methods: {
        addFriend () {
            this.friends.push({
                id: this.friends.length,
                nickName: 'randomFriend' + randomId++,
                messageHistory: []
            });
        }
    }
}
</script>