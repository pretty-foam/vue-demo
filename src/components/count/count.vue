<template>
  <div class="count">
     <transition name="fade">
       <span class="descreace icon-remove_circle_outline"  @touchstart.prevent="descreace()" v-show="foodTotal[name]"></span>
     </transition>
     <transition name="number">
       <span class="number" v-if="foodTotal[name]">{{foodTotal[name].number}}</span>
     </transition>
    <span class="add icon-add_circle"  @touchstart.stop="add()"></span>
   </div>


</template>

<script>
    import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'
       export default {
         computed:{
           ...mapState(['ball','price','count','foodTotal'])
         },
         methods:{
           ...mapActions(['total','balls']),
           add(){
             this.total({name:this.name,judge:true,that:this,price:this.data});
             this.$store.state.count++;
             this.$store.state.price+=this.data;
             this.balls(event);
           },
           descreace(){
             this.total({judge:false,name:this.name,price:this.data});
             this.$store.state.count--;
             this.$store.state.price-=this.data
           }
         },
         props:['data','name']
       }
</script>

<style scoped lang="stylus">
  .count
    text-align center
    display block
    height 28px
    width 80px
    font-size 25px
    color #75a0ff
    position absolute
    bottom 6px
    right 18px
    .number
      display inline-block
      color black
      font-size 14px
      vertical-align top
      margin-top 5px
      line-height 14px
    .add
     float right
    .descreace
     float left
    .number-leave-active,.number-enter-active, .fade-leave-active,.fade-enter-active
      transition all .7s
    .number-enter,.number-leave-to
      opacity 0
      transform translateX(30px)
    .fade-enter,.fade-leave-to
      opacity 0
      transform translateX(50px) rotate(90deg)

    .box
      .ball
        width: 20px
        height 20px
        background rgba(0, 0, 255, 0.56)
        border-radius 50%
        position absolute
        top -20px
        right  0
  .test
    width: 15px
    height 15px
    background blue
</style>
