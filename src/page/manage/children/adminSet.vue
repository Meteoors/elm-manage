<template>
    <div id="adminset">
        <head-top></head-top>
        <header>管理员信息</header>
        <el-row>
            <el-col :span="10" :offset="7" style="background: #f9fafc;">
                <el-form label-width="120px" style="padding-top: 20px;">
                    <el-form-item label="姓名：">
                        <span>{{adminInfo.user_name}}</span>
                    </el-form-item>
                    <el-form-item label="注册时间：">
                        <span>{{adminInfo.create_time}}</span>
                    </el-form-item>
                    <el-form-item label="管理员权限：">
                        <span>{{adminInfo.admin}}</span>
                    </el-form-item>
                    <el-form-item label="管理员ID：">
                        <span>{{adminInfo.id}}</span>
                    </el-form-item>
                    <el-form-item label="更换头像：">
                        <el-upload class="upload" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload">
                            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                            <i v-else class="upload-icon el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop';
    import { mapState, mapActions } from 'vuex';
    import { baseUrl, baseImgPath } from '../../../utils/env';

    export default {
        data () {
            return {
                baseUrl,
                baseImgPath
            }
        },
        computed: {
            ...mapState([
                'adminInfo'
            ])
        },
        components: {
            headTop
        },
        methods: {
            ...mapActions([
                'getAdminData'
            ]),
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
            uploadSuccess (res) {
                if (res.status === 1) {
                    this.getAdminData();
                } else {
                    this.$message.error('头像上传失败!');
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    header{
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        color: #666;
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
        display: block;
        border-radius: 6px;
    }
    .upload-icon{
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        font-size: 28px;
        color: #8c939d;
    }
    .el-form-item /deep/ label, .el-form-item span{
        font-size: 16px;
        color: #606266;
    }
</style>
