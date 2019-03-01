<template>
    <div class="head_top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/manage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown placement="bottom-start" @command="handleCommand">
            <img :src="baseImgPath + adminInfo.avatar" class="avatar">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { baseImgPath } from '../utils/env';
    import { mapState, mapActions } from 'vuex';
    import { logout } from '../service/getData';

    export default {
        data () {
            return {
                baseImgPath
            }
        },
        mounted () {
            if (!this.adminInfo.id) {
                this.getAdminData();
            }
        },
        computed: {
            ...mapState([
                'adminInfo'
            ])
        },
        methods: {
            ...mapActions([
                'getAdminData'
            ]),
            async handleCommand (command) {
                if (command === 'home') {
                    this.$router.push('/manage');
                } else if (command === 'logout') {
                    const res = await logout();
                    if (res.status === 1) {
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.$router.push('/login');
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .head_top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #eff2f7;
        height: 60px;
        padding-left: 20px;
    }
    .avatar{
        width: 36px;
        height: 36px;
        margin-right: 37px;
        border-radius: 50%;
    }
</style>
