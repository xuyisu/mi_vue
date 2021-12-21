<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      
    }
  },
  mounted(){
    if(localStorage.getItem('Authorization')){
      this.getUser();
      this.getCartCount();
    }
  },
  methods:{
    getUser(){
      this.axios.get('/user/getUser').then((res={})=>{
        this.$store.dispatch('saveUserName',res.userName);
      })
    },
    getCartCount(){
      this.axios.get('/cart/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
