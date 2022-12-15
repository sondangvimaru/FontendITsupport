<template>
  <div class="homepage">
   
      <div class="logohome">
        <img src="../../images/logo.png" /> 
        </div>
        <div >
          <h1 class="text-title">Hệ Thống gửi yêu cầu CNTT</h1>
        </div>

        
  
    
  </div>
</template>
 
<script>
export default {
  name: 'HomeUser',
  components: {
     
  },
  props: {
    msg: String
  },mounted(){
    console.log("da vao home");
    var bgr=document.getElementById("background");
         if(bgr!=null) bgr.style.background="#ffff";
         var wave=document.getElementById("wave");
         if(wave!=null) wave.hidden=true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-content{
  background-color: white;
  padding: 32px;
  box-shadow: inset;
}
.tabs{
  width: 900px;
  margin: 0 auto;
}
.nav-tabs{
  display: flex;
  justify-content: space-between;
}
.nav-item{
  color: white;
  transition: all 150ms;
  cursor: pointer;
  background-color:purple;
  height: 112px;
  width: 31.5%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.nav-item img{
  width: 50px;
  height: 50px;
}
.text-title{
  color: crimson;
  font-family: crimson;
  font-weight: bold;  
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
 
</style>
