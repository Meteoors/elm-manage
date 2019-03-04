<template>
    <div id="home">
        <head-top></head-top>
        <section class="main">
            <h1>数据统计</h1>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4" :offset="4">
                    <div class='item today'>
                        <span class="num">当日数据:</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{userCount}}</span>新增用户
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{orderCount}}</span>新增订单
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{adminCount}}</span>新增管理员
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <div class='item total'>
                        <span class="num">总数据:</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{allUserCount}}</span>注册用户
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{allOrderCount}}</span>订单
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='item'>
                        <span class="num">{{allAdminCount}}</span>管理员
                    </div>
                </el-col>
            </el-row>
        </section>
        <tendency :sevenDay="sevenDay" :sevenData="sevenData"></tendency>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import tendency from '../../../components/tendency';
    import time from 'time-formater';
    import { userCount, orderCount, adminCount, totalUserCount, totalOrderCount, totalAdminCount } from '../../../service/getData';

    export default {
        data () {
            return {
                userCount: null,
                orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
                sevenDay: [],
                sevenData: [[], [], []]
            }
        },
        components: {
            headTop, tendency
        },
        mounted () {
            this.initData();
            for (let i = 6; i > -1; i--) {
                let date = time(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
                this.sevenDay.push(date);
            }
            this.getSevenData();
        },
        methods: {
            async initData () {
                const today = time(new Date()).format('YYYY-MM-DD');
                Promise.all([userCount(today), orderCount(today), adminCount(today), totalUserCount(), totalOrderCount(), totalAdminCount()])
                .then(res => {
                    this.userCount = res[0].count;
                    this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
                }).catch(e => {
                    console.log(err);
                });
            },
            async getSevenData () {
                let data = [[], [], []];
                this.sevenDay.forEach(date => {
                    data[0].push(userCount(date));
                    data[1].push(orderCount(date));
                    data[2].push(adminCount(date))
                });
                let tasks = [...data[0], ...data[1], ...data[2]];
                Promise.all(tasks).then(res => {
                    const resArr = [[], [], []];
                    res.forEach((item, index) => {
                        if (item.status === 1) {
                            resArr[Math.floor(index / 7)].push(item.count);
                        }
                    });
                    this.sevenData = resArr;
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>

<style lang='less' scoped>
    .main{
        padding: 20px;
        margin-bottom: 40px;
        h1{
            text-align: center;
            font-size: 30px;
            margin-bottom: 10px;
        }
        .item{
            text-align: center;
            background: #e5e9f2;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            .num{
                font-size: 26px;
            }
        }
        .today, .total{
            background: #ff9800;
            padding: 3px 0;
            .num{
                color: #fff;
                font-size: 22px;
            }
        }
        .total{
            background: #20a0ff;
        }
    }
</style>
