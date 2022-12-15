<template>
  <div style="width:30% ;">
    <ul class="nav nav-tabs">
<li v-for="(tab,index) in tabs" :key="index" class="nav-item">

    <a class="nav-link" :class="{active:tab===selected}">

    </a>
</li>
    </ul>
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
name:"TabsNav",
 props: {
tabs:{
    type: Array,
    required: true,
    
} 
},selected:{
    type: String,
    required: true,   
},methods:{

    setTab(tab){
        this.$$emit("se;ected",tab);
    }
}
}
</script>

<style>

</styl>