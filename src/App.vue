<template>
        <div class="app">
               <V-header></V-header>
               <tab></tab>
               <div class="content">
                 <keep-alive>
                  <transition name="fade">
                    <router-view></router-view>
                  </transition>
                 </keep-alive>
               </div>
        </div>


</template>

<script >
       import header from './components/header/header.vue'
       import tab from './components/tab/tab.vue'
       export default {
         components:{
           'V-header':header,
           tab
         },
         created(){
           this.$http.get('/api/seller').then((res)=>{
                 if(res.data.errno===0){
                     this.$store.state.seller =res.data.data
                 }
           });
           this.$http.get('/api/goods').then((res)=>{
              res.data.errno===0?this.$store.state.goods=res.data.data:console.log('error')
           });
           this.$http.get('api/ratings').then((res)=>{
              res.data.errno===0?this.$store.state.ratings=res.data.data:console.log('error')
           })
         }
       }
</script>

<style scoped lang="stylus">
.app
  width 100%
  height 100%
  position relative
  min-width 310px
  overflow hidden
  .content
    position absolute
    top 178px
    left 0px
    right 0px
    bottom 0px
    overflow hidden
    .fade-enter
        transform translateX(100px)
        opacity 0
    .fade-enter-active
        transition all .5s

</style>
