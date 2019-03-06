<template>
    <div id='shoplist'>
        <head-top></head-top>
        <div class="table-wrapper">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="data">
                        <el-form label-position="left" inline class="form">
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
                <el-table-column property="name" label="店铺名称" align="center"></el-table-column>
                <el-table-column property="address" label="店铺地址" align="center"></el-table-column>
                <el-table-column property="description" label="店铺介绍" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button style="padding: 5px" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button style="padding: 5px" size="mini" type="success" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
                        <el-button style="padding: 5px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination style="margin-left: 40px; margin-bottom:40px" background layout="prev, pager, next, total" :page-size="20" :total="totalCount" @current-change="handleCurrentChange"></el-pagination>
        <el-dialog title="修改店铺信息" :visible.sync="showDialog" :modal-append-to-body="false">
            <el-form :model="form" label-width="100px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-autocomplete :fetch-suggestions="querySearch" :trigger-on-focus="false" v-model="form.address" placeholder="请输入地址" style="width: 100%;"></el-autocomplete>
                    <span>当前城市：广州</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类">
                    <el-cascader :options="options" v-model="selectedOption" change-on-select></el-cascader>
                </el-form-item>
                <el-form-item label="商铺图片">
                    <el-upload class="upload" :action="baseUrl + '/v1/addimg/shop'" :before-upload="beforeUpload" :on-success="uploadSuccess" :show-file-list="false">
                        <img v-if="form.image_path" :src="baseImgPath + form.image_path" class="avatar">
                        <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="showDialog = false" size="small">取 消</el-button>
                <el-button @click="updateShop" type="primary" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import { cityGuess, shopCount, shopList, categoryList, addressList, updateRestaurant, deleteShop } from '../../../service/getData';
    import { baseUrl, baseImgPath } from '../../../utils/env';

    export default {
        data () {
            return {
                tableData: [],
                totalCount: 0,
                offset: 0,
                city: null,
                showDialog: false,
                form: {},
                baseUrl,
                baseImgPath,
                options: [],
                selectedOption: []
            }
        },
        mounted () {
            this.initData();
        },
        methods: {
            async initData () {
                // 取得商铺数量
                let res = await shopCount();
                if (res.status === 1) {
                    this.totalCount = res.count;
                }

                // 定位当前城市
                this.city = await cityGuess();
                this.getShops();
            },
            async getShops () {
                this.tableData = {}; // 清空表格数据
                let {latitude, longitude} = this.city;
                let res = await shopList({latitude, longitude, offset: this.offset});
                if (res instanceof Array) {
                    res.forEach(item => {
                        let shop = {};
                        shop.name = item.name;
                        shop.address = item.address;
                        shop.description = item.description;
                        shop.id = item.id;
                        shop.phone = item.phone;
                        shop.rating = item.rating;
                        shop.recent_order_num = item.recent_order_num;
                        shop.category = item.category;
                        shop.image_path = item.image_path;
                        this.tableData.push(shop);
                    });
                } else {
                    console.log('获取商家列表失败!');
                }
            },
            handleCurrentChange (page) {
                this.offset = 20 * (page - 1);
                this.getShops();
            },
            handleEdit (index, data) {
                this.showDialog = true;
                this.form = data;
                // 把商品分类转换为数组，便于级联选择器使用
                this.selectedOption = data.category.split('/');
                if (!this.options.length) {
                    this.getCategory();
                }
            },
            beforeUpload (file) {
                const rightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const lt2M = file.size / 1024 / 1024 < 1.5;

                if (!rightType) {
                    this.$message({
                        type: 'error',
                        message: '上传头像图片只能是 JPG 格式!'
                    });
                    return false;
                }
                if (!lt2M) {
                    this.$message({
                        type: 'error',
                        message: '上传头像图片大小不能超过1.5MB!'
                    });
                    return false;
                }
            },
            uploadSuccess (res) {
                if (res.status === 1) {
                    this.form.image_path = res.image_path;
                } else {
                    this.$message.error('上传头像失败!');
                }
            },
            async getCategory () {
                const categories = await categoryList();

                // 格式化分类列表
                categories.forEach(item => {
                    let option = {
                        value: item.name,
                        label: item.name
                    }
                    if (item.sub_categories.length) {
                        option.children = [];
                        item.sub_categories.forEach((subitem, index) => {
                            if (index === 0) return;
                            option.children.push({
                                value: subitem.name,
                                label: subitem.name
                            });
                        });
                    }
                    this.options.push(option);
                });
            },
            async querySearch (query, cb) {
                if (query !== '') {
                    let cityList = await addressList({city_id: this.city.id, keyword: query});
                    if (cityList instanceof Array) {
                        // 格式化地址列表，以便输入建议使用
                        cityList.map(item => {
                            item.value = item.address;
                            return item;
                        });
                        cb(cityList);
                    }
                }
            },
            async updateShop () {
                this.showDialog = false;
                // 更新商品分类
                this.form.category = this.selectedOption.join('/');

                try {
                    let res = await updateRestaurant(this.form);
                    if (res.status === 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getShops();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                } catch (e) {
                    console.log('更新店铺信息失败', e);
                }
            },
            addFood (index, row) {
                this.$router.push({path: '/manage/addfood', query: {restaurant_id: row.id}});
            },
            handleDelete (index, data) {
                this.$confirm('确定删除该商家吗?', '提示', {
                    confirmButtonText: '确定',
                    cacelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteShop(data.id);
                    if (res.status === 1) {
                        this.$message.success('删除店铺成功！');
                        this.getShops();
                    } else {
                        this.$message.error(res.message);
                        console.log('删除店铺失败');
                    }
                }).catch(() => {
                    this.$message.info('已取消删除');
                })
            }
        },
        components: {
            headTop
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
    // 因为label标签是子组件的元素，当scoped属性存在时，需使用深度作用选择器( >>> 或 /deep/ )才能选中label标签
    .form /deep/ .el-form-item__label{
        width: 90px;
        color: #99a9bf;
    }
    .upload /deep/ .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        position: relative;
    }
    .upload /deep/ .el-upload:hover{
        border-color: #409eff;
    }
    .upload-icon{
        font-size: 28px;
        width: 120px;
        height: 120px;
        line-height: 120px;
        color: #8c939d;
        text-align: center;
    }
    .avatar{
        height: 120px;
        width: 120px;
        display: block;
    }
</style>
