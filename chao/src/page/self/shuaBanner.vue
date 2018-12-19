<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>刷手等级设置
            <el-button type="primary"  size="mini" class="bindbtn" @click='imgdialog=true'> 新增 </el-button>
          </p>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
            <el-table-column align="center" type="index" label="No."  header-align="center">
            </el-table-column>
            <el-table-column align="center" prop="img" label="图片"  header-align="center">
                <tempalte slot-scope="scope">
                  <img :src="scope.row.img" alt="" style="width:375px;height:150px">
                </tempalte>
            </el-table-column>
            <el-table-column align="center"  label="操作"  header-align="center" width='220'>
              <template slot-scope="scope">
                <el-button type="primary" plain round size="mini" @click="xiu(scope.$index)">修改</el-button>
                <el-button type="primary" plain round size="mini" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新增修改图片-->
    <el-dialog title="轮播图片上传" :visible.sync="imgdialog" width='30%' >
      <el-upload
        class="avatar-uploader"
        action="http://www.rwgh66.com/sd_admin/admin/upload/app"
        :show-file-list="false"
        :on-preview="handlePictureCardPreview"
        :on-success="getUrl">
        <img v-if="imgs" :src="imgs" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!--<el-dialog :visible.sync="dialogVisible">-->
        <!--<img width="100%" :src="imgs" alt="">-->
      <!--</el-dialog>-->
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="sureImg" size='small'>确定</el-button>
          <el-button @click="cancel" size='small'>取消</el-button>
        </span>
    </el-dialog>
    <!--确认-->
  </div>
</template>

<script>
  import {bannerSelect,bannerAdd,bannerDel} from '../../api/self'
    export default {
        name: "shuaBanner",
      data(){
          return{
            tableData: [],
            imgdialog:false,
            imgs:'',  //显示
            img:'',   //上传
            // dialogImageUrl: '',
            // dialogVisible: false,
            ids:''
          }
      },
      mounted(){
        bannerSelect().then(response=>{
          const data=response;
          console.log(data)
          this.tableData=data.banners;
          console.log(this.tableData)
        }).catch()
      },
      methods:{
        handlePictureCardPreview(file) {
          // this.dialogImageUrl = file.url;
          // this.dialogVisible = true;
        },
        getUrl(response,file){
          console.log(file);
          // console.log(response);
          this.imgs = response.src;
          this.img=response.path;
        },
        //新增修改图片
        sureImg(){
          bannerAdd(this.img,this.ids).then(response=>{
            const data=response;
            console.log(data);
            if(data.msg==1){
              this.imgs='';
              this.img='';
              this.ids='';
              this.imgdialog=false;
              setTimeout(function(){
                that.$router.go(0);
              },500)
            }else{
              this.$message.warning('上传失败！')
            }
          }).catch()
        },
        //删除图片
        del(id){
          var that=this;
          this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            bannerDel(id).then(response=>{
              const data=response;
              console.log(data)
              if(data.msg==1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                setTimeout(function(){
                  that.$router.go(0);
                },500)
              }
            }).catch()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        xiu(index){
          console.log(index);
          var obj=this.tableData[index];
          console.log(obj);
          this.imgs=obj.img;
          this.imgdialog=true;
          this.ids=id;
          console.log(this.ids);
        },
        cancel(){
          this.imgdialog=false;
          this.imgs='';
        }
      }
    }
</script>

<style scoped>
  .stores-title{
    font-size:16px;
    text-align: left;
    height:20px;
    line-height:20px;
    border-left:4px solid #4782ef;
    padding-left:6px;
    font-weight:bold;
    margin-bottom:20px;
  }
  .tips{
    font-size:14px;
    color:#f56c6c;
    text-align: left;
    padding-left:10px;
  }
  .bindbtn{
    margin-left:50px;
  }
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#fff;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
  }
  .loading-tips .alert-label{
    margin-right:10px;
    font-weight:bold;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
    display:block;
  }
  .up-img{
    width:300px;
    height:300px;
  }
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow: hidden;
  }
  .bigimg{
    transform: scale(1);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .touBox{
    width:100%;
  }
  .touBox .touList{
    margin-bottom: 10px;
    text-align:left;
    font-size:14px;
    color:rgba(0,0,0,0.45);
    vertical-align:text-top;
  }
  .touLabel{
    color:#000;
    margin-right:10px;
  }
  .danInp{
    width:60%;
  }
  div.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  div.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    height: 150px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
  .avatar-uploader-icon:hover{
    border-color: #409EFF;
  }
  .avatar {
    width: 375px;
    height: 150px;
    display: block;
  }
</style>
