<template>
    <div id="explain">
        <head-top></head-top>
        <p>my-elm后台管理系统</p>
        <p>第一次登录的用户自动注册成为普通管理员</p>
        <p>普通管理员可以添加、修改信息</p>
        <p>超级管理员可以删除信息</p>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';

    export default {
        components: {
            headTop
        }
    }
</script>

<style lang='less' scoped>
    p{
        text-align: center;
        line-height: 46px;
        font-size: 20px;
        color: #666;
    }
    p:first-of-type{
        margin-top: 10px;
    }
</style>
