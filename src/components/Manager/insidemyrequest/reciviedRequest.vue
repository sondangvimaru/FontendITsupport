<template>
 <div style="width: 100%;">
   <div style="width: 100%;">
 
 
    <a-table style="width: 100%;" :columns="columns" :data-source="data"  :pagination=pageoption >
        
    
        <template #bodyCell="{ column, record }">
          
          <template  v-if="column.key === 'action'">
            <span>
             
              <a-popconfirm title="Bắt đầu xử lý yêu cầu này?" ok-text="Có" cancel-text="Không" @confirm="confirm(record)" @cancel="cancel"> <a-button type="primary">Xử lý</a-button></a-popconfirm>

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
// import VueSocketIO from 'vue-socket.io'
import { object } from 'vue-types';
import axios from 'axios';
import moment from 'moment';
import { ref} from 'vue';
import workplace from './workplace.vue';
import { message, Modal } from 'ant-design-vue';
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export default {
  components:{
    workplace
  },
data(){
    return {
     
      visible: ref<Boolean>(false),
      messages: [],
      text:'hayqua',
      currentkey:'',
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
        data:[
        ],
        socket:object,
}
},

updated(){
 
},mounted(){

  var user=localStorage.getItem("user");
  var objectUsser=JSON.parse(user);
  HTTP.get("user/getuserbyemail/"+objectUsser.Wv).then((res)=>{
    if(res.data[0].Itsupport_ID!=null){
      HTTP.get("request/getbyITid/"+res.data[0].Itsupport_ID).then((res)=>{
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
    
     
//   try{
//     var a= new VueSocketIO({
//   debug: true,
//   connection: '',
// })
//  this.socket=a.connect("http://localhost:3001");
// this.socket.on('statusRoom', function(data) {
        
//        console.log(data);
       
//     });
// this.socket.on("receiveMessage",function(messages){
//   console.log(messages);
// })
//   }catch{
//     console.log("loi");
//   }
 
 
 
    }
    
,methods:{
 confirm(record)
{
  this.currentkey=record.key;
  this.visible=true;
  var data_update={
                "status":1,
                "idticket":record.key,
            }
          
            HTTP.put("request/setstatus/",data_update).then((res)=>{
                if(res.data=="0")
                {
                    message.error("có lỗi xảy ra vui lòng thử lại sau");
                }else{
                  var user = localStorage.getItem("user");
                  var objectUsser = JSON.parse(user);
                  this.data = [];
                  HTTP.get("user/getuserbyemail/" + objectUsser.Wv).then((res) => {
                    if (res.data[0].Itsupport_ID != null) {
                      HTTP.get("request/getbyITid/" + res.data[0].Itsupport_ID).then((res) => {
                        for (var i = 0; i < res.data.length; i++) {
                          var item = {
                            key: res.data[i].idticket,
                            dateoder: moment(String(res.data[i].datecreate)).format('DD/MM/YYYY hh:mm a'),
                            svyc: res.data[i].msv + " - " + res.data[i].name,
                            email: res.data[i].email,
                            service: res.data[i].service,
                            content: res.data[i].content,
                            timerecivie: moment(String(res.data[i].dateiITrecivie)).format('DD/MM/YYYY hh:mm a')
                          };
                          this.data.push(item);
                        }
                      }).catch(() => {

                      });
                    }



                  }).catch(() => {

                  })
                  HTTP.get("request/getmaxroomchatcurrent").then((res) => {
                var roommax=res.data[0].roommax;
                var roomClient=1;
                if(roommax==null)
                {
                  roomClient=1;
                }else{
                  roomClient=roommax+1;
                }
                var data_send={
                    "roomchat":roomClient,
                    "ticketId":record.key
                };
                HTTP.put("request/updateroomchat",data_send).then((res) => {

                  if(res.data=="1")
                  {console.log("update room chat thanh cong")}
                  else{
                    console.log("update room chat không thanh cong")
                  }
                }).catch(() => {

                });


                  }).catch(() => {

                  });
                  message.success("Đã thay đổi trạng thái");

                }

            }).catch(()=>{
              message.error("có lỗi xảy ra vui lòng thử lại sau");
            });
  
},showworkplace()
{
  this.visible.value = true;
},handleOk()
{
 Modal.destroyAll();
},cancel(){
  Modal.destroyAll();
}

}
}
</script>

<style>

</style>