<template>
    <div id="addshop">
        <head-top></head-top>

        <div class="wrapper">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px">
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                    <div>当前城市：广州</div>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.number="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺标语" prop="promotion_info">
                    <el-input v-model="form.promotion_info"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类" prop="category">
                    <el-cascader :options="options" v-model="form.category"></el-cascader>
                </el-form-item>
                <el-form-item label="店铺特点">
                    <div>
                        <span>品牌保证</span><el-switch v-model="form.is_premium"></el-switch>
                        <span>蜂鸟专送</span><el-switch v-model="form.delivery_mode"></el-switch>
                        <span>新开店铺</span><el-switch v-model="form.new"></el-switch>
                    </div>
                    <div>
                        <span>外卖保</span><el-switch v-model="form.bao"></el-switch>
                        <span>准时达</span><el-switch v-model="form.zhun"></el-switch>
                        <span>开发票</span><el-switch v-model="form.piao"></el-switch>
                    </div>
                </el-form-item>
                <el-form-item label="配送费">
                    <el-input-number v-model="form.float_delivery_fee" size="small" min="0" max="20"></el-input-number>
                </el-form-item>
                <el-form-item label="起送价">
                    <el-input-number v-model="form.float_minimum_order_amount" size="small" min="0" max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="营业时间">
                    <el-time-select v-model="form.startTime" placeholder="起始时间" :picker-options="{start: '5:30', step: '00:15', end: '23:30'}"></el-time-select>
                    <el-time-select v-model="form.endTime" placeholder="结束时间" :picker-options="{start: '5:30', step: '00:15', end: '23:30'}"></el-time-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';

    export default {
        data () {
            return {
                form: {},
                options: [],
                rules: {
                    name: [
                        {required: true, message: '请输入店铺名称'}
                    ]
                }
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

            }
        }
    }
</script>

<style lang='less' scoped>
    .wrapper{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
</style>
