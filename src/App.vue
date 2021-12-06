<template>
    <div class="app">
        <div class="FriendListDiv">
            <FriendList :friends="friends" :displayFriendId="displayFriendId" @clickFriendItem="clickFriendItem"/>
        </div>
        <div class="MessageDiv">
            <Message :friend="friends[displayFriendId]" :displayFriendId="displayFriendId"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FriendList from "./components/FriendList.vue"
import Message from "./components/Message.vue"
let friendId = 0;
let messageId = 0;
export default {
    components: {
        FriendList, Message
    },
    methods: {
        clickFriendItem (friendId) {
            console.log(friendId);
            this.displayFriendId = friendId;
        }
    },
    created() {
        axios.get('http://localhost:80/getMessages')
        .then((res) => {
            console.log(res.data);
            this.friends[0].messageHistory = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    },
    data() {
        return {
            displayFriendId: 0,
            friends: [
                {
                    id: friendId++,
                    nickName: "Steve Jobs",
                    avater: require("./imgs/avater1.jpg"),
                    messageHistory: [
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Just a test!", 
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content: "Hello?"
                        },
                        {
                            id: messageId++,
                            sender: 1,
                            content: "What's up?"
                        }
                    ]
                },
                {
                    id: friendId++,
                    nickName: "Bill Gates",
                    avater: require("./imgs/avater2.jpg"),
                    messageHistory: [
                        {
                            id: messageId++,
                            sender: 1,
                            content: "Hey friend."
                        },
                        {
                            id: messageId++,
                            sender: 0,
                            content:  "Advanced Network."
                        }
                    ]
                }
            ]
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