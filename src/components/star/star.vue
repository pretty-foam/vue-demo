<template>
      <div class="star">
          <div class="stars" v-for="star  in starClass" :class="star"></div>
      </div>
</template>

<script>
     import {mapMutations,mapActions,mapState,mapGetters} from 'vuex'
   export default {
       props:['score','size'],
       data(){
         return{
           starClass:[]
         }
       },
        //根据分数控制star
        mounted(){
           const on='star-on';
           const off='star-off';
           const half='star-half';
           const data=Math.floor(this.score*2)/2;
           for(let i=0;i<Math.floor(data);i++){
             this.starClass.push(on+` stars_${this.size}`)
           }
           if(data%1!==0){
             this.starClass.push(half+` stars_${this.size}`)
           }
           const length=this.starClass.length;
           for(let x=0;x<5-length;x++){
             this.starClass.push(off+` stars_${this.size}`)
           }


       }

   }
</script>

<style lang="stylus" scoped>
  @import "../../common/css/mixin.styl"
    .star
        display inline-block
        .stars
          display inline-block
          margin-right 12px
          vertical-align middle
        .stars_1
          width 17px
          height 17px
          background-size 17px 17px
          margin-right 4px
        .stars_2
          width 30px
          height 29px
          background-size 30px 29px
          margin-right 12px
        .stars_0
          width 13px
          height 13px
          background-size 13px 13px
          margin-right 4px
        .star-on
           bg-image('../../common/images/star36_on')
        .star-off
           bg-image('../../common/images/star36_off')
        .star-half
           bg-image('../../common/images/star36_half')
</style>





























