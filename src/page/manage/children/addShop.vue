<template>
    <div id="addshop">
        <head-top></head-top>

        <div class="wrapper">
            <el-form :model="form" :rules="rules" ref="form" label-width="140px">
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-autocomplete @select="chooseAddress" style="width: 100%;" v-model="form.address" :fetch-suggestions="querySearch" :trigger-on-focus="false" placeholder="请输入地址"></el-autocomplete>
                    <div style="line-height: 14px; margin-top: 5px;" v-if="city">当前城市：{{city.name}}</div>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.number="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺简介" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                 <el-form-item label="店铺标语" prop="promotion_info">
                    <el-input v-model="form.promotion_info"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类">
                    <el-cascader :options="cascaders" v-model="category"></el-cascader>
                </el-form-item>
                <el-form-item label="店铺特点" prop="description">
                    <div class="switchs">
                        <span>品牌保证</span> <el-switch v-model="form.is_premium"></el-switch>
                        <span>蜂鸟专送</span> <el-switch v-model="form.delivery_mode"></el-switch>
                        <span>新开店铺</span> <el-switch v-model="form.new"></el-switch>
                    </div>
                    <div class="switchs">
                        <span>外卖保</span> <el-switch v-model="form.bao"></el-switch>
                        <span>准时达</span> <el-switch v-model="form.zhun"></el-switch>
                        <span>开发票</span> <el-switch v-model="form.piao"></el-switch>
                    </div>
                </el-form-item>
                <el-form-item label="配送费">
                    <el-input-number v-model="form.float_delivery_fee" :min="0" :max="20"></el-input-number>
                </el-form-item>
                <el-form-item label="起送价">
                    <el-input-number v-model="form.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="营业时间">
                    <el-time-select v-model="form.startTime" placeholder="起始时间" :picker-options="{start: '5:30', step: '00:15', end: '23:30'}"></el-time-select>
                    <el-time-select v-model="form.endTime" placeholder="结束时间" :picker-options="{start: '5:30', step: '00:15', end: '23:30'}"></el-time-select>
                </el-form-item>
                <el-form-item label="上传店铺头像">
                    <el-upload :show-file-list="false" class="upload" :action="baseUrl + '/v1/addimg/shop'" :before-upload="beforeUpload" :on-success="res => uploadSuccess(res, 'image_path')">
                        <img v-if="form.image_path" :src="baseImgPath + form.image_path" class="image">
                        <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传营业执照">
                    <el-upload :show-file-list="false" class="upload" :action="baseUrl + '/v1/addimg/shop'" :before-upload="beforeUpload" :on-success="res => uploadSuccess(res, 'business_license_image')">
                        <img v-if="form.business_license_image" :src="baseImgPath + form.business_license_image" class="image">
                        <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传餐饮服务许可证">
                    <el-upload :show-file-list="false" class="upload" :action="baseUrl + '/v1/addimg/shop'" :before-upload="beforeUpload" :on-success="res => uploadSuccess(res, 'catering_service_license_image')">
                        <img v-if="form.catering_service_license_image" :src="baseImgPath + form.catering_service_license_image" class="image">
                        <i v-else class="el-icon-plus upload-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="优惠活动">
                    <el-select v-model="selectedIndex" @change="handleSelect">
                        <el-option v-for="(option, index) in options" :key="index" :label="option.name" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-table :data="tableData">
                    <el-table-column label="活动标题" prop="icon_name" align="center"></el-table-column>
                    <el-table-column label="活动名称" prop="name" align="center"></el-table-column>
                    <el-table-column label="活动详情" prop="description" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="80">
                        <template slot-scope="scope">
                            <el-button type="danger" @click='handleDelete(scope.$index)' size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="addShop" type="primary" size="medium" style="display: block; margin: 20px auto;">立即创建</el-button>
            </el-form>

            <el-dialog :visible.sync="showDialog" title="提示" :modal-append-to-body="false">
                <el-form>
                    <el-form-item label="请输入活动详情">
                        <el-input v-model="description"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button size="mini" @click="showDialog = false">取消</el-button>
                    <el-button size="mini" type="primary" @click="addActivity">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { baseUrl, baseImgPath } from '../../../utils/env';
    import { cityGuess, categoryList, addressList, addShop } from '../../../service/getData';

    export default {
        data () {
            return {
                baseUrl,
                baseImgPath,
                form: {
                    name: '',
                    address: '',
                    phone: null,
                    description: '',
                    promotion_info: '',
                    category: '',
                    is_premium: true,
                    delivery_mode: true,
                    new: true,
                    bao: true,
                    zhun: true,
                    piao: true,
                    float_delivery_fee: 5,
                    float_minimum_order_amount: 20,
                    startTime: '',
                    endTime: '',
                    image_path: '',
                    business_license_image: '',
                    catering_service_license_image: '',
                    activities: [],
                    latitude: '',
                    longitude: ''
                },
                city: null,
                cascaders: [],
                category: ['快餐便当', '简餐'],
                selectedIndex: 0,
                options: [
                    {name: '满减优惠', icon_name: '减'},
                    {name: '优惠大酬宾', icon_name: '特'},
                    {name: '新用户立减', icon_name: '新'},
                    {name: '进店领券', icon_name: '领'}
                ],
                rules: {
                    name: [
                        {required: true, message: '请输入店铺名称'}
                    ],
                    address: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话', trigger: 'change'},
                        {type: 'number', message: '电话号码必须是数字', trigger: 'change'}
                    ]
                },
                tableData: [
                    {icon_name: '减', name: '满减优惠', description: '满30减5，满60减8'}
                ],
                showDialog: false,
                description: ''
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
                this.getCity();
                this.getCategory();
            },
            async getCity () {
                try {
                   let res = await cityGuess();
                   this.city = {name: res.name, id: res.id};
                } catch (e) {
                    console.log('定位当前城市失败', e);
                }
            },
            async getCategory () {
                // 初始化级联选择器选项
                try {
                    let res = await categoryList();
                    if (res instanceof Array) {
                        res.forEach(item => {
                            let category = {
                                value: item.name,
                                label: item.name,
                                children: []
                            };
                            item.sub_categories.forEach((subitem, index) => {
                                if (index === 0) return;
                                category.children.push({
                                    value: subitem.name,
                                    label: subitem.name
                                });
                            });
                            this.cascaders.push(category);
                        });
                    }
                } catch (e) {
                    console.log('获取商家分类列表失败', e);
                }
            },
            async querySearch (query, cb) {
                try {
                    let cityList = await addressList({
                        keyword: query,
                        city_id: this.city.id
                    });
                    if (cityList instanceof Array) {
                        cityList.map(item => {
                            item.value = item.address;
                            return item;
                        });
                        cb(cityList);
                    }
                } catch (e) {
                    console.log('获取地址列表失败', e);
                }
            },
            chooseAddress (item) {
                this.form.latitude = item.latitude;
                this.form.longitude = item.longitude;
            },
            beforeUpload (file) {
                let rightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                let lt2M = file.size / 1024 / 1024 < 1.5;

                if (!rightType) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                    return false;
                }
                if (!lt2M) {
                    this.$message.error('上传图片大小不能超过1.5MB！');
                    return false;
                }
            },
            uploadSuccess (res, path) {
                if (res.status === 1) {
                    this.form[path] = res.image_path;
                } else {
                    this.$message.error('图片上传失败!');
                }
            },
            handleSelect () {
                this.showDialog = true;
            },
            handleDelete (index) {
                this.tableData.splice(index, 1);
            },
            addActivity () {
                this.showDialog = false;
                if (this.description === '') {
                    this.$message.warning('请输入活动详情');
                } else {
                    let option = this.options[this.selectedIndex];
                    this.tableData.push({
                        icon_name: option.icon_name,
                        name: option.name,
                        description: this.description
                    });
                    this.description = '';
                }
            },
            async addShop () {
                // 格式化商铺分类
                this.form.category = this.category.join('/');

                this.form.activities = this.tableData;

                let res = await addShop(this.form);
                if (res.status === 1) {
                    this.$message.success('商铺添加成功');
                    this.$refs.form.resetFields();
                } else {
                    this.$message.error(res.message);
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .wrapper{
        margin-top: 20px;
        display: flex;
        margin-left: 250px;
    }
    .switchs{
        margin-bottom: 10px;
    }
    .switchs .el-switch{
        margin-right: 15px;
    }
    .upload /deep/ .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
    }
    .upload /deep/ .el-upload:hover{
        border-color: #409eff;
    }
    .image{
        width: 120px;
        height: 120px;
        display: block;
    }
    .upload-icon{
        font-size: 28px;
        line-height: 120px;
        height: 120px;
        width: 120px;
        text-align: center;
        color: #8c939d;
    }
</style>
