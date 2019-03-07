<template>
    <div id="orderlist">
        <head-top></head-top>

        <div class="table-wrapper">
            <el-table :data="tableData" @expand-change="expand" :row-key="row => row.index">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form class="form" label-position="left" inline>
                            <el-form-item label="用户名">
                                <span>{{scope.row.user_name}}</span>
                            </el-form-item>
                            <el-form-item label="店铺名称">
                                <span>{{scope.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="收货地址">
                                <span>{{scope.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{scope.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{scope.row.restaurant_address}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="订单 ID" align="center"></el-table-column>
                <el-table-column prop="total_amount" label="总价格" align="center"></el-table-column>
                <el-table-column prop="status" label="订单状态" align="center"></el-table-column>
            </el-table>
        </div>

        <el-pagination style="margin-left: 40px; margin-bottom: 40px;" background layout="prev, pager, next, total" :total="totalCount" @current-change="currentChange" :page-size="20"></el-pagination>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { totalOrderCount, orderList, userDetail, addressDetail, shopDetail } from '../../../service/getData';

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
                let res = await totalOrderCount();
                if (res.status === 1) {
                    this.totalCount = res.count;
                } else {
                    console.log('获取订单总数失败');
                }
                this.getOrders();
            },
            async getOrders () {
                this.tableData = [];
                let res = await orderList();
                if (res instanceof Array) {
                    res.forEach((item, index) => {
                        let order = {};
                        order.id = item.id;
                        order.total_amount = item.total_amount;
                        order.status = item.status_bar.title;
                        order.user_id = item.user_id; // user_name
                        order.restaurant_name = item.restaurant_name;
                        order.address_id = item.address_id; // address
                        order.restaurant_id = item.restaurant_id; // restaurant_address
                        order.index = index;

                        this.tableData.push(order);
                    });
                }
            },
            async expand (row, expands) {
                if (expands.length > 1) {
                    expands.shift();
                }
                if (expands.length === 1) {
                    this.getExpandData(row);
                }
            },
            async getExpandData (row) {
                const userInfo = await userDetail(row.user_id);
                const addressInfo = await addressDetail(row.address_id);
                const restaurantInfo = await shopDetail(row.restaurant_id);

                this.tableData.splice(row.index, 1, {...row, ...{user_name: userInfo.username, address: addressInfo.address, restaurant_address: restaurantInfo.address}});
            },
            currentChange (page) {
                this.offset = 20 * (page - 1);
                this.initData();
            }
        }
    }
</script>

<style lang='less' scoped>
    .table-wrapper{
        padding: 20px;
    }
    .form{
        font-size: 0;
    }
    .form .el-form-item{
        width: 50%;
        margin: 0;
    }
    .form /deep/ label{
        width: 90px;
        color: #99a9bf;
    }
</style>
