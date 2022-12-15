<template>
  <div style="width: 100%;height: 100%;">
    <div class="statusbar">
        <h2>Trạng thái yêu cầu</h2>
        <hr>
        <div class="statusbaritem1">
    <select id="statuslist"  @change="onChange($event)" style=" color: black ;width: 90%;">
        
        <option value="1" >Đang xử lý</option>
        <option value="2" > Hoàn thành</option>
        
        </select>
    </div>
    
    <div class="statusbaritem2">
        <a-button @click="changestatus()" type="primary">Thay đổi</a-button>
    </div>
      </div>
      <hr> 
      <div style="width: 100%;height: 100%;">
        <h2>Trao đổi công việc</h2>
        <div id="chatbox" class="chatarea">
        
           
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
          <a-button @click="sendmesss()"  width="200px"  type="primary">Gửi Đi</a-button>
        </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import VueSocketIO from 'vue-socket.io';

export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})

export default {
name:'WorkPlace',
props:{
        Idticket:String
    } ,data()
    {
        return {
            
            value_seleced:"1",
            value2:"",
            roomchat:null,
            socket:null,
            messageslist:[],
            chatboxx:null,
           

        }
    },methods:{
      updateboxchat(){
         var chatbox=document.getElementById("chatbox");
         chatbox.innerHTML="";
   
      HTTP.get("request/getroomchatbyticket/"+this.Idticket).then((res)=>{
        if(res.data[0].roomchat!=null){
          
          HTTP.get("message/getmessinroom/"+res.data[0].roomchat).then((res)=>{
          
         
            if(res.data.length>0)
            {
              
              for(var i=0;i<res.data.length;i++)
              {
                if(res.data[i].type == "1")
                  {
                   
                    this.MessRight(res,i);
                  }else
                  {
                   
                    this.MessLeft(res,i);
                  }


              }
            }
          }).catch(()=>{

          })
         
        }
      });
          
      },
        onChange(event){
            this.value_seleced=event.target.value;
           
        },changestatus(){
            var data_update={
                "status":this.value_seleced,
                "idticket":this.Idticket,
            }
          
            HTTP.put("request/setstatus/",data_update).then((res)=>{
                if(res.data=="0")
                {
                    message.error("có lỗi xảy ra vui lòng thử lại sau");
                }else{
                    message.success("Đã thay đổi trạng thái");
                }

            }).catch(()=>{
              message.error("có lỗi xảy ra vui lòng thử lại sau");
            });
        },sendmesss(){
     
          
            if(this.value2=='')
            {
             
                message.error("tin nhắn không được để trống");
                return;
            }else{

              console.log(this.socket);
             
                    if(this.socket!=null){
                     
                       
                      var datasend={
                        "type":2,
                        "content":this.value2,
                        "roomid":this.roomchat
                      }
                     console.log("div2");
                        this.socket.emit("sendMessage",JSON.stringify(datasend));
                       
                       var iDivv = document.createElement('div');
                         iDivv.style.width="40%";
                       iDivv.style.height="auto";
                     
                        this.chatboxx=document.getElementById("chatbox");
                        this.chatboxx.appendChild(iDivv);
                        
                        const h4ee= document.createElement('h5');
                        h4ee.textContent="tôi: "+this.value2;
                        iDivv.appendChild(h4ee);
                        this.chatboxx.scrollTop = this.chatboxx.scrollHeight;

                        //  chatbox.innerHTML="<h4>toi:"+message+"</h4>"
                      
                        this.value2="";
                    }
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
                        chatbox.scrollTop = chatbox.scrollHeight;
                        iDiv.appendChild(h4e);
                        
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
    },
    watch:{
      Idticket:function(){
        this.updateboxchat();
      }
    }
    ,updated(){
    
    
            
        },mounted(){
        this.updateboxchat();
        setInterval(()=>{
 
           
HTTP.get("request/getbyid/"+this.Idticket).then((res)=>{
        
        if(res.data.length>0)
        {
            if(res.data[0].status==1)
            {
                HTTP.get("request/getroomchatbyticket/"+this.Idticket).then((res)=>{
                  
            if(res.data[0].roomchat!=null)
            {
              
             if(  this.roomchat!=res.data[0].roomchat){
                this.roomchat=res.data[0].roomchat;
              console.log(this.roomchat);
            try {
              var a = new VueSocketIO({
                debug: true,
                connection: '',
              })
              this.socket = a.connect("http://localhost:3001");
              console.log("roomchat"+this.roomchat);
              this.socket.emit("sendroom",this.roomchat);
            
             //  this.socket.on('statusRoom', function (data) {

             //    console.log(data);

             //  });
              this.socket.on("receiveMessage", function (message) {
                //   var chatbox=document.getElementById("chatbox");
                // chatbox.innerHTML="<h4>thangkia:"+message+"</h4>"
              
                var iDivd = document.createElement('div');
               // iDiv.className = 'mess-right';
                iDivd.style.marginLeft="59%";
                iDivd.style.width="40%";
                iDivd.style.height="auto";
                
                var chatboxd=document.getElementById("chatbox");
                chatboxd.appendChild(iDivd);
                const h4ed= document.createElement('h5');
                h4ed.textContent="SV:"+message;
                h4ed.style.textAlign="end";
                iDivd.appendChild(h4ed);
                chatboxd.scrollTop = chatboxd.scrollHeight;
                console.log("thangkia:"+message);
              })
            } catch {
              console.log("loi");
            }
             }
          
            }
            }).catch(()=>{

            });
                document.getElementById('statuslist').getElementsByTagName('option')[0].selected = 'selected';
            }else if(res.data[0].status==2)
            {
                document.getElementById('statuslist').getElementsByTagName('option')[1].selected = 'selected';
            }
        }
    });
},1000);
          // var restet_count=0;
          // console.log(restet_count);
          // setInterval(() => {
          //   var count_div_child=  document.getElementById("chatbox").childNodes.length;
            
          
          //   if(count_div_child==0||count_div_child==1)
          //   {
             
          //   this.updateboxchat();
          //   }else if(restet_count>=300){
          //     this.updateboxchat();
          //     restet_count=0;
          //   }
          // restet_count++;
          // }, 1000);
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
.statusbar{
    display: block;
    width: 100%;
    
}
.statusbaritem1{

    display: inline-block;
    width: 50%;
}
.statusbaritem2{

    display: inline-block;
}
</style>