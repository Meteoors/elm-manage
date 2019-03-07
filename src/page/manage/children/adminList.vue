<template>
    <div id="adminlist">
        <head-top></head-top>

        <div class="wrapper">
            <el-table :data="tableData">
                <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="create_time" label="注册日期" align="center"></el-table-column>
                <el-table-column prop="city" label="地址" align="center"></el-table-column>
                <el-table-column prop="admin" label="权限" align="center"></el-table-column>
            </el-table>
        </div>

        <el-pagination @current-change="currentChange" :page-size="20" :total="totalCount" background style="margin-left: 40px; margin-bottom: 40px;" layout="prev, pager, next, total"></el-pagination>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { totalAdminCount, adminList } from '../../../service/getData';

    export default {
        data () {
            return {
                tableData: [],
                totalCount: 0,
                offset: 0
            }
        },
        mounted () {
            this.initData();
        },
        components: {
            headTop
        },
        methods: {
            async initData () {
                let res = await totalAdminCount();
                if (res.status === 1) {
                    this.totalCount = res.count;
                } else {
                    console.log('获取管理员总数失败');
                }
                this.getAdmins();
            },
            async getAdmins () {
                this.tableData = [];
                try {
                    let res = await adminList(this.offset);
                    if (res.status === 1) {
                        res.data.forEach(item => {
                            let admin = {};
                            admin.user_name = item.user_name;
                            admin.create_time = item.create_time;
                            admin.city = item.city;
                            admin.admin = item.admin;
                            this.tableData.push(admin);
                        });
                    } else {
                        throw new Error(res.message);
                    }
                } catch (e) {
                    console.log('获取管理员列表失败', e);
                }
            },
            currentChange (page) {
                this.offset = 20 * (page - 1);
                this.initData();
            }
        }
    }
</script>

<style lang='less' scoped>
    .wrapper{
        padding: 20px;
    }
</style>
