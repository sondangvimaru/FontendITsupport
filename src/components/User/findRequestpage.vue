<template>
  <div class="homepage">
   
    <div class="logohome">
      <img src="../../images/logo.png" /> 
      </div>
      <div >
        <h1 class="text-title">Hệ Thống gửi yêu cầu CNTT</h1>
      </div>

      <div class="block">
        <div @click="changemenu('requestform')" class="item">
          <img  src="@/images/request.svg" />
          <p>Gửi Yêu Cầu</p> 
        </div>
       
     
      
     <div @click="changemenu('findrequest')" class="item" >
        <img src="@/images/find-request.svg" />
        <p>Tìm Yêu Cầu</p> 
     </div>

    
      
    </div>
  <div>
    <a-input-search
   style="width: 500px;"
    v-model:value="value"
    placeholder="vui lòng nhập ticket bạn muốn tìm kiếm ở đây"
    :loading="searchloangding"
    enter-button
    @search="clickfind()"
  />
 
  </div>
  <div>
    <a-card class="card-detail" v-if="showresult" :loading="cardloading" title="Kết Quả">
      <p class="detail-text"> Mã sinh viên: {{Request.msv}}</p>
      <p class="detail-text"> email: {{Request.email}}</p>
      <p class="detail-text"> Loại dịch vụ: {{Request.service}}</p>
      <p class="detail-text"> Tên sinh viên: {{Request.name}}</p>
      <p class="detail-text"> Trạng Thái: {{(Request.status==0)?"Chưa xử lý":(Request.status==1)?"đang xử lý":"đã hoàn thành"}}</p>
      <p class="detail-text"> Người hỗ trợ: {{(Request.itname==undefined)?"Chưa có":Request.itname}}</p>
      <p class="detail-text">Ngày tạo : {{(Request.datecreate!=null)?fomatdate(Request.datecreate):"chưa lưu"}}</p>

    </a-card>
    <!-- <p>Chi tiết công việc</p>
    <ul style="color:red">
      <li>
       Mã ticket:
      </li>
      <li>mã sinh viên</li>
      <li>Loại dịch vụ</li>
      <li>tên</li>
      <li>trạng thái</li>
      <li>It support</li>
      <li>thời gian tạo</li>


    </ul> -->
  </div>
</div>
</template>



<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import { object } from 'vue-types';
import moment from 'moment'
import { MehOutlined} from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { h} from 'vue';
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export default {
  data(){
    return {
      value : '',
      searchloangding:false,
      cardloading:false,
      Request:object,
      showresult:false,
    }
  },
  mounted(){
    var login=localStorage.getItem('login');
    if(login!=null && login=="false") {
      this.shownotloginnotification();
      this.$router.push('/');    
     return;
    }
   var bgr=document.getElementById("background");
        if(bgr!=null) bgr.style.background="#ffff";
        var wave=document.getElementById("wave");
        if(wave!=null) wave.hidden=true;

        
 },
 
 updated(){
  var login=localStorage.getItem('login');
    if(login!=null && login=="false") {
      this.shownotloginnotification();
      this.$router.push('/');    
     return;
    }
 },methods:{
   changemenu(name){


     console.log("naem:"+name);
     this.$router.push(name);

   },clickfind()
   {
    if(this.value==''){
       message.error("Vui lòng nhập giá trị tìm kiếm");
       return null;
    }
    this.searchloangding=true;
    this.cardloading=true;
    this.showresult=true;
    HTTP.get("request/getbyid/"+this.value.trim()).then(
      (res) => {
        this.Request = res.data[0];
       
        console.log(JSON.stringify(res.data));
        this.searchloangding=false;
        this.cardloading=false;
               
      }
    ).catch(() => {

    })
   },fomatdate(datestring)
   {
    return moment(String(datestring)).format('DD/MM/YYYY hh:mm')
   },shownotloginnotification(){
          notification.open({
         message: 'Thông báo',
        description:
          'Vui lòng đăng nhập với mail fpt trước',
        icon: () => h(MehOutlined, { style: 'color: #108ee9' }),
      });
        }
 }

}
</script>

<style scoped>
.card-detail{
  background-color: aqua;
}
.detail-text{
  color: rgb(18, 17, 17);
  font-size: 25px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  text-align: center;
}
.block{
  display:block;
  width: 800px;
  height: auto;
}
.block :hover{
  background-color: aquamarine;
}
.item{
  display: inline-block;
  width: 40%;
  height: 100%;
  background-color: aqua;
  margin: 10px;

}
 .item p{
  font-size: 15px;
  font-weight: bold;
  color: rgb(225, 78, 78);
  text-align: center;
 }
.block img  {
  width: 50px;
  height: 50px;
  align-content: center;
}
.homepage{
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
 }  
 .logohome img{
  width: 20   0px;
  height: 130px;
  border-radius: 5px; 
 }
 .text-title{
  margin-top: 40px;
  color: crimson;
  font-family: crimson;
  font-weight: bold;  
}
</style>