<template>
    <div id="foodlist">
        <head-top></head-top>

        <div class="table-wrapper">
            <el-table :data="tableData" style="width:100%;" @expand-change="expand" :row-key="row => row.index">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="form">
                            <el-form-item label="食品名称">
                                <span>{{scope.row.name}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{scope.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="食品 ID">
                                <span>{{scope.row.item_id}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{scope.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{scope.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{scope.row.restaurant_address}}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{scope.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{scope.row.category_name}}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{scope.row.month_sales}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name" align="center"></el-table-column>
                <el-table-column label="食品介绍" prop="description" align="center"></el-table-column>
                <el-table-column label="评分" prop="rating" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination style="margin-bottom: 40px; margin-left: 40px;" :total="totalCount" :page-size="20" background layout="prev, pager, next, total" @current-change="handleCurrentChange"></el-pagination>

        <el-dialog title="修改食品信息" :visible.sync="showDialog" :modal-append-to-body="false">
            <el-form :model="selectTable" label-width="100px">
                <el-form-item label="食品名称">
                    <el-input v-model="selectTable.name"></el-input>
                </el-form-item>
                <el-form-item label="食品介绍">
                    <el-input v-model="selectTable.description"></el-input>
                </el-form-item>
                <el-form-item label="食品分类">
                    <el-select v-model="selectTable.category_name">
                        <el-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-upload class="upload" :action="baseUrl + '/v1/addimg/food'" :on-success="uploadSuccess" :before-upload="beforeUpload" :show-file-list="false">
                        <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                        <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-table :data="specsTable" style="margin-bottom: 20px;">
                <el-table-column align="center" label="规格" prop="specs"></el-table-column>
                <el-table-column align="center" label="包装费" prop="packing_fee"></el-table-column>
                <el-table-column align="center" label="价格" prop="specTable.price"></el-table-column>
                <el-table-column align="center" label="操作" slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteSpec(scope.$index, scope.row)">删除</el-button>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="addSpec" style="display: block; margin: 0 auto;">添加规格</el-button>
            <div slot="footer">
                <el-button @click="showDialog = false" size="small">取消</el-button>
                <el-button @click="updateFood" size="small" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { foodCount, foodList, shopDetail, categoryDetail, foodCategoryList } from '../../../service/getData';
    import { baseUrl, baseImgPath } from '../../../utils/env';
    

    export default {
        data () {
            return {
                tableData: [],
                totalCount: 0,
                offset: 0,
                selectTable: {},
                showDialog: false,
                options: [],
                baseUrl,
                baseImgPath,
                showSpecDialog: false
            }
        },
        mounted () {
            this.initData();
        },
        components: {
            headTop
        },
        computed: {
            // 规格表格数据
            specsTable () {
                let specs = [];
                if (this.selectTable.specfoods.length) {
                    this.selectTable.specfoods.forEach(item => {
                        specs.push({
                            specs: item.specs_name,
                            packing_fee: item.packing_fee,
                            price: item.price
                        });
                    });
                }
                return specs;
            }
        },
        methods: {
            async initData () {
                let res = await foodCount();
                if (res.status === 1) {
                    this.totalCount = res.count;
                } else {
                    console.log('获取食品数量失败');
                }
                this.getFoods();
            },
            async getFoods () {
                this.tableData = [];
                let foods = await foodList(this.offset);
                foods.forEach((item, index) => {
                    let food = {};
                    food.name = item.name;
                    food.item_id = item.item_id;
                    food.restaurant_id = item.restaurant_id;
                    food.description = item.description;
                    food.rating = item.rating;
                    food.category_id = item.category_id;
                    food.month_sales = item.month_sales;
                    food.index = index;
                    food.image_path = item.image_path;
                    food.specfoods = item.specfoods;
                    this.tableData.push(food);
                });
            },
            expand (row, expands) {
                if (expands.length > 1) {
                    expands.shift();
                }
                if (expands.length === 1) {
                    this.getExpandData(row);
                }
            },
            async getExpandData (row, isExpand = true) {
                // 获取餐馆名称、餐馆地址属性
                let shop = await shopDetail(row.restaurant_id);
                try {
                    this.selectTable = {restaurant_name: shop.name, restaurant_address: shop.address};
                } catch (e) {
                    console.log('获取商铺详情失败');
                }

                // 获取食品分类属性
                let category = await categoryDetail(row.category_id);
                try {
                    this.selectTable.category_name = category.name;
                } catch (e) {
                    console.log('获取食品种类详情失败');
                }

                this.selectTable = {...this.selectTable, ...row};
                if (isExpand) {
                    this.tableData.splice(row.index, 1, this.selectTable);
                }
            },
            handleEdit (index, row) {
                this.showDialog = true;
                this.getExpandData(row, false);
                this.getCategoryOptions();
            },
            async getCategoryOptions () {
                let res = await foodCategoryList(this.selectTable.restaurant_id);
                if (res.status === 1) {
                    res.category_list.forEach(item => {
                        let category = {
                            label: item.name,
                            value: item.id
                        };
                        this.options.push(category);
                    });
                }
            },
            beforeUpload (file) {
                let rightType = (file.type === 'jpeg') || (file.type === 'png');;
                let lt2M = file.size / 1024 / 1024 < 1.5;

                if (!rightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    return false;
                }
                if (!lt2M) {
                    this.$message.error('上传头像图片大小不能超过1.5MB!');
                    return false;
                }
            },
            uploadSuccess (res) {
                if (res.status === 1) {
                    this.selectTable.image_path = res.image_path;
                } else {
                    this.$message.error('上传图片失败!');
                }
            },
            deleteSpec (index, row) {
                this.selectTable.specfoods.splice(index, 1);
            },
            addSpec () {
                this.showSpecDialog = true;
            },
            updateFood () {
                // 7个参数item_id, name, description, image_path, restaurant_id, category_id, specfoods（[{specs, packing_fee, price}]）   （接口55）
                
            },
            handleDelete (index, row) {

            },
            handleCurrentChange (page) {
                this.offset = 20 * (page - 1);
                this.getFoods();
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
    .upload /deep/ .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
    }
    .upload /deep/ .el-upload:hover{
        border-color: #409eff;
    }
    .avatar{
        width: 120px;
        height: 120px;
    }
    .upload-icon{
        font-size: 28px;
        line-height: 120px;
        height: 120px;
        width: 120px;
        color: #8c939d;
        text-align: center;
    }
</style>
