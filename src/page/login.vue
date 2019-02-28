<template>
    <div id="login" class="fillall login_page">
        <transition name='fade'>
            <section class="form-container" v-show='showLogin'>
                <h3 class='title'>elm后台管理系统</h3>
                <el-form :model="form" :rules='rules' ref="form">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="login('form')">登录</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
                <p class="tip">未登录过的新用户，自动注册</p>
                <p class="tip">注册过的用户可凭账号密码登录</p>
            </section>
        </transition>
    </div>
</template>

<script>
    import { login } from '../service/getData';
    import { mapState, mapActions } from 'vuex';
    
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                showLogin: false
            }
        },
        mounted() {
            this.showLogin = true;
            if (!this.adminInfo.id) {
                this.getAdminData();
            }
        },
        computed: {
            ...mapState(['adminInfo'])
        },
        methods: {
            ...mapActions([
                'getAdminData'
            ]),
            async login(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res = await login({user_name: this.form.username, password:this.form.password});
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            this.$router.push('manage');
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        });
                    }
                });
            }
        },
        watch: {
            adminInfo(val) {
                if (val.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
                    this.$router.push('manage');
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .login_page{
        background: #324057;
        overflow: hidden;
    }
    .form-container{
        width: 320px;
        height: 220px;
        padding: 25px;
        margin: 0 auto;
        margin-top: 210px;
        border-radius: 5px;
        background: #fff;
        text-align: center;
        position: relative;
    }
    .title{
        position: absolute;
        top: -100px;
        left: 0;
        font-size: 34px;
        color: #fff;
        width: 100%;
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .btn{
        width: 100%;
        font-size: 16px;
    }
    .fade-enter, .fade-leave-to{
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active{
        transition: all 1s;
    }
</style>
