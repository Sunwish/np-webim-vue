<template>
    <div class="friend-list-item" :class="{ 'friend-list-item-display' : (index == displayFriendIndex) }">
        <div class="friend-list-item-avater"><img :src="avater"/></div>
        <div class="friend-list-item-right">
            <div class="friend-list-item-nick">
                {{ user.username }}
            </div>
            <div class="friend-list-item-lastmsg">
                Online
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Author: Sunwish
 * 
 * 单纯负责渲染在线列表表项，选中效果（friend-list-item-display）是无聊写的，没实际意义
 */
export default {
    props: {
        index: {
            type: Number,
            require: true
        },
        user: {
            type: Object,
            required: true
        },
        displayFriendIndex: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            avater: 'http://localhost/api/avater/' + this.user.avater
        }
    },
    updated () {
        // 用户退出然后新用户加入时，user 会被更新，但头像在 data() 中于
        // 初始化后就返回不变了，因此需要在更新时手动更新一下 data() 中返回的头像信息
        this.avater = 'http://localhost/api/avater/' + this.user.avater
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