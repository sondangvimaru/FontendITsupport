<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;">
        <a-steps>
            <a-step :status="status1" title="Đã Gửi">
              <template v-if="statusicon1==true" #icon>
                <loading-outlined />
              </template>
              <template #description>
                <span>Đã gửi tới bộ phận IT</span>
              </template>
            </a-step>
            <a-step :status="status2" title="Đã có IT nhận yêu cầu">
              <template v-if="statusicon2==true" #icon>
                <loading-outlined />
              </template>
              <template #description>
                <span>{{itname}}</span>
              </template>
            </a-step>
            <a-step :status="status3" title="Đang xử lý">
              <template v-if="statusicon3==true" #icon>
                <loading-outlined />
              </template>
             
              <template #description>
                <span>IT đang xử lý yêu cầu của bạn</span>
              </template>
            </a-step>
            <a-step :status="status4" title="Hoàn thành">
              <template v-if="statusicon4==true" #icon>
                <loading-outlined />
              </template>
            </a-step>
          </a-steps>
    </div>
    <hr> 
    <div v-show="isprocess">
      <h3>Trao đổi công việc</h3>
      <div id="chatbox" class="chatarea">
         
          <div v-for="(mes,index) in mess" :key="index">
            
        <h4>{{mes}}</h4>    
        </div>
     
      </div>
      <hr> 
      <div style="display: block;">
        <div style="display: inline-block;width: 90%;">

      
        <a-textarea
      
        v-model:value="value2"
        placeholder="Nhập tin nhắn của bạn ở đây"
        :auto-size="{ minRows: 1, maxRows: 2 }"
      />
    </div>
    <div style="display: inline-block;width:10%;padding-left: 10px;margin-bottom:;">
      <a-button  @click="sendmess()" width="200px"  type="primary">Gửi Đi</a-button>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import {

  LoadingOutlined,


} from '@ant-design/icons-vue';
import axios from 'axios';
import VueSocketIO from 'vue-socket.io';
import { message } from 'ant-design-vue';


// import { message } from 'ant-design-vue';
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export var rooomchat=null;

