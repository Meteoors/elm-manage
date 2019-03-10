<template>
    <div id="addfood">
        <head-top></head-top>

        <el-row>
            <el-col :span="14" :offset="5">
                <header>选择食品种类</header>
                <el-form class="category_from form" label-width="130px" ref="categoryForm" :model="categoryForm">
                    <el-form-item label="食品种类" class="category">
                        <el-select v-model="form.category_id" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="control" :class="showCategory ? 'show_control' : ''">
                        <el-form-item label="食品种类" prop="name" class="name">
                            <el-input v-model="categoryForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="种类描述" prop="description">
                            <el-input v-model="categoryForm.description"></el-input>
                        </el-form-item>
                        <el-button type="primary" size="small" @click="addCategory">提交</el-button>
                    </div>
                    <div class="add_category" @click="showCategory = !showCategory">
                        <i :class="showCategory ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i> <span>添加食品种类</span>
                    </div>
                </el-form>

                <header>添加食品</header>
                <el-form class="form add_form" :model="form" ref="form" label-width="110px" :rules="rules">
                    <el-form-item label="食品名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="食品活动" prop="activity">
                        <el-input v-model="form.activity"></el-input>
                    </el-form-item>
                    <el-form-item label="食品详情" prop="description">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="上传食品图片">
                        <el-upload class="upload" :action="baseUrl + '/v1/addimg/food'" :before-upload="beforeUpload" :on-success="uploadSuccess">
                            <img :src="baseImgPath + form.image_path" v-if="form.image_path" class="image">
                            <i v-else class="el-icon-plus upload-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="食品特点" prop="attributes">
                        <el-select v-model="form.attributes" multiple placeholder="请选择">
                            <el-option v-for="(item, index) in attrOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="食品规格">
                        <el-radio v-model="radio" :label="0">单规格</el-radio>
                        <el-radio v-model="radio" :label="1">多规格</el-radio>
                    </el-form-item>
                    <el-form-item v-show="!radio" label="包装费">
                        <el-input-number v-model="form.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item v-show="!radio" label="价格">
                        <el-input-number v-model="form.specs[0].price" :min="0" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-button class="btn" v-show="radio" size="mini" @click="showAddSpec = true" type="primary">添加规格</el-button>
                    <el-table :data="form.specs" v-show="radio">
                        <el-table-column label="规格" align="center" prop="specs"></el-table-column>
                        <el-table-column label="包装费" align="center" prop="packing_fee"></el-table-column>
                        <el-table-column label="价格" align="center" prop="price"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="danger" size="mini" @click="deleteSpec(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="btn" size="small" type="primary" @click="addFood">确认添加食品</el-button>
                </el-form>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="showChooseShop" title="提示" :before-close="handleClose" :modal-append-to-body="false">
            <span>添加食品需要选择一个商铺，现在就去选择商铺吗？</span>
            <div slot="footer">
                <el-button size="small" @click="handleClose">取消</el-button>
                <el-button size="small" type="primary" @click="chooseShop">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="showAddSpec" title="添加规格" :modal-append-to-body="false">
            <el-form :model="specForm" :rules="specRules" ref="specForm" label-width="100px">
                <el-form-item label="规格" prop="specs">
                    <el-input v-model="specForm.specs"></el-input>
                </el-form-item>
                <el-form-item label="包装费" prop="packing_fee">
                    <el-input-number v-model="specForm.packing_fee" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="specForm.price" :min="0" :max="10000"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="medium">取消</el-button>
                <el-button size="medium" type="primary" @click="addSpec">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { foodCategoryList, addCategory, addFood } from '../../../service/getData';
    import { baseUrl, baseImgPath } from '../../../utils/env';

    export default {
        data () {
            return {
                form: {
                    category_id: null,
                    restaurant_id: null,
                    name: '',
                    image_path: '',
                    specs: [
                        {specs: '默认', packing_fee: 0, price: 20}
                    ],
                    description: '',
                    activity: '',
                    attributes: []
                },
                categoryForm: {
                    name: '',
                    description: '',
                    restaurant_id: null
                },
                specForm: {
                    specs: '',
                    packing_fee: 0,
                    price: 20
                },
                options: [],
                attrOptions: [
                    {label: '新品', value: '新'},
                    {label: '招牌', value: '招牌'}
                ],
                rules: {
                    name: [
                        {required: true, message: '请输入食品名称', trigger: 'blur'}
                    ]
                },
                specRules: {
                    specs: [
                        {required: true, message: '请输入规格', trigger: 'blur'}
                    ]
                },
                radio: 0, // 0代表单规格，1代表多规格
                showCategory: false,
                showChooseShop: false,
                showAddSpec: false,
                restaurant_id: null,
                baseUrl,
                baseImgPath
            }
        },
        mounted () {
            this.initData();
        },
        components: {
            headTop
        },
        methods: {
            initData () {
                if (this.$route.query.restaurant_id !== undefined) {
                    this.restaurant_id = this.form.restaurant_id = this.categoryForm.restaurant_id = this.$route.query.restaurant_id;
                    this.getCategory();
                } else {
                    this.showChooseShop = true;
                }
            },
            async getCategory () {
                this.options = [];
                try {
                    let res = await foodCategoryList(this.form.restaurant_id);
                    if (res.status === 1) {
                        res.category_list.forEach(item => {
                            this.options.push({
                                name: item.name,
                                id: item.id
                            });
                        });
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    console.log('获取食品种类列表失败', e);
                }
            },
            async addCategory () {
                let res = await addCategory(this.categoryForm);
                if (res.status === 1) {
                    this.$message.success('添加食品种类成功');
                    this.getCategory();
                    this.$refs.categoryForm.resetFields();
                } else {
                    this.$message.error(res.message);
                }
            },
            handleClose () {
                this.$message.warning('取消');
                this.showChooseShop = false;
            },
            chooseShop () {
                this.$router.push('/manage/shoplist');
            },
            beforeUpload (file) {
                let rightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                let lt2M = file.size / 1024 / 1024 < 1.5;

                if (!rightType) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                    return false;
                }
                if (!lt2M) {
                    this.$message.error('上传图片大小不能超过1.5MB!');
                    return false;
                }
            },
            uploadSuccess (res) {
                if (res.status === 1) {
                    this.form.image_path = res.image_path;
                } else {
                    this.$message.error('图片上传失败!');
                }
            },
            deleteSpec (index) {
                this.form.specs.splice(index, 1);
            },
            addSpec () {
                this.form.specs.push(this.specForm);
                this.showAddSpec = false;
                this.$refs.specForm.resetFields();
            },
            async addFood () {
                if (!this.form.specs.length) {
                    this.$message.error('至少填写一种规格');
                }
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        try {
                            let res = await addFood(this.form);
                            if (res.status === 1) {
                                this.$message.success('添加商品成功');
                                this.$refs.form.resetFields();
                            } else {
                                this.$message.error(res.message);
                            }
                        } catch (e) {
                            console.log('添加商品失败', e);
                        }
                    }
                });
            }
        },
        watch: {
            '$route' (to, from) {
                // 当使用路由参数(params)/查询参数(query)时，组件实例会被复用，生命周期钩子（mounted）不再被调用，此时通过监听$route对象响应变化
                // 必须排除从当前路由（/manage/addfood）跳转至其他路由的情况
                if (to.path === '/manage/addfood') {
                    this.initData();
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    header{
        margin-top: 10px;
        line-height: 40px;
        text-align: center;
    }
    .form{
        border: 1px solid #eaeefb;
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6);
        border-radius: 6px;
        margin: 0 auto 20px;
    }
    .category_from{
        background: #f9fafc;
        .el-form-item{
            padding-right: 25px;
        }
        .category{
            border-bottom: 1px solid #eaeefb;
            background: #fff;
            padding: 10px 25px 20px 0;
            overflow: hidden;
            margin-bottom: 0;
        }
        .name{
            margin-top: 10px;
        }
        .control{
            height: 0;
            overflow: hidden;
            transition: all .4s;
        }
        .show_control{
            height: 185px;
        }
        .el-button{
            display: block;
            margin: 0 auto;
        }
    }
    .add_category{
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        background: #fff;
        color: #ccc;
        transition: all .4s;
        span{
            color: #999;
        }
    }
    .add_category:hover{
        background: #f9fafc;
        color: #20a0ff;
        span{
            color: #20a0ff;
        }
    }
    .add_form{
        padding: 20px;
        .btn{
            display: block;
            margin: 0 auto;
        }
        .btn:ntn-of-type(1){
            margin-bottom: 20px;
        }
        .btn:nth-of-type(2){
            margin-top: 20px;
        }
    }
    .upload /deep/ .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
    }
    .upload /deep/ .el-upload:hover{
        border-color: #409eff;
    }
    .upload-icon{
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        color: #8c939d;
        font-size: 28px;
    }
    .image{
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
