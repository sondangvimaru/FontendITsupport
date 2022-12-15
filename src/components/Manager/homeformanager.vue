
<template>
  <div class="home-manager">
   
  <div style="width: 100%; height: auto;display: block;">
  <div style="margin-top: 20px;display: inline-block;width: 20%;margin-left: 10px">
    <img src="@/images/logo.png" style="width=100px;height: 50px;" />
  </div>
   <div style="display: inline-block;width: 70%;padding-top: 20px;">
     <h1  style="text-align: center;text-decoration: underline;color:#e74c3c" >Hệ thống quản trị Yêu cầu công nghệ thông tin</h1>
   </div>
  </div>
  <div style="width: 100%;margin-top: 2%;">
    <a-tabs tab-position="left" v-model:activeKey="activeKey" style="width: 100%; align-items: center;">
      <a-tab-pane key="1" tab="Tất cả yêu cầu hiện tại"><AllRequestpage/></a-tab-pane>
      <a-tab-pane key="2" tab="Yêu cầu của tôi" force-render><myrequestpage/></a-tab-pane>
      <a-tab-pane key="3" tab="Yêu cầu đang xử lý"><RequestInProcess/></a-tab-pane>
      <a-tab-pane key="4" tab="Yêu cầu đã hoàn thành"><allrequestcompelete/></a-tab-pane>
    </a-tabs>
  </div>
  </div>

 
</template>
 
<script>
import {ref} from 'vue';
import AllRequestpage from './allRequestpage.vue'
import myrequestpage from './myrequestpage.vue';
import allrequestcompelete from './allrequestcompelete.vue';
import RequestInProcess from './requestinprocess.vue';
export default {
name:"ManagerHome",
  data() {
    return {
      activeKey: ref('1'),
    };
  },mounted(){
    var bgr=document.getElementById("background");
         if(bgr!=null) bgr.style.background="#3498db";
         var wave=document.getElementById("wave");
         if(wave!=null) wave.hidden=true;
          

  },components:{
    AllRequestpage,
    myrequestpage,
    allrequestcompelete,
    RequestInProcess
  }

}
</script>

<style scoped>
 .home-manager{

 text-align: start;
 width: 100%;
 height: 100%;
 background-color: aqua;
  position: absolute;
 }
 .body{
  background-color: rgb(139, 228, 62);
 }
</style>