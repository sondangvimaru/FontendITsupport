<template>
  <div class="login">
    
    <!-- <h1>Is Initialized :{{Vue3GoogleOauth.isInit}}</h1>
    <h1>Is Authorized:{{Vue3GoogleOauth.isAuthorized}}</h1> -->
  <div> 
    <div class="logo">
    <img src="../images/logo.png" />
    </div>
    <div>
        <p style="padding:10px ;font-size: 50px; font-family:'Times New Roman', Times, serif ;font-weight: bold ;color:rgb(58 24 231)">Hệ thống yêu cầu hỗ trợ CNTT</p>
    </div>
  </div>
    <div  @click="handelLogin()" v-show="(Vue3GoogleOauth.isInit &&      !Vue3GoogleOauth.isAuthorized)"   class="g-sign-in-button">
        <div class="content-wrapper">
          <div class="logo-wrapper">
            <img src="https://developers.google.com/identity/images/g-logo.png">
          </div>
          <span class="text-container">
            <span>Đăng nhập với Google</span>
          </span>
        </div>
      </div>
<!-- <button @click="handelLogin()" :v-show="(!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized)">Sigin In</button> -->
<button @click="handelSingOut()" :disabled="!Vue3GoogleOauth.isAuthorized">Sigin out</button>


</div>
</template>

<script>
import { inject,h } from 'vue';
import axios from 'axios';
import { CheckCircleOutlined} from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';

export const HTTP = axios.create({
  baseURL: 'http://localhost:3000', 
})
export default {
name:'GoogleLogin',
 
data(){
    return{
        user:'',
    
    }
},
props: {
    data: Boolean,
  },
setup(){
    const Vue3GoogleOauth=inject('Vue3GoogleOauth');
    return {
            Vue3GoogleOauth
        };  
        
},
updated(){
  // var login=localStorage.getItem("login");
  
  // if(login=="true"){
  //   console.log("beforeMount");
  //   this.$route.push('requestform')
  //   return;
  // }
}
,methods:{
   async handelLogin(){
    try{
        const googleUse= await this.$gAuth.signIn();
        
        if(!googleUse)        
        {return null;}
        
        
         if(localStorage.getItem("login")=="true") {
         var bgr=document.getElementById("background");
         if(bgr!=null) bgr.style.background="#ffff";
         var wave=document.getElementById("wave");
         if(wave!=null) wave.hidden=true;
      }
        this.user=JSON.stringify(googleUse.getBasicProfile());
        var data_send={"email":googleUse.getBasicProfile().getEmail()};
       this.showloginsuccess();
        HTTP.post("user/checklogin/",data_send).then(res=>{
          console.log("check"+res.data);
          if(res.data=="0") {
            this.$router.push("requestform")
          }else if(res.data=="1"){
            this.$router.push("management")
          }
        }).catch(()=>{

        });
       
        localStorage.setItem("user",this.user);
        localStorage.setItem("login","true");
        // var users=localStorage.getItem("user");

        // console.log(users);
       // console.log(googleUse.getBasicProfile());
    }catch(err){
        console.log(err);
        return null;
    }
        
    },
    async handelSingOut(){
        try{
            await this.$gAuth.signOut();
            localStorage.setItem("login","false");
            localStorage.removeItem("user");
        }catch(err){
            console.log(err);
       return null;
        }
    } ,showloginsuccess(){
     
          notification.open({
         message: 'Thông báo',
        description:
          'Đăng nhập thành công',
        icon: () => h(CheckCircleOutlined, { style: 'color: #2ecc71' }),
      });

    }
}
}
</script>

<style scoped>
.login{
 padding-top: 5%;
 height: 60%;
}
.g-sign-in-button {
    position: absolute;
    margin-top: 10px;
    transform: translate(-50%, -50%);
   
    display: inline-block;
    width: 240px;
    height: 50px;
    background-color:  rgb(127, 119, 234) ;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .25);
    transition: background-color .218s, border-color .218s, box-shadow .218s;
  }
  .g-sign-in-button:hover {
    cursor: pointer;
    -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, .3);
    box-shadow: 0 0 3px 3px rgba(66, 133, 244, .3);
  }
  
  .g-sign-in-button:active {
    background-color: #f4c7cd;
    transition: background-color .2s;
  }
  
  .g-sign-in-button .content-wrapper {
    height: 100%;
    width: 100%;
    border: 1px solid transparent;
    display: block;
  }
  .logo img{
    width: 20   0px;
    height: 150px;
    border-radius: 5px;
  }
  .g-sign-in-button img {
    margin-top: 2px;
    width: 40px;
    height: 40px;
  }  
 
  .g-sign-in-button .logo-wrapper {
    margin-top: 2px;
    background: #fff;
    width: 48px;
    height: auto;
    border-radius: 5px;
    display: inline-block;
  }
  .g-sign-in-button .text-container {
    font-family: "Roboto", arial, sans-serif;
    font-weight: 500;
    letter-spacing: .21px;
    font-size: 16px;
    line-height: 48px;
    vertical-align: top;
    border: none;
    display: inline-block;
    text-align: center;
    width: 180px;
  }
 
</style>