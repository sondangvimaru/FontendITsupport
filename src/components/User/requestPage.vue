<template>
  
    <div class="homepage">
   
     <a><div class="logohome">
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
  </a> 
    
  <div  style="margin-top:20px ;width:100% ;height: auto;text-align: -webkit-center;"  >
    <div style="width:40% ; " id="form" >
   
      <div   style="width:100% " >
        <div  style="width:100% ">
          <div>
            <a-button type="ghost" @click="showmyticket()" >Ticket của tôi</a-button>
            <a-modal   width="60%" v-model:visible="visible" title="Yêu cầu của tôi" @ok="handleOk()" >
              <a-table size="large" loading="tbloading" :dataSource="dataSource" :columns="columns" >
                <template #bodyCell="{ column, record }">
          
                  <template  v-if="column.key === 'action'">
                    <span>
                     
                      <a-button @click="processView(record)" type="primary">xem tiến trình</a-button>
        
                    </span>
                  </template>
                </template>
              </a-table>
              <a-modal   width="80%" :closable="false" :maskClosable="false" v-model:visible="visibleprocess" title="Tiến trình yêu cầu" @ok="handleOkprocess" @cancel="handlecancelprocess">
               <processRequest :Ticketid="this.currenticket" />
              </a-modal>
            </a-modal>
         </div>
          <div>
             <label class="informlable">Dịch Vụ</label>
          </div>
         
          <select  v-model="key"  @change="onChange($event)" style="margin-left:  20px ;color: black ;width: 50%;">
            <option value="" disabled selected>Vui lòng chọn dịch vụ</option>
            <option v-for="(service,index) in data_service" :key="index">
               <option>{{service.name}}</option>
            </option>
            
          </select>
        </div>
     <div style="width:100% ;" >
      
          <label class="informlable">Nội Dung </label>
         <a-textarea  v-model:value="content" placeholder="nội dung yêu cầu" autosize show-count  allow-clear/> 
        </div>
        <div class="sendrequesbutton">  
          <a-button   :loading="send"  @click="sendrequest()" type="primary" >{{sendtextbutton}}</a-button>
           </div>
      </div> 
     
      
       <div class="ticketshow">
        <h1 class="text-ticket" >{{ticket}}</h1>
        
       </div>
       <div>
        <a-button v-show="coppychecked" type="primary" @click="coppy()" >Coppy</a-button>
       </div>
    </div>
  </div>
  </div>
   
</template>
 
<script>
import { message } from 'ant-design-vue';
import axios from 'axios';
import { h, inject, ref } from 'vue';
import moment from 'moment'
import { MehOutlined} from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import processRequest from './processRequest.vue';
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})

