<template>
    <div id="userlist">
        <head-top></head-top>
        <div class="table-wrapper">
            <el-table ref="user" :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="100"></el-table-column>
                <el-table-column property="date" label="注册日期" width="220"></el-table-column>
                <el-table-column property="name" label="用户姓名" width="220"></el-table-column>
                <el-table-column property="address" label="注册地址"></el-table-column>
            </el-table>
        </div>
        <el-pagination style="margin-left: 40px; margin-bottom:40px" :page-size="20" background layout="total, prev, pager, next" :total="totalCount" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { totalUserCount, userList } from '../../../service/getData';

    export default {
        data () {
            return {
                totalCount: 0,
                tableData: [],
                offset: 0
            }
        },
        async mounted () {
            this.initData();
        },
        components: {
            headTop
        },
        methods: {
            async initData () {
                try {
                    const res = await totalUserCount();
                    if (res.status === 1) {
                        this.totalCount = res.count;
                    } else {
                        throw new Error('获取用户总数失败');
                    }
                    this.getUsers();
                } catch (e) {
                    console.log('获取数据失败', e);
                }
            },
            async getUsers () {
                const res = await userList(this.offset);
                res.forEach(item => {
                    let user = {};
                    user.date = item.registe_time;
                    user.name = item.username;
                    user.address = item.city;
                    this.tableData.push(user);
                });
            },
            handleCurrentChange (page) {
                this.offset = 20 * (page - 1);
                this.tableData = [];
                this.getUsers();
            }
        }
    }
</script>

<style lang='less' scoped>
    .table-wrapper{
        padding: 20px;
    }
</style>
