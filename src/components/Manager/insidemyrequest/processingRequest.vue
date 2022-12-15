<template>
 <div>
  <div style="width: 100%;">
 
 
    <a-table style="width: 100%;" :columns="columns" :data-source="data"  :pagination=pageoption >
        
    
        <template #bodyCell="{ column, record }">
          
          <template  v-if="column.key === 'action'">
            <span>
             
               <a-button @click="showprocess(record)" type="primary">Tiếp tục Xử lý</a-button>
            </span>
          </template>
        </template>
        </a-table>
        <a-modal :maskClosable="false" :closable="false" width="60%" height="100%" wrap-class-name="full-modal"   v-model:visible="visible" title="Đang tiến hành xử lý công việc" @ok="handleOk" @cancel="cancel()">
        <workplace :Idticket="this.currentkey"/>
        </a-modal>
   </div>
 </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import workplace from './workplace.vue'
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export default {

components:{
  workplace
},data(){
  return{
    
    visible:false,
    currentkey:"",
    columns: [
            {
    title: 'Thời gian gửi yêu cầu',
    dataIndex: 'dateoder',
    key: 'dateoder',
  },
  {
    title: 'Thời gian nhận yêu cầu',
    dataIndex: 'timerecivie',
    key: 'timerecivie',
  },
  {
    title: 'Sinh viên yêu cầu',
    dataIndex: 'svyc',
    key: 'svyc',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Dịch vụ',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Action',
    key: 'action',
  },
  ],
        data:[],
  }
},mounted(){
 this.setdata();
},methods:{
  showprocess(record){
    this.currentkey=record.key;
    this.visible=true;
  },handleOk(){
    this.setdata();
  },
  cancel(){
    this.setdata();
  }
  ,setdata()
  {
    var user=localStorage.getItem("user");
  var objectUsser=JSON.parse(user);
  HTTP.get("user/getuserbyemail/"+objectUsser.Wv).then((res)=>{
    if(res.data[0].Itsupport_ID!=null){
      HTTP.get("request/getrequestinprocess/"+res.data[0].Itsupport_ID).then((res)=>{
        this.data=[];
        for(var i=0;i<res.data.length;i++)
        {
          var item= {
              key:res.data[i].idticket,
              dateoder:moment(String(res.data[i].datecreate)).format('DD/MM/YYYY hh:mm a') ,
              svyc: res.data[i].msv+" - "+ res.data[i].name,
              email:res.data[i].email,
              service: res.data[i].service,
              content: res.data[i].content,
              timerecivie: moment(String(res.data[i].dateiITrecivie)).format('DD/MM/YYYY hh:mm a')
          };
          this.data.push(item);
        }
      }).catch(()=>{

      });
    }
 


  }).catch(()=>{

  })
  }
},
}
</script>

<style scoped>

</style>