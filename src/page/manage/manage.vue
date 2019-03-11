<template>
    <div id="manage" class="fillall">
        <el-row style="height: 100%;">
            <el-col :span="4" style="height: 100%; background: #545c64; overflow: auto;">
                <el-menu :default-active="defaultActive" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="background: #324057;" router>
                    <el-menu-item index="/manage"><i class="el-icon-menu"></i><span>首页</span></el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i><span>数据管理</span></template>
                        <el-menu-item index="/manage/userlist">用户列表</el-menu-item>
                        <el-menu-item index="/manage/shoplist">商家列表</el-menu-item>
                        <el-menu-item index="/manage/foodlist">食品列表</el-menu-item>
                        <el-menu-item index="/manage/orderlist">订单列表</el-menu-item>
                        <el-menu-item index="/manage/adminlist">管理员列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i><span>添加数据</span></template>
                        <el-menu-item index="/manage/addshop">添加商铺</el-menu-item>
                        <el-menu-item index="/manage/addfood">添加商品</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i><span>图表</span></template>
                        <el-menu-item index="/manage/visitor">用户分布</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i><span>设置</span></template>
                        <el-menu-item index="/manage/adminset">管理员设置</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-warning"></i><span>说明</span></template>
                        <el-menu-item index="/manage/explain">说明</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%; overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive () {
                return this.$route.path;
            }
        }
    }
</script>

<style lang='less' scoped>

</style>
