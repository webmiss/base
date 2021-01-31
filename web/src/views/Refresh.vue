<template>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.$router.replace(from.path);
    });
  },
  mounted(){
  },
});
</script>