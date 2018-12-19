<template>
  <div class='task' >
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>当前任务管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item>
              <el-select v-model="form.tai" placeholder="所属平台">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in tai" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.state" placeholder="任务分类" >
                <el-option label="销量任务" value="1"></el-option>
                <el-option label="推送任务" value="2"></el-option>
                <el-option label="指定复购任务" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.states" placeholder="任务状态" >
                <el-option label="全部状态" value="0"></el-option>
                <el-option label="待接手" value="1"></el-option>
                <el-option label="进行中" value="2"></el-option>
                <el-option label="已完成" value="3"></el-option>
                <el-option label="已取消" value="4"></el-option>
                <el-option label="报错未完成" value="5"></el-option>
                <el-option label="超时未完成" value="6"></el-option>
                <el-option label="未发布" value="7"></el-option>
                <el-option label="申诉中" value="8"></el-option>
                <el-option label="已处理" value="9"></el-option>
                <el-option label="已提现" value="10"></el-option>
                <el-option label="暂停中" value="11"></el-option>
                <el-option label="隐藏任务" value="12"></el-option>
                <el-option label="超时未接手" value="13"></el-option>
                <el-option label="任务失败" value="14"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-select v-model="form.cha" >
                <el-option label="任务编号" value="1"></el-option>
                <el-option label="订单编号" value="2"></el-option>
                <el-option label="商品名称" value="3"></el-option>
                <el-option label="刷手账号" value="4"></el-option>
                <el-option label="淘宝买号" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.num" placeholder='查询条件' ></el-input>
            </el-form-item>
             <el-form-item >
              <el-input v-model="form.account" placeholder='商家手机号' ></el-input>
            </el-form-item>
             <el-form-item >
              <el-input v-model="form.storeName" placeholder='店铺名称' ></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker type="daterange" :default-time="['00:00:00', '23:59:59']" v-model='form.date' range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round class='style-btn' size='mini'  @click='search' >查询</el-button>
              <el-button type="warning" round  size='mini' @click='excel_down' v-if="down">导出</el-button>
              <el-button type="warning" round  size='mini' icon="el-icon-loading" v-if="!down">正在导出</el-button>
              <el-button type="success" round  size='mini' @click='cancelFa(1)'>选择取消</el-button>
              <el-button type="danger" round  size='mini' @click='cancelFa(2)'>一键取消全部</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" :row-class-name="tableRowClassName" tooltip-effect="dark"  style="width: 100%"  header-row-class-name="table-header" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="商家手机号"  header-align="center" show-overflow-tooltip >
                <template slot-scope="scope">
                    <p style="cursor: pointer" @click="shopCha(scope.row.account)">{{scope.row.account}}</p>
                </template>
            </el-table-column>
            <el-table-column label="所属平台" header-align="center"  show-overflow-tooltip width="100">
              <template slot-scope="scope">
                <p class='task-list' v-if="scope.row.adminStoreType"><span class='table-label'>{{scope.row.adminStoreType.name}}</span></p>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="任务分类"  header-align="center" show-overflow-tooltip >
              <template slot-scope="scope">
                <p v-if='scope.row.taskType==1'>销量任务</p>
                <p v-if='scope.row.taskType==2'>推送任务</p>
                <p v-if='scope.row.taskType==3'>指定复购任务</p>
              </template>
            </el-table-column>
            <el-table-column prop="task_num" label="任务/订单编号" header-align="center" width="300">
             <template slot-scope="scope">
                <p class='task-list'>任务编号：<span class='table-label'>{{scope.row.idNum}}</span><button class="xiao" v-clipboard:copy="scope.row.idNum" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button> </p>
                <p class='task-list'>订单编号：<span class='table-label'>{{scope.row.orderId}}</span><button class="xiao" v-clipboard:copy="scope.row.orderId" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button></p>
              </template>
            </el-table-column>
            <el-table-column  label="买号/商品信息"  header-align="center" width="230">
              <template slot-scope="scope">
                <p class='task-list' @click="buydialog = true">买号：<span class='table-label'>{{scope.row.handTaoAccount}}</span><button class="xiao" v-clipboard:copy="scope.row.handTaoAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button></p>
                <p class='task-list'>店铺名称：<span class='table-label'>{{scope.row.storeName}}</span></p>
                <p class='task-look' @click="taskLook(scope.$index)">查看任务详情</p>
                <p class='task-look' v-if="scope.row.handTaoAccount" @click="maiLook(scope.row.handId,scope.row.handDetailId,scope.row.handAccount)">查看买号信息</p>
              </template>
            </el-table-column>
            <el-table-column label="商品价格/发布点"  show-overflow-tooltip header-align="center"  width="120">
              <template slot-scope="scope">
                <p class='task-list'>商品价格：<span class='table-label'>{{scope.row.goodsMoney}}</span></p>
                <p class='task-list'>发布点：<span class='table-label'>{{scope.row.issuePrice}}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="任务状态"  show-overflow-tooltip header-align="center" width="230">
              <template slot-scope="scope">
                <p class='task-listss' v-if='scope.row.handTaskStatus==1'>待接手 <el-button type="danger"  plain round  size="mini" @click="cancelBtn(scope.row.id)">取消发布</el-button></p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==2'>进行中 <el-button type="danger"  plain round  size="mini" @click="cancelBtn(scope.row.id)">取消发布</el-button></p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==3'>已完成</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==4'>已取消</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==5'>报错未完成</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==6'>超时未完成</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==7'>未发布 <el-button type="danger"  plain round  size="mini" @click="cancelBtn(scope.row.id)">取消发布</el-button></p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==8'>申诉中</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==9'>已处理</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==10'>已提现</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==11'>暂停中</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==12'>隐藏任务</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==13'>超时未接手中</p>
                <p class='task-listss' v-if='scope.row.handTaskStatus==14'>任务失败</p>
                <p class='task-lists'>发布时间：<span class='table-label'>{{scope.row.issueAt}}</span></p>
                <p class='task-lists'>接手时间：<span class='table-label' >{{scope.row.createAt}}</span></p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='120' fixed="right">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item :command='{type:1,index:scope.row.id}'>删除</el-dropdown-item>-->
                    <el-dropdown-item :command='{type:2,index:scope.row.id}'>暂停</el-dropdown-item>
                    <el-dropdown-item :command='{type:5,index:scope.row.id}'>取消暂停</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.handTaskStatus==5" :command='{type:4,index:scope.row.id}'>报错查看</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**买号详情**-->
    <el-dialog title="买号详情" :visible.sync="maidialog" width="30%">
      <ul class="loading-tips">
        <li><label class='alert-label'>买&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</label><span class="hui_txt">{{maiInfo.num}}</span></li>
        <li><label class='alert-label'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label><span class="hui_txt">{{maiInfo.sex}}</span><li>
        <li><label class='alert-label'>手&nbsp; 机&nbsp; 号：</label><span class="hui_txt">{{maiInfo.tel}}</span></li>
        <li><label class='alert-label'>出生日期：</label><span class="hui_txt">{{maiInfo.birthday}}</span></li>
        <li><label class='alert-label'>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</label><span class="hui_txt">{{maiInfo.address}}</span></li>
      </ul>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="maidialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--**任务详情**-->
    <el-dialog  title="任务详情" :visible.sync="taskdialog" width="50%" class='taskInfo' v-if='taskInfo!=1&&taskInfo.task!=null'>
      <ul class="loading-tips loading-ge">
        <h3 class="task-title">刷手信息</h3>
        <li class='loading-list' style="width:50%"><label class='alert-label'>刷手淘宝买号：</label> <span class="shua_txt">{{taskInfo.handTaoAccount}}</span><button class="xiao" v-clipboard:copy="taskInfo.handTaoAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button></li>
        <li class='loading-list' style="width:50%"><label class='alert-label'>所属平台：</label> <span class="shua_txt" v-if="taskInfo.adminStoreType">{{taskInfo.adminStoreType.name}}</span></li>
      </ul>
      <ul class="loading-tips loading-ge">
        <h3 class='task-title'>任务基本信息</h3>
        <li class='loading-list'><label class='alert-label' >任务分类：</label>
          <span v-if='taskInfo.taskType==1' >销量任务</span>
          <span v-if='taskInfo.taskType==2'>推送任务</span>
          <span v-if='taskInfo.taskType==3'>指定复购任务</span>
        </li>
        <li class='loading-list'><label class='alert-label'>刷手账号:</label><span v-if='taskInfo.handAccount!=null'>{{taskInfo.handAccount}}</span><button class="xiao" v-clipboard:copy="taskInfo.handAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button></li>
        <li class='loading-list'><label class='alert-label'>订单编号:</label><span>{{taskInfo.handTaskEvaluateImg.tradeNo}}</span><button class="xiao" v-clipboard:copy="taskInfo.handTaskEvaluateImg.tradeNo" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button></li>
        <!--<li class='loading-list'><label class='alert-label'>任务平台：</label> 淘宝</li>-->
        <li class='loading-list'><label class='alert-label'>商品价格：</label> {{taskInfo.price.goodPrice}}元</li>
        <li class='loading-list'><label class='alert-label'>拍下件数：</label> {{taskInfo.price.aucNum}}件</li>
        <li class='loading-list'><label class='alert-label'>佣金价格：</label> {{taskInfo.issuePrice}}点</li>
        <li class='loading-list'><label class='alert-label'>刷手实际支付金额：</label> {{taskInfo.handTaskEvaluateImg.countMoneys}}元</li>
      </ul>
      <ul class="loading-tips loading-ge">
        <h3 class='task-title'>搜索关键字</h3>
        <li class='loading-list'><label class='alert-label' >搜索关键字：</label>{{taskInfo.require.keyword}}</li>
        <li class='loading-list' v-if="taskInfo.adminStoreType"><label class='alert-label'>搜索来路:</label>{{taskInfo.adminStoreType.name}}APP</li>
      </ul>
      <ul class="loading-tips loading-ge">
        <h3 class='task-title'>任务要求</h3>
        <li class='loading-list' v-if='taskInfo.task.requires==1' >拍一家同行,不需要付款</li>
        <li class='loading-list' v-if='taskInfo.task.requires==2'>拍两家同行,不需要付款</li>
        <li class='loading-list' v-if='taskInfo.task.requires==0'>无</li>
      </ul>
      <ul class="loading-tips loading-ge">
        <h3 class='task-title'>任务说明</h3>
        <li class='loading-list'>{{taskInfo.task.explains}}</li>
      </ul>
      <ul class="loading-tips loading-ge">
        <h3 class="task-title">刷手精准匹配</h3>
        <li><label class='alert-label'>置顶费用：</label>{{taskInfo.zhiPrice}}</li>
        <li><label class='alert-label'>年龄：</label>{{taskInfo.age}}</li>
        <li><label class='alert-label'>性别：</label>{{taskInfo.sex}}</li>
        <li><label class='alert-label'>消费地区：</label>{{taskInfo.address}}</li>
      </ul>
      <ul class="loading-tips loading-ge" style='border:none;padding-bottom:0;' >
        <h3 class='task-title'>商品信息</h3>
        <li><label class='alert-label' >商品名称：</label>{{taskInfo.goods.goodName}}</li>
        <li><label class='alert-label'>商品链接：</label>{{taskInfo.goods.url}}</li>
      </ul>
      <div class="loading-tips loading-ge loading-tipss">
        <label class='alert-label'>商品展示图：</label>
        <img :src="taskInfo.goods.img" alt="" class='ups-img' @click="bigImg" >
      </div>
      <div class="loading-tips loading-ge loading-tipss" v-if='taskInfo.imgs.length!=0'>
        <label class='alert-label'>任务完成图：</label>
        <img :src="item" alt=""  v-for='item in taskInfo.imgs' class='up-imgs' @click="bigImg" >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskdialog = false" size='small' >关闭</el-button>
      </span>
    </el-dialog>
    <!--**查看买号信息**-->
    <el-dialog title='查看买号信息' width='30%' :visible.sync="buydialog" >
      <ul class="loading-tips">
        <li><label class='alert-label' >账号：</label>15829792593</li>
        <li><label class='alert-label'>注册时间:</label>2018-9-30<li>
        <li><label class='alert-label'>等级：</label> 黄金</li>
      </ul>
    </el-dialog>
    <!--**取消发布**-->
    <el-dialog title='取消发布' width='30%' :visible.sync="hiddedialog" >
      <p class='hidde-title'>您将取消该任务发布，请输入密码确认。</p>
      <el-input  type='password' v-model="input" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' size='small' @click="cancelTask">确认</el-button>
        <el-button @click="hiddedialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**取消多个或全部发布**-->
    <el-dialog title='取消发布' width='30%' :visible.sync="alldialog" >
      <p class='hidde-title'>您将取消多个任务发布，请输入密码确认。(只对待接手或未发布的有效)</p>
      <el-input  type='password' v-model="inputs" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="cancelFabu"  size='small'>确认</el-button>
        <el-button @click="alldialog = false"  size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**暂停任务**-->
    <el-dialog title='暂停任务' width='30%' :visible.sync="stopdialog" >
      <p class='hidde-title'>您将暂停/恢复该任务发布，请输入密码确认。</p>
      <el-input  type='password' v-model="input" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="stopTask" size='small'>确认</el-button>
        <el-button @click="stopdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**删除任务**-->
    <el-dialog title='删除任务' width='30%' :visible.sync="deldialog" >
      <p class='hidde-title'>您将删除该任务，请输入密码确认。</p>
      <el-input  type='password' v-model="input" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="del" size='small'>确认</el-button>
        <el-button @click="deldialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**报错详情**-->
    <el-dialog title='报错详情' width='40%' :visible.sync="missdialog" >
      <ul class='touBox' v-if='list.length!=0' v-for='item in list' :key='item.id'>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{item.account}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{item.createAt}}</li>
        <li class='touList'><span class='touLabel'>任务编号：</span>{{item.idNum}}</li>
        <li class='touList'><span class='touLabel'>投诉内容：</span>{{item.content}}</li>
        <li class='touList touLists'><span class='touLabel'>图片展示：</span><img :src="item.img" alt="" class='tou-img' @click="bigImg" ></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="missdialog = false"  size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
    import {taskList,taskDel,taskStope,taskCuo,maiList,down,formatDate,cancelFabu,cancelTask} from '../../api/api'
    export default {
        name: "goods",
        data(){
          return{
            tai:'',
            form:{
              tai:'',
              num:'',
              state: '',
              states:'',
              date: '',
              cha:'',
              account:'',
              storeName:''
            },
            list:[],
            tableData:[],
            maiInfo:{},
            taskInfo:1,
            totalPages:0,
            down:true,
            value: '',
            taskdialog:false,
            maidialog:false,
            buydialog:false,
            hiddedialog:false,
            missdialog:false,
            stopdialog:false,
            deldialog:false,
            alldialog:false,
            show:false,
            dialogImageUrl: '',
            dialogVisible: false,
            currentPage:1,
            taskIds:'',
            input:'',
            inputs:'',
            bigsrc:'',
            taskType:'',
            multipleSelection:[],
            sendIds:[]
          }
        },
        mounted(){
          taskList('','','','','','','','','','','','',1,1,10).then(response=>{
              var data=response
            console.log(data);
            if(data.msg==1){
              this.tai=data.types;
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
              for(var i=0;i<data.page.result.length;i++){
                  if(data.page.result[i].price!=null){
                    this.tableData[i].goodsMoney=data.page.result[i].price.goodPrice
                  }
                  if(data.page.result[i].merchant!=null){
                     this.tableData[i].account=data.page.result[i].merchant.account
                  }
                  if(data.page.result[i].store!=null){
                    this.tableData[i].storeName=data.page.result[i].store.name
                  }
                  if(data.page.result[i].handInfo!=null){
                    this.tableData[i].handPhone=data.page.result[i].handInfo.account
                  }
                  if(data.page.result[i].handTaskEvaluateImg!=null){
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  }
                if(data.page.result[i].isNotStick){
                  this.tableData[i].zhiPrice=data.page.result[i].task.stickPrice
                }else{
                  this.tableData[i].zhiPrice=0
                }
                if(data.page.result[i].ageList.length!=0){
                  this.tableData[i].age=data.page.result[i].ageList.join(' ');
                }
                else{
                  this.tableData[i].age="";
                }
                if(data.page.result[i].areaList.length!=0){
                  this.tableData[i].address=data.page.result[i].areaList.join(' ');
                }
                else{
                  this.tableData[i].address="";
                }
                if(data.page.result[i].sexList.length!=0){
                  this.tableData[i].sex=data.page.result[i].sexList.join(' ');
                }
                else{
                  this.tableData[i].sex="";
                }
              }
              this.taskInfo=this.tableData[0]
              this.totalPages=data.page.totalRow
            }else if(data.msg==5){
              this.totalPages=0
              this.tableData=[]
              this.taskInfo=1
            }
          }).catch(error=>{})
        },
        methods:{
          handleSelectionChange(val) {
            // console.log(val)
            this.multipleSelection=val;
          },
          //取消多个和全部发布
          cancelFa(type){
            if(type==1){
              if(this.multipleSelection.length==0){
                this.$message.warning("请选择要取消发布的任务!")
              }else {
                this.alldialog=true
                this.typeFa=1;
                for(var item of this.multipleSelection){
                  this.sendIds.push(item.id)
                }
                // console.log(this.sendIds);
              }
            }else{
              if(this.form.states==1||this.form.states==2||this.form.states==7){
                  if(this.form.account){
                    this.alldialog=true;
                    this.typeFa=2;
                    this.sendIds=[];
                  }else{
                    this.$message.warning("请选择商家手机号!")
                  }
              }else{
                this.$message.error("选择的状态无法取消!")
              }
            }
          },
          cancelFabu(){
            var that=this;
            if(this.inputs==''){
              this.$message.warning('请输入密码')
            }else{
              cancelFabu(this.typeFa,this.sendIds,this.inputs,this.form.states,this.form.account).then(
                response=>{
                  const data=response;
                  this.$message.success('取消成功')
                  setTimeout(function(){
                    that.$router.go(0);
                  },500)
                }
              ).catch()
            }
          },
          // 取消发布
          cancelBtn(id){
            this.taskId=id;
            this.hiddedialog=true
          },
          cancelTask(){
            var that=this;
            if(this.input==''){
              this.$message.warning('请输入支付密码')
            }else{
              cancelTask(this.taskId,this.input).then(response => {
                this.hiddedialog=false
                const data = response;
                if(data.msg==1){
                  this.$message.success('已取消发布')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('已有刷手接单，不能取消')
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error => {
                reject(error);
              });
            }
          },
          //下载
          excel_down:function(){
            this.down=false;
            var result=''
            var results=''
            var resultss=''
            var resultsss=''
            var resultssss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else if(this.form.cha==3){
              result=''
              results=''
              resultss=this.form.num
            }else if(this.form.cha==4){
              result=''
              results=''
              resultss=''
              resultsss=this.form.num
            }else if(this.form.cha==5){
              result=''
              results=''
              resultss=''
              resultsss=''
              resultssss=this.form.num
            }
            var date1
            var date2
            if(this.form.date==null){
              date1=null
              date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
            down(this.form.state,this.form.states,result,results,resultss,date1,date2,this.form.account,this.form.storeName,resultsss,resultssss,1,1,100000).then(response=>{
              this.down=true;
              const data=response;
              var url=data.path;
              window.location.href=url;
            }).catch(error=>{
              console.log(error)
              this.$message.warning("导出超时");
              this.down=true;
            })
          },
          //复制
          onCopy: function (e) {
            // console.log('你刚刚复制: ' + e.text)
            this.$message.success('复制成功');
          },
          onError: function (e) {
            // console.log('无法复制文本！')
            this.$message.error('无法复制文本！');
          },
           //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
           // 表格颜色
          tableRowClassName({row, rowIndex}){
            if (rowIndex %2 == 1) {
              return 'warning-row';
            }
            return '';
          },
          handleCommand(command){
            this.taskIds=command.index
            this.taskType=command.type
            if(command.type==1){
              this.deldialog=true
            }else if(command.type==2){
               this.stopdialog=true
            }else if(command.type==3){
              this.hiddedialog=true;
            }else if(command.type==4){
              this.missdialog=true;
              taskCuo(command.index).then(response=>{
                var data=response
                if(data.msg==1){
                  this.list=data.list
                }
              }).catch(error=>{})
            }else if(command.type==5){
              this.stopdialog=true
            }
          },
          //商家信息查询
          shopCha(tel){
            this.$router.push({name:'stores',params:{phone:tel}});
          },
          //买手详情查看
          maiLook(id,handId,tel){
          var that=this;
          // console.log(tel);
          this.$router.push({name:'goods',params:{tel:tel}});
            // this.maiInfo=this.tableData[index]
            // console.log(this.maiInfo);
            // console.log(id);
            // if(handId==null){
            //   handId=0;
            // }
            // maiList(id,handId).then(response=>{
            //     const data=response;
            //     console.log(data);
            //   var obj=data.handInfo;
            //   if(obj.detail){
            //     that.maiInfo.num=obj.detail.taoAccount;
            //     if(obj.detail.sex==1){
            //       obj.detail.sex="男";
            //     }else{
            //       obj.detail.sex="女";
            //     }
            //     that.maiInfo.sex=obj.detail.sex;
            //     that.maiInfo.tel=obj.account;
            //     that.maiInfo.birthday=obj.detail.birthday;
            //     that.maiInfo.address=obj.detail.province+"省 "+obj.detail.area+" "+obj.detail.city;
            //     this.maidialog=true;
            //   }
            //   else{
            //     that.maiInfo={};
            //     this.maidialog=true;
            //   }
            // })
          },
          // 查看任务详情
          taskLook(index){
            this.taskInfo=this.tableData[index]
            this.taskdialog=true
          },
           // 条件查询
          search(){
            console.log(this.form.num);
            var result=''
            var results=''
            var resultss=''
            var resultsss=''
            var resultssss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else if(this.form.cha==3){
              result=''
              results=''
              resultss=this.form.num
            }else if(this.form.cha==4){
              result=''
              results=''
              resultss=''
              resultsss=this.form.num
            }else if(this.form.cha==5){
              result=''
              results=''
              resultss=''
              resultsss=''
              resultssss=this.form.num
            }
            var date1
            var date2
            if(this.form.date==''){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
            taskList(this.form.state,this.form.states,this.form.tai,result,results,resultss,date1,date2,this.form.account,this.form.storeName,resultsss,resultssss,1,this.currentPage,10).then(response => {
              const data = response;
               if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
                for(var i=0;i<data.page.result.length;i++){
                  if(data.page.result[i].price!=null){
                    this.tableData[i].goodsMoney=data.page.result[i].price.goodPrice
                  }
                  if(data.page.result[i].merchant!=null){
                     this.tableData[i].account=data.page.result[i].merchant.account
                  }
                  if(data.page.result[i].store!=null){
                    this.tableData[i].storeName=data.page.result[i].store.name
                  }
                  if(data.page.result[i].handInfo!=null){
                    this.tableData[i].handPhone=data.page.result[i].handInfo.account
                  }
                  if(data.page.result[i].handTaskEvaluateImg!=null){
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  }
                  if(data.page.result[i].isNotStick){
                    this.tableData[i].zhiPrice=data.page.result[i].task.stickPrice
                  }else{
                    this.tableData[i].zhiPrice=0
                  }
                  if(data.page.result[i].ageList.length!=0){
                    this.tableData[i].age=data.page.result[i].ageList.join(' ');
                  }
                  else{
                    this.tableData[i].age="";
                  }
                  if(data.page.result[i].areaList.length!=0){
                    this.tableData[i].address=data.page.result[i].areaList.join(' ');
                  }
                  else{
                    this.tableData[i].address="";
                  }
                  if(data.page.result[i].sexList.length!=0){
                    this.tableData[i].sex=data.page.result[i].sexList.join(' ');
                  }
                  else{
                    this.tableData[i].sex="";
                  }
                 }
                this.taskInfo=this.tableData[0]
                this.totalPages=data.page.totalRow
               }else if(data.msg==5){
                 this.totalPages=0
                 this.tableData=[]
               }
            }).catch(error => {
              reject(error);
            });
          },
          // 分页查询
          CurrentChange(e){
            this.currentPage=e
            var result=''
            var results=''
            var resultss=''
            var resultsss=''
            var resultssss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else if(this.form.cha==3){
              result=''
              results=''
              resultss=this.form.num
            }else if(this.form.cha==4){
              result=''
              results=''
              resultss=''
              resultsss=this.form.num
            }else if(this.form.cha==5){
              result=''
              results=''
              resultss=''
              resultsss=''
              resultssss=this.form.num
            }
            var date1
            var date2
            if(this.form.date==''){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
            taskList(this.form.state,this.form.states,this.form.tai,result,results,resultss,date1,date2,this.form.account,this.form.storeName,resultsss,resultssss,1,e,10).then(response => {
              const data = response;
               if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
                for(var i=0;i<data.page.result.length;i++){
                  if(data.page.result[i].price!=null){
                    this.tableData[i].goodsMoney=data.page.result[i].price.goodPrice
                  }
                  if(data.page.result[i].merchant!=null){
                     this.tableData[i].account=data.page.result[i].merchant.account
                  }
                  if(data.page.result[i].store!=null){
                    this.tableData[i].storeName=data.page.result[i].store.name
                  }
                  if(data.page.result[i].handInfo!=null){
                    this.tableData[i].handPhone=data.page.result[i].handInfo.account
                  }
                  if(data.page.result[i].handTaskEvaluateImg!=null){
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  }
                  if(data.page.result[i].isNotStick){
                    this.tableData[i].zhiPrice=data.page.result[i].task.stickPrice
                  }else{
                    this.tableData[i].zhiPrice=0
                  }
                  if(data.page.result[i].ageList.length!=0){
                    this.tableData[i].age=data.page.result[i].ageList.join(' ');
                  }
                  else{
                    this.tableData[i].age="";
                  }
                  if(data.page.result[i].areaList.length!=0){
                    this.tableData[i].address=data.page.result[i].areaList.join(' ');
                  }
                  else{
                    this.tableData[i].address="";
                  }
                  if(data.page.result[i].sexList.length!=0){
                    this.tableData[i].sex=data.page.result[i].sexList.join(' ');
                  }
                  else{
                    this.tableData[i].sex="";
                  }
                 }
                this.taskInfo=this.tableData[0]
                this.totalPages=data.page.totalRow
               }else if(data.msg==5){
                 this.totalPages=0
                 this.tableData=[]
               }
            }).catch(error => {
              reject(error);
            });
          },
          // 删除任务
          del(){
            console.log(this.taskIds)
            var that=this;
            if(this.input==''){
              this.$message.error('请填写操作密码')
            }else{
              taskDel(this.taskIds,this.input).then(response=>{
                var data=response
                 this.deldialog=false
                if(data.msg==1){
                  this.$message.success('删除成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('操作密码错误')
                }else if(data.msg==4){
                  this.$message.error('此任务不能被删除')
                }
              }).catch(error=>{

              })
            }
          },
          // 暂停任务
          stopTask(){
            if(this.input==''){
              this.$message.error('请填写操作密码')
            }else{
              taskStope(this.taskIds,this.input).then(response=>{
                this.stopdialog=false
                var data=response
                if(data.msg==1){
                  this.deldialog=false
                  this.$message.success('操作成功')
                  this.$router.go(0)
                }else if(data.msg==3&&this.taskType==2){
                  this.$message.error('此任务不能被暂停')
                }else if(data.msg==3&&this.taskType==5){
                  this.$message.error('此任务不能被取消暂停')
                }else if(data.msg==4){
                  this.$message.error('操作密码错误')
                }
              }).catch(error=>{})
            }
          }
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
  }
  .table-label{
    color:rgba(0,0,0,0.45);
  }
  .el-table th, .el-table tr.warning-row{
    background:#F5FCFF;
  }
  .step{
    position: relative;
    margin-bottom:50px;
  }
  .step .step-title{
    font-size:14px;
    position: absolute;
    left:0;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
  }
  .task-list{
    text-align:left;
  }
  .task-title{
    color:#1890FF;
    font-size:16px;
  }
  .first-box .task-lists{
    text-align:left;
    font-size:12px;
  }
  .task-listss{
    text-align:left;
    color:#F5222D;
  }
  .task-look{
    text-align:left;
    color:#1890FF;
    font-size:12px;
    cursor:pointer;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  .expandBox{
    width:100%;
    text-align:left;
    line-height:30px;
    overflow:hidden;
  }
  .expandBox .expand-list{
    width:50%;
    float:left;
  }
  .expandBox .expand-label{
    color: #99a9bf;
    width:100px;
    display:inline-block;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-ge{
    border-bottom:1px solid rgba(0,0,0,0.09);
    padding:10px 0;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
    color:rgba(0,0,0,0.45);
  }
  .loading-tips .alert-label{
    margin-right:10px;
    color:#000;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
  }
  .taskInfo .loading-ge .up-imgs{
    width:100px;
    height:160px;
    cursor: pointer;
    margin-right:20px;
  }
  .mask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow:auto;
  }
  .bigimg{
    transform: scale(0.5);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .task .el-dialog__body{
    padding:0 20px;
  }
  .task .taskInfo .el-dialog__header{
    text-align:left;
    border:1px solid rgba(0,0,0,0.09);
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
  .touBox .touLists{
    border-bottom:1px dashed #e8e8e8;
    margin:10px 0;
    padding:10px 0;
  }
  .touLabel{
    color:#000;
    margin-right:10px;
  }
  .tou-img{
    width:100px;
    height:160px;
    cursor: pointer;
     vertical-align:text-top;
  }
  .xiao{
    padding:1px 2px;
    margin-left:5px;
    background-color:#409eff;
    border-radius:10px;
    color:#fff;
    cursor:pointer;
    font-size:12px;
  }
</style>
