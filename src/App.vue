<template>
    <div v-if="friends.length > 0" class="app">
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
// let messageId = 0;
const requireBaseURL = "http://localhost:80";
//const imgBaseURL = "./imgs";
const selfId = 0;

function getFriendsId(selfId) {
    return new Promise((resolve, reject) => {
        axios.get(requireBaseURL + "/api/friendsId/" + selfId)
        .then(res => {
            if(res.data.errMessage) return reject(res.data.errMessage);
            return resolve(res.data.result);
        }).catch(err => reject(err))
    })
}
function getFriends(selfId) {
    return new Promise((resolve, reject) => {
        getFriendsId(selfId)
        .then(res => {
            console.log("friend count: " + res.length);
            let friends = [];
            let posts = [];

            for(friendId of res) {
                console.log(friendId);
                posts.push(axios.get(requireBaseURL + "/api/user/" + friendId));
            }
            
            Promise.all(posts)
            .then(async reses => {
                for(res of reses){
                    let result = res.data.result;
                    // var avater = await axios.get(requireBaseURL + "/api/avater/" + result.avater);
                    friends.push({
                        id: result.id,
                        nickName: result.username,
                        avater: requireBaseURL + "/api/avater/" + result.avater
                    });
                    //console.log("Friend's avater: " + imgBaseURL + "/" + result.avater);
                }
                resolve(friends);
            }).catch(err => {
                console.error(err);
                reject(err);
            })
        })
        .catch(err => {
            console.error(err);
            reject(err);
        })
    })
}
export default {
    components: {
        FriendList, Message
    },
    methods: {
        clickFriendItem (friendId) {
            console.log(friendId);
            this.displayFriendId = friendId;
        },
    },
    beforeCreate() {
        // Load all friends
        getFriends(selfId)
        .then(res => {
            console.log("console.log(res);");
            for(let friend of res){
                axios.get(requireBaseURL + '/api/messages')
                .then((res) => {
                    friend.messageHistory = res.data.result;
                    this.friends.push(friend);
                    console.log(friend);
                })
                .catch(err => {
                    console.error(err);
                });        
            }
            // this.friends.push.apply(this.friends, res);
            console.log(this.friends);
        })
        .catch(err => {
            console.error(err);
        })
    },
    data() {
        return {
            displayFriendId: 0,
            friends: []
            /*
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
            ]*/
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