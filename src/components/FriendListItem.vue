<template>
    <div class="friend-list-item" :class="{ 'friend-list-item-display' : (index == displayFriendId) }">
        <div class="friend-list-item-avater"><img :src="avater"/></div>
        <div class="friend-list-item-right">
            <div class="friend-list-item-nick">
                {{ friend.nickName }}
            </div>
            <div v-if="friend.message && friend.messageHistory.length > 0" class="friend-list-item-lastmsg">
                {{ friend.messageHistory[friend.messageHistory.length-1].content }}
            </div>
        </div>
        <!--<img src="../imgs/avater1.jpg"/>-->
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            require: true
        },
        friend: {
            type: Object,
            required: true
        },
        displayFriendId: {
            type: Number,
            required: true
        }
    },
    data () {
        //console.log(this.displayFriendId + ", " + this.friend.id);
        //this.avater = this.friend.avater;
        console.log("this.avater: " + this.friend.avater);
        return {
            avater: this.friend.avater
            //avater: "../imgs/avater1.jpg"
        }
    }
}
</script>

<style>
.friend-list-item {
    width: 100%;
    height: 5rem;
    /*border: 1px blue solid;*/
    border-width: 1px 0;
    background-color: rgb(246, 248, 250);
    cursor: pointer;
    transition: 0.25s all ease-in-out;
}
.friend-list-item-display {
    background-color: rgb(208, 232, 253);
}
.friend-list-item:hover {
    background-color: rgb(229, 243, 255);
    transition: 0.1s all ease-in-out;
}
.friend-list-item-avater {
    float: left;
    width: 4rem;
    height: 4rem;
    /*background-color: aqua;*/
    /*background-image: url('../imgs/avater1.jpg');
    background-size: 5rem;*/
    /*line-height: 5rem;*/
    overflow: hidden;
    text-align: center;
    /*border: 1px red solid;*/
    margin-top: 0.5rem;
    margin-left: 0.5rem;
}
.friend-list-item-avater img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
}
.friend-list-item-right {
    height: 100%;
    padding-left: 0.5rem;
    /*background-color: blueviolet;*/
    overflow: hidden;
}
.friend-list-item-nick {
    line-height: 2.5rem;
    font-weight: 666;
    margin-top: 0.2rem;
    /*color: aliceblue;*/
    /*background-color: brown;*/
}
.friend-list-item-lastmsg {
    /*line-height: 2.5rem;*/
    font-size: 1rem;
    color: gray;
    /*background-color: chartreuse;*/
}
</style>