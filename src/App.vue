<template>
        <div class="app">
               <V-header></V-header>
               <tab></tab>
               <div class="content">
                  <transition name="fade">
                    <router-view></router-view>
                  </transition>
               </div>
        </div>


</template>

<script >
       import header from './components/header/header.vue'
       import tab from './components/tab/tab.vue'
       import {mapActions} from 'vuex'
       export default {
         computed:{
           ...mapActions(['send'])
         }
         ,
         components:{
           'V-header':header,
           tab
         },
         created(){
           this.send(this)
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
