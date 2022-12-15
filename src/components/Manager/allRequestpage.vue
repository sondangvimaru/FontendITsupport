<template>
   <a-spin :spinning="spinning" >
  <div class="tab">
    <div>
      <a-table :columns="columns" :data-source="data"  :pagination=pageoption >
        
    
        <template #bodyCell="{ column, record }">
          
          <template  v-if="column.key === 'action'">
            <span>
             
              <a-popconfirm title="Bạn có chắc chắn muộn nhận yêu cầu này không?" ok-text="Có" cancel-text="Không" @confirm="confirm(record)" @cancel="cancel"> <a-button type="primary">Nhận Yêu cầu</a-button></a-popconfirm>
            </span>
          </template>
        </template>
        </a-table>
    </div>
    </div>
   </a-spin>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import { message } from 'ant-design-vue';
import { ref } from 'vue';
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export default {
name:"AllRequestpage",
data(){
  return{
    spinning :ref<Boolean>(false),
    columns :[
  {
    title: 'Thời gian',
    dataIndex: 'dateoder',
    key: 'dateoder',
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
],data: [],
pageoption:{
  page:1,
  pageSize:5,
},Itsupport:"1"
  }
},mounted(){
  
  HTTP.get("request/getallavailable/").then(res=>{
       
        for(var i=0;i<res.data.length;i++)
        {
          var item= {
              key:res.data[i].idticket,
              dateoder:moment(String(res.data[i].datecreate)).format('DD/MM/YYYY hh:mm a') ,
              svyc: res.data[i].msv+" - "+ res.data[i].name,
              email:res.data[i].email,
              service: res.data[i].service,
              content: res.data[i].content,
          };
          this.data.push(item);
        }
         
         }).catch(()=>{

         });
},methods:{
 
  confirm(record){
 var user=localStorage.getItem("user");

 this.spinning=true;
 if(user!=null)
 {
  
   var objectUsser=JSON.parse(user);
  HTTP.get("user/getuserbyemail/"+objectUsser.Wv).then((res)=>{
    if(res.data.length>0){
      
     this.Itsupport=res.data[0].Itsupport_ID;
      
      var datasend={
      idticket:record.key,
      Itsupport_ID:this.Itsupport
    }
  
    HTTP.put("request/updateITsupport/",datasend).then((res)=>{
      if(res.data=="1"){
        message.success("Đã nhận yêu cầu của "+record.svyc);
        location.reload();
        this.spinning=ref<Boolean>(false);
      }else if(res.data=="0"){
        this.spinning=ref<Boolean>(false);
        message.error("có lỗi xảy ra vui lòng thử lại sau");
      }

    }).catch(()=>{

      message.error("có lỗi xảy ra vui lòng thử lại sau");
      this.spinning=ref<Boolean>(false);
    });
    }else{
      message.error("có lỗi xảy ra vui lòng thử lại sau");
      
    }
   
  }).catch(()=>{
    this.spinning=ref<Boolean>(false);
  });

 }
    
 

  }
}
} 
</script>

<style scoped>
.tab{
  width: 100%;
  height: 100%;

}
</style>