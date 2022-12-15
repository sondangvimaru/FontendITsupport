
<template>
  <div style="padding-bottom: 100px;width: 100%;">
    <a-tabs tab-position="top" v-model:activeKey="activeKey" style="width: 100%; align-items: center;">
      <a-tab-pane  key="1" tab="Yêu cầu Đã Nhận"><reciviedRequest  /></a-tab-pane>
      <a-tab-pane key="2" tab="Yêu cầu đang xử lý" ><processingRequest/></a-tab-pane>
      <a-tab-pane key="3" tab="Yêu cầu đã hoàn thành"><compeleteRequest/></a-tab-pane>    
    </a-tabs>
    
  </div>
</template>

<script>
import reciviedRequest from './insidemyrequest/reciviedRequest.vue';
import processingRequest from './insidemyrequest/processingRequest.vue';
import compeleteRequest from './insidemyrequest/compeleteRequest.vue';
import { ref } from 'vue'

export default {
name:"MyRequestPage",
data(){
  return {
    activeKey: ref('1'),
  }},
  components:{
    reciviedRequest,
    processingRequest,
    compeleteRequest,
  }
}

</script>

<style>
.ant-tabs-content-holder {
  width: 100%;
}
</style>