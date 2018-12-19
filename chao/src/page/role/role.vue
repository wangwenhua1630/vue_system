<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
            <el-form-item label="职位">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option :label="item.roleName" :value="item.id" v-for='item in roles' :key='item.id' ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size='small' round  @click='search'>查询</el-button>
              <el-button type="warning" size='small' round  @click='adddialog=true' >人员新增</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
            <el-table-column  prop="roles" label="职位" header-align="center">
            </el-table-column>
            <el-table-column prop="realName" label="姓名"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="username" label="手机号"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="danger"  size="mini" round plain @click='del(scope.row.id)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 新增人员 -->
    <el-dialog  title="人员新增" :visible.sync="adddialog" width="30%" >
      <el-form ref="forms" :model="forms" :rules="rules" label-width="140px">
        <el-form-item label="职位" prop="job">
          <el-select  placeholder="请选择" class="select" v-model='forms.job' style='width:100%;'  >
             <el-option :label="item.roleName" :value="item.id" v-for='item in roles' :key='item.id' ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop='name'>
          <el-input v-model="forms.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop='phone'>
          <el-input v-model="forms.phone"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop='loginPassword'>
          <el-input type='password' v-model="forms.loginPassword"></el-input>
        </el-form-item>
        <el-form-item label="操作密码" prop='caoPassword'>
          <el-input type='password' v-model="forms.caoPassword"></el-input>
        </el-form-item>
         <el-form-item label="确认操作密码" prop='quePassword'>
          <el-input type='password' v-model="forms.quePassword"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button type='primary'  @click="addrole('forms')" size='small' >确定</el-button>
          <el-button @click="adddialog = false" size='small' >返回</el-button>
        </el-form-item>
      </el-form>
      
    </el-dialog>
     <!--**删除角色**-->
    <el-dialog title='删除角色' width='30%' :visible.sync="hiddedialog" >
      <p class='hidde-title'>您将删除该人，请输入密码确认。</p>
      <el-input  type='password' v-model="input" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="deletes" size='small'>确认</el-button>
        <el-button @click="hiddedialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {isvalidPhone} from '../../until/regex';
    import {role,allUser,deleateUser,addRole} from '../../api/api';
    var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
    }
    export default {
        name: "index",
        data(){
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.forms.caoPassword) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            adddialog:false,
            form:{
              num:'',
              name:'',
              state: '',
            },
            forms:{
              job:'',
              name:'',
              phone:'',
              loginPassword:'',
              caoPassword:'',
              quePassword:''
            },
            roles:[],
            tableData:[],
            totalPages:0,
            input:'',
            hiddedialog:false,
            delId:'',
            currentPage:1,
            rules:{
              phone:[{required:true,trigger:'blur',validator: validPhone}],
              job:[{required:true,trigger:'blur',message:'请选择职位'}],
              name:[{required:true,trigger:'blur',message:'请输入姓名'}],
              loginPassword:[{required:true,trigger:'blur',message:'请输入登录密码'}],
              caoPassword:[{required:true,trigger:'blur',message:'请输入操作密码'}],
              quePassword:[{required:true,trigger:'blur',validator: validatePass2}]
            }
          }
        },
        mounted(){
          role().then(response=>{
            var data=response
            this.roles=data.roles
          }).catch(error=>{
          })
          allUser('','','',1,10).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              for(var i=0;i<data.page.result.length;i++){
                 this.tableData[i].roles=data.page.result[i].role.roleName
              }
              this.tableData=this.tableData
              this.totalPages=data.page.totalRow
            }else if(data.msg==4){
              this.tableData=[]
              this.totalPages=0
            }
          }).catch(error=>{
          })
        },
        methods:{
          CurrentChange(e){
            this.currentPage=e
            allUser(this.form.state,this.form.name,this.form.num,e,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                for(var i=0;i<data.page.result.length;i++){
                   this.tableData[i].roles=data.page.result[i].role.roleName
                }
                this.tableData=this.tableData
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{
            })
          },
          del(id){
            this.hiddedialog=true
            this.delId=id
          },
          deletes(){
            var that=this
            if(this.input==''){
              this.$message.warning('请输入操作密码')
            }else{
              deleateUser(this.delId,this.input).then(response=>{
                var data=response
                this.hiddedialog=false
                if(data.msg==1){
                  this.$message.success('删除成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{

              })
            }
          },
          search(){
            allUser(this.form.state,this.form.name,this.form.num,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                for(var i=0;i<data.page.result.length;i++){
                   this.tableData[i].roles=data.page.result[i].role.roleName
                }
                this.tableData=this.tableData
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{
            })
          },
          addrole(formName){
            var that=this
             this.$refs[formName].validate((valid) =>{
              if (valid) {
                addRole(this.forms.job,this.forms.name,this.forms.phone,this.forms.loginPassword,this.forms.caoPassword).then(response=>{
                  var data=response
                  if(data.msg==1){
                    this.$message.success('添加成功')
                    setTimeout(function(){
                      that.$router.go(0)
                    },500)
                  }else if(data.msg==3){
                    this.$message.error('手机号已存在')
                  }
                }).catch(error=>{

                })
              } else {
                return false;
              }
            });
          }
        }
    }
</script>

<style scoped>
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  .queryBox{
    display: flex;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#1890FF;
  }
  a:hover{
    color:#fff;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
  }
</style>