export default {

 components:{
  processRequest
 }, data(){
    return {
          content: "",
          send: false,
          valueselectded:'',
          currenticket:'ss',
          visibleprocess:ref<Boolean>(false),
          key:'',
          sendtextbutton:'Gửi Đi',
          sendapi:"http://localhost:3000/request/sendrequest",
          visible : ref<Boolean>(false),
          coppychecked:false,
          ticket:'',
          data_service:[],
          tbloading:false,
          user:  localStorage.getItem("user"),
          columns: [
          {
            title: 'Mã ticket',
            dataIndex: 'maticket',
            key: 'maticket',
          },
          {
            title: 'Ngày gửi',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'action',
            dataIndex: 'action',
            key:'action',
          }
         
        ],
        dataSource: [],
          
          
                    
        }
  },
  setup(){
    
    const Vue3GoogleOauth=inject('Vue3GoogleOauth');
      return{
        Vue3GoogleOauth
      };
      
  },
  watch:{
    valueselectded:function(oldvalue,newvalue){
      console.log(oldvalue,newvalue);

    },Vue3GoogleOauth:function(){
   
      if(this.Vue3GoogleOauth.isAuthorized==false)
      {
        location.reload();
      }
    }

  },
  updated(){
   
   //var login=localStorage.getItem('login');
   if( localStorage.getItem('user')==null || localStorage.getItem('user')==undefined)  {
      this.shownotloginnotification();
      this.$router.push('/');    
     return;
    }
  },
  mounted(){
   
    if( localStorage.getItem('user')==null || localStorage.getItem('user')==undefined) {
      
      this.shownotloginnotification();
      this.$router.push('/');
     
      return;
    }
    var bgr=document.getElementById("background");
         if(bgr!=null) bgr.style.background="#ffff";
         var wave=document.getElementById("wave");
         if(wave!=null) wave.hidden=true;

         HTTP.get("service/getall/").then(res=>{
       this.data_service=res.data;
      
         
         }).catch(()=>{

         });
        
  },methods:{
    changemenu(name){

       
      this.$router.push(name);

    },onChange(event) {
      this.value_seleced=event.target.value;
       
             
        },sendrequest(){
          if(this.value_seleced!=null && this.content!=''){
            this.sendtextbutton="Đang gửi";
           this.send=true;
           var datauser=JSON.parse(this.user);
           
           const email=datauser.Wv;
           const msv=email.split("@")[0].slice(-7);
           const name=datauser.Af;
            var data_send={
              "msv":msv,
              "email":email,
              "name":name,
              "service":this.value_seleced,
              "content":this.content,
              "status":0,
         }
            
         HTTP.post('request/sendrequest',data_send,)
    .then(response => {
     
      message.success("Đã gửi yêu cầu"); 
      this.ticket="Mã ticket:\n"+response.data;
      this.coppychecked=true;
      this.send=false;
      this.sendtextbutton="Gửi Đi"  
    //    location.reload();
    })
    .catch(e => {
      this.errors.push(e)
    })
           
           
          }else{
            message.error("Vui lòng điền đầy đủ thông tin");
          }
        },
        coppy(){
           navigator.clipboard.writeText(this.ticket.replace("Mã ticket:",""));
           message.success("đã coppy ticket");
        },showmyticket(){
        console.log(this.Vue3GoogleOauth);
         this.visible= true;
         this.tbloading=true;
         var datauser=JSON.parse(this.user);
           HTTP.get("request/getmyticket/"+datauser.Wv).then(response =>{
             var stringdata=JSON.stringify(response.data);            
             var mytickets=JSON.parse(stringdata);
             this.dataSource=[];
             for (var i = 0; i < mytickets.length; i++) {
             var ticket = mytickets[i];
             var dateformat=moment(String(ticket.datecreate)).format('DD/MM/YYYY hh:mm')
             var dataSource_item= {
               key: i,
               maticket: ticket.idticket ,
               date: dateformat,

             
                }
             this.dataSource.push(dataSource_item);

                    }
                      
             this.tbloading=false;
             
           }         
           ).catch(e=>{
            console.log(e);
           })
        },handleOk(){
          this.visible= false;
        },oncoppy(){
          console.log("hello mem m")
        },shownotloginnotification(){
          notification.open({
         message: 'Thông báo',
        description:
          'Vui lòng đăng nhập với mail fpt trước',
        icon: () => h(MehOutlined, { style: 'color: #108ee9' }),
      });
        },processView(record)
        {
            this. currenticket=record.maticket;
            
           this.visibleprocess=true;
        },handleOkprocess()
        {
          localStorage.removeItem("roomchat");
          this.visibleprocess=false;
        },handlecancelprocess(){
          localStorage.removeItem("roomchat");
          this.visibleprocess=false;
        }
  } 
}
</script>

<style scoped>
.text-ticket{
  color: rgb(231, 72, 72);
  
}
.ticketshow{
  width: 100%;
}
.sendrequesbutton{
  margin-top: 20px;
  
}
.informlable{
  color: red;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  vertical-align: center;
  
  vertical-align: middle;
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