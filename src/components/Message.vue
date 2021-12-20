<template>
    <div style="height: 100%; display: flex; flex-direction: column;">
        <div class="nickNameDiv">
            <h1> Chatroom </h1>
        </div>
        <div class="message-history-viewer" id="message-history-viewer"> <!--color: lightsteelblue;-->
            <div :class="{ messageFromSelf : msg.sender._id == self._id, message : true}" v-for="msg in messages" :key="msg._id">
                <!--lightpink-->
                <p style="text-decoration: underline; font-weight: 666; margin-bottom: 0.5rem;" v-if="msg.sender._id != self._id">{{ msg.sender.username }}: 
                </p>
                <!--yellow-->
                <p style="text-decoration: underline; font-weight: 666; margin-bottom: 0.5rem;" v-else>Me: </p>
                <p>
                    {{ msg.content }}
                </p>
            </div>
        </div>
        <div class="message-sendbox">
            <div class="textareaDiv">
                <textarea v-model="sendboxContent" @keydown.enter="handleKeyDown" placeholder="Enter message here and click send button to send." spellcheck="false"/>
            </div>
            <button class="sendButton" @click="clickSend" style="">Send</button>
        </div>
    </div>
</template>
<script>
/**
 * Author: Sunwish
 * 消息收发逻辑：
 * 1. 发送消息使用 axio 请求服务端的插入消息 api 进行发送
 * 2. 接收消息通过 socket.io-client 接收来自服务器的广播推送接收
 * 3. 自己发送的消息也视为别人的消息通过 socket.io 推送接收并添加到聊天框
 *    而无视 axios 返回的发送成功的回调消息对象
 */
import axios from 'axios';
const requireBaseURL = "http://localhost:80";
let scrollContainer = document.getElementById('message-history-viewer');
let justCreated = 1;
export default {
    props: {
        messages: {
            type: Array,
            required: true
        },
        self: {
            type: Object,
            required: true
        },
        socket: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            sendboxContent: "",
        }
    },
    created () {
        this.socket.on('chat_message', (message) => {
            let msgInserted = JSON.parse(message);
            // update front-end
            this.messages.push(msgInserted);
            this.sendboxContent = "";
            setTimeout(()=>{
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            })
        })
    },
    mounted () {
        scrollContainer = document.getElementById('message-history-viewer');
        console.log("mounted");
        if(justCreated == 1){
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            justCreated = 1;
        }
    },
    updated () {
        console.log("Message.vue updated");
        scrollContainer = document.getElementById('message-history-viewer');
    },
    methods: {
        async clickSend () {
            // request back-end
            let res = await axios.post(requireBaseURL + '/api/chatroomMessage', {
                sender: this.self._id,
                content: this.sendboxContent,
                time: Date.now()
            });
            
            /* 自己发送的消息通过 socket.io-client 接收服务器推送得到，不处理 axios 的响应了
            if(res.data.errMessage == null) {
                let msgInserted = res.data.result;
                // update front-end
                this.messages.push(msgInserted);
                this.sendboxContent = "";
                setTimeout(()=>{
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                })
            }
            */

            // 错误还是要处理的
            if(res.data.errMessage != null) {
                alert("消息发送失败！错误信息见控制台。");
                console.error("发送消息失败：", res.data.errMessage);
            }
            
        },
        handleKeyDown () {
            this.clickSend();
        }
    }
}
</script>

<style>
.nickNameDiv {
    text-align: center;
    background-color: rgb(246, 248, 250);
    color: #000;
    padding:1rem 0;
    box-shadow: 0px 5px 20px rgb(100,100,100,0.1);
}

.message-history-viewer {
    flex: 1;
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.message {
    margin: 1rem;
}

.messageFromSelf {
    text-align: right;
}

.message-sendbox {
    bottom: 0rem;
    height: 7rem;
    width: 100%;
    display: flex;
    background-color: blue;
    border: 1px rgb(222, 222, 222) solid;
    border-width: 1px 0px 0px 0px;
}

.textareaDiv {
    width: 80%;
    height: 100%;
    background-color: rgb(246, 248, 250);
    overflow: hidden;
    border: none;
}

textarea {
    width: 100%;
    height: 100%;
    margin: 1rem;
    font-family: "Microsoft YaHei";
    font-size: 1rem;
    background-color: rgb(246, 248, 250);
    /*background-color: lightslategray;*/
    /*background-color: lightsalmon;*/
    border: none;
    /*color: #fff;*/
    resize: none;
}

textarea:focus {
    outline: none;
}

.sendButton {
    right: 0rem;
    width: 20%;
    height: 100%;
    font-weight: 666;
    font-size: 1.1rem;
    /*background-color: blue;*/
    /*background-color: cornflowerblue;*/
    background-color: rgb(68, 144, 249);
    flex-shrink: 0;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
}

.sendButton:hover {
    background-color: rgb(26, 117, 245);
    transition: 0.2s all ease-in-out;
}
</style>