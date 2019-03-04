<template>
    <div id='shoplist'>
        <head-top></head-top>
        <div class="table-wrapper">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="data">
                        <el-form label-position="left" inline>
                            <el-form-item label="店铺名称">
                                <span>{{data.row.name}}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{data.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <span>{{data.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{data.row.id}}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{data.row.phone}}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span>{{data.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{data.row.recent_order_num}}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{data.row.category}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="店铺名称" ></el-table-column>
                <el-table-column property="address" label="店铺地址" ></el-table-column>
                <el-table-column property="description" label="店铺介绍" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type='succcess' @click="addFood(scope.$index, scope.row)">添加食品</el-button>
                        <el-button size="mini" type="dangerous" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style lang='less' scoped>
    .table-wrapper{
        padding: 20px;
    }
</style>