export default {
  data(){
    return{
      status1:"",
      status2:"",
      status3:"",
      status4:"",
      statusicon1:false,
      statusicon2:false,
      statusicon3:false,
      statusicon4:false,
      itname:" ",
      value2:"",
      isprocess:false,
      roomchat:null,
      socket:null,
      mess:[],
      data_mess:[]
    
     
    }
  },
    props:{
        Ticketid:String 
    }, components: {
 
    LoadingOutlined,
  
  },watch:{
    
    Ticketid:function(){
       this.updateboxchat();
    }
  
  },updated(){
    var chatbox3=document.getElementById("chatbox");
    chatbox3.scrollTop = chatbox3.scrollHeight;
  },mounted(){
  this.updateboxchat();
 // var restet_count=0;
 
    this.timer = setInterval(() => {

     //  var count_div_child=  document.getElementById("chatbox").childNodes.length;
    
           
      HTTP.get("request/getbyid/"+this.Ticketid).then(async (res)=>{
        
       
             
             if(res.data.length>0)
             {
              
               if(res.data[0].itname!=undefined) this.itname=res.data[0].itname;
               if(res.data[0].status==0)
               {
                
                 if(res.data[0].itname!=undefined)
                 {
                  
                   this.status1="finish";
                   this.status2="process";
                   this.status3="wait";
                   this.status4="wait";
                  this.statusicon2=true;
                  this.statusicon1=false;
                  this.statusicon3=false;
                  this.statusicon4=false;
                 }else{
                   this.status1="process";
                   this.status2="wait";
                   this.status3="wait";
                   this.status4="wait";
                   this.statusicon1=true;
                   this.statusicon2=false;
                  this.statusicon3=false;
                  this.statusicon4=false;
                 }
                 this.isprocess=false;
               }else
                 if(res.data[0].status==1)
                 {
                   this.status1="finish";
                   this.status2="finish";
                   this.status3="process";
                   this.status4="wait";
                   this.statusicon3=true;
                   this.statusicon2=false;
                  this.statusicon1=false;
                  this.statusicon4=false;
                 this.isprocess=true;
                  
                
                //  if(this.roomchat==null)
                //  {
                  
                  HTTP.get("request/getroomchatbyticket/"+this.Ticketid).then((res)=>{
                  
                 if(res.data[0].roomchat!=null)
                 {
                 
               
                  localStorage.setItem("roomchat",this.roomchat);
                   try {
                    if(res.data[0].roomchat!=  this.roomchat){
                      this.roomchat=res.data[0].roomchat;
                                     
                     var a = new VueSocketIO({
                       debug: true,
                       connection: '',
                     })
                     this.socket = a.connect("http://localhost:3001");
                     this.socket.emit("sendroom",this.roomchat);
                     
                    //  this.socket.on('statusRoom', function (data) {

                    //    console.log(data);

                    //  });
                     this.socket.on("receiveMessage", function (message) {
                      
                      var iDiv = document.createElement('div');
                       // iDiv.className = 'mess-right';
                        iDiv.style.marginLeft="59%";
                        iDiv.style.width="40%";
                        iDiv.style.height="auto";
                        
                        var chatbox=document.getElementById("chatbox");
                        chatbox.appendChild(iDiv);
                        const h4e= document.createElement('h5');
                        h4e.textContent="IT:"+message;
                        h4e.style.textAlign="end";
                        iDiv.appendChild(h4e);
                        chatbox.scrollTop = chatbox.scrollHeight;
                      console.log("thangkia:"+message);
                     })
                    }
                   } catch {
                     console.log("loi");
                   }
                 }
                 }).catch(()=>{

                 });
                //  }
                 }else if(res.data[0].status==2)
                 {
                   this.status1="finish";
                   this.status2="finish";
                   this.status3="finish";
                   this.status4="finish";
                   this.statusicon3=false;
                   this.statusicon2=false;
                  this.statusicon1=false;
                  this.statusicon4=false;
                  this.isprocess=false;
                 }
             }
       
            //  if(count_div_child==0 ||count_div_child==1)
            // {
            //   this.updateboxchat();
            // }else if(restet_count>=300){
            //   this.updateboxchat();
            //   restet_count=0;
            // }
            });
  }, 1000)
 
},methods:{
  updateboxchat(){
    var chatbox3=document.getElementById("chatbox");
    
         chatbox3.innerHTML="";
       
      HTTP.get("request/getroomchatbyticket/"+this.Ticketid).then((res)=>{
        if(res.data[0].roomchat!=null){
                
         
      
          
          HTTP.get("message/getmessinroom/"+res.data[0].roomchat).then((res)=>{
            
           
            if(res.data.length>0)
            {
              
            //  if(this.res.data_mess!=null && count_div_child<=1){
             
            //   return null;
            //  } 
             
            for(var i=0;i<res.data.length;i++)
              {
               
                if(res.data[i].type ==1)
                  {
                 
                   
                    
                   this.MessLeft(res,i);
                  }else
                  {
                    this.MessRight(res,i);
                   
                
                  }

                                 
              }
              
            }
          }).catch(()=>{

          })
          
        }
      });
     
  },
  sendmess(){
    
    if(this.value2=='')
    {
      message.error("tin nhắn không được để trống");
      return;
    }
    if(this.socket!=null){
    
      var datasend={
                        "type":1,
                        "content":this.value2,
                        "roomid":this.roomchat
                      }
      this.socket.emit("sendMessage",JSON.stringify(datasend));
      // var chatbox=document.getElementById("chatbox");
      // chatbox.innerHTML="<h4>toi:"+message+"</h4>"
            var iDiv = document.createElement('div');
                        iDiv.style.width="40%";
                        iDiv.style.height="auto";
                        var chatbox=document.getElementById("chatbox");
                        chatbox.appendChild(iDiv);
                        const h4e= document.createElement('h5');
                        h4e.textContent="tôi: "+this.value2;
                        iDiv.appendChild(h4e);
                        chatbox.scrollTop = chatbox.scrollHeight;
      this.value2="";
    }
  },MessRight(res,i){
          var iDiv = document.createElement('div');
                       // iDiv.className = 'mess-right';
                        iDiv.style.marginLeft="59%";
                        iDiv.style.width="40%";
                        iDiv.style.height="auto";
                        
                        var chatbox=document.getElementById("chatbox");
                        chatbox.appendChild(iDiv);
                        const h4e= document.createElement('h5');
                        h4e.textContent="SV:"+res.data[i].content;
                        h4e.style.textAlign="end";
                    
                        iDiv.appendChild(h4e);
                        chatbox.scrollTop = chatbox.scrollHeight;
                        
        },MessLeft(res,i){
          var iDiv2 = document.createElement('div');
                        iDiv2.style.width="40%";
                        iDiv2.style.height="auto";
                        var chatbox2=document.getElementById("chatbox");
                        chatbox2.appendChild(iDiv2);
                        const h4e2= document.createElement('h5');
                        h4e2.textContent="tôi: "+res.data[i].content;
                        iDiv2.appendChild(h4e2);
                        chatbox2.scrollTop = chatbox2.scrollHeight;
                        
        }
}
   
  
}
</script>

<style scoped>

.mess-right{
  margin-left: 59%;
   width:40%; 
   height: auto;
}
.mess-left{
  height: auto;
   width:40% ;
}
.chatarea{
  width: 100%;
  height: 300px;
  overflow:scroll
}
</style>