<template>
  <div class='tiao'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <div class="recharge-info">
            <div class='info-fl'>
              <p class='icons '>i</p>
            </div>
            <ul class="infos-box">
              <p class="rechare-title rechare-titles">补单量说明</p>
              <li>1、平台以店铺为单位对补单量进行收费。</li>
              <li>2、店铺补单量由卖家自助购买，有效期为30天。提交审核后，由系统进行单量调整。</li>
              <li>3、调整单量原则：但凡购买成功，一律不进行退费操作。</li>
            </ul>
          </div>
          <div class="recharge-pay">
            <p class="rechares-title">已绑定店铺信息</p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  border  header-row-class-name="table-header">
              <el-table-column prop="platform" label="平台类型"  header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column  prop="name" label="店铺名称" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="num" label="补单量（单/天）"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="expireAt" label="到期时间"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column   label="操作"  header-align="center">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="mini" @click="tiao(scope.$index)">调整单量</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="调整单量" :visible.sync="dialogVisible" width="40%">
      <div class="tabBox">
        <ul class='tanRule'>
          <li class="rules-list rules-lists">补单量调整规则：</li>
          <li class="rules-list">1、只可在原单量基础上增加单量。如需减少单量，请在当前单量到期后重新选择。</li>
          <li class="rules-list">2、系统会根据所选单量统计距离到期时间应补交的费用，确认提交。</li>
        </ul>
        <ul class='tanRule tanRules'>
          <li class="rules-list"><label class='rule-label'>店铺名称：</label><span class='rule-text'>{{danList.name}}</span></li>
          <li class="rules-list"><label class='rule-label'>当前单量：</label><span class='rule-text'>{{danList.num}}单/天</span></li>
          <li class="rules-list"><label class='rule-label'>到期时间：</label><span class='rule-text'>{{danList.expireAt}}</span></li>
          <li class="rules-list"><label class='rule-label'>调整单量：</label>
            <span class='tag-list' :class='index==tag ? "active" : "" ' @click='tagss(index)' v-for='(item,index) in dan' >{{item.num}}单/天</span>
          </li>
          <li class="rules-list"><label class='rule-label'>新单量收费标准：</label><span class='rule-text'  v-if='index==tag' v-for='(item,index) in dan'>{{item.price}}元/月</span></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size='small'>取消调整</el-button>
        <el-button type="primary" @click="confirm" size='small'>确定调整</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
   import {storeList,tiao,danSearch} from '../../api/vip';
  export default {
    data(){
      return {
        tableData:[],
        danList:"",
        dialogVisible:false,
        tag:0,
        dan:[],
        Ids:''
      }
    },
    mounted(){
      danSearch().then(response=>{
        var data=response
        this.dan=data.nums
      }).catch(error=>{})
      storeList().then(response => {
        const data = response;
        if(data.msg==1){
         this.tableData=data.stores
        }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      tagss(indexs){
        this.tag=indexs
      },
      tiao(index){
        this.Ids=this.tableData[index].id
        this.dialogVisible=true
      },
      // 确定调整
      confirm(){
        this.dialogVisible=false
        tiao(this.Ids,this.dan[this.tag].id).then(response => {
          const data = response;
          if(data.msg==1){
             this.$message.success('提交成功，等待审批');
          }else if(data.msg==3){
              this.$message.error('改变后的单量不能小于当前单量');
          }
        }).catch(error => {
          reject(error);
        }); 
      }
    }
  }
</script>

<style>
  .recharge-info{
    margin-bottom:20px;
    border-radius:4px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .rechare-title{
    font-size:16px;
    color:#000;
    text-align: left;
    margin-bottom:10px;
  }
  .rechares-title{
    height:40px;
    line-height:40px;
    text-align:left;
    margin-bottom:10px;
  }
  .all-box .rechare-titles{
    margin:0;
  }
  .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .tiao .infos-box{
    text-align:left;
    line-height:30px;
    font-size:14px;
  }
  .recharge-pay{
    background:#fff;
    padding:20px;
  }
  /*===弹框===*/
  .tanRule{
    width:100%;
    font-size:14px;
    border-bottom:1px dashed #ccc;
    text-align:left;
    padding-bottom:20px;
    margin-bottom:20px;
  }
  .tanRules{
    border:none;
    margin:0;
  }
  .tanRule .rules-list{
    line-height:30px;
  }
  .tanRules .rules-list{
    line-height:40px;
  }
  .rules-list .rule-label{
    display:inline-block;
    width:130px;
    text-align:right;
  }
  .rules-lists{
    color:#F56C6C;
    border:none;
  }
  .tag-list{
    display:inline-block;
    padding:0 10px;
    height:26px;
    line-height:26px;
    border:1px solid #1890FF;
    margin-right:14px;
    border-radius:4px;
    cursor:pointer;
    color:#1890FF;
  }
  .tag-list.active{
    background:#1890FF;
    color:#fff;
  }
  .tiao .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:160px;
  }
  .tiao .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    font-weight:bold;
    position:absolute;
    left:0;
    right:0;
    margin:auto;
    top:20px;
  }
</style>
