<template>
      <div class="header border-1px" >
           <div class="content-wrapper">
                <div class="avatar">
                       <img :src=seller.avatar alt="" height="64" width="64">
                </div>
                <div class="content">
                     <div class="title">
                           <span class="brand"></span>
                           <span class="name">{{seller.name}}</span>
                     </div>
                     <div class="description">
                           {{seller.description}}/{{seller.deliveryTime}}分钟送达
                     </div>
                     <div class="support" v-if="seller.supports">
                            <span :class="classMap[seller.supports[0].type]" class="icon"></span>
                            <span class="text">{{seller.supports[0].description}}</span>
                     </div>

                 </div>
                 <div class="support-count" v-if="seller.supports" @touchstart.stop="showClass(seller.score)">
                       {{seller.supports.length}}个 >
                 </div>
           </div>
           <div class="bulletin-wrapper" @touchstart="showClass(seller.score)">
              <span class="bulletin-title"></span>
               <span class="bulletin-text">{{seller.bulletin}}</span>
               <span class="count">> </span>
           </div>
           <div class="background clearfix">
             <img :src="seller.avatar" alt="" width="100%" height="100%">
           </div>
           <transition name="fade">
             <div class="detail" v-if="$store.state.detailShow" >
               <div class="detail-content" >
                 <h1 class="title">{{seller.name}}</h1>
                 <star :score="seller.score" :size="2"></star>
                 <div class="name">
                   <span class="line"></span>
                   <span class="info">优惠信息</span>
                   <span class="line"></span>
                 </div>
                 <ul v-if="seller.supports" class="supports">
                   <li v-for='(value,index) in seller.supports'>
                     <span :class=classMap[index] class="icon"></span>
                     <span class="context">{{value.description}}</span>
                   </li>
                 </ul>
                 <div class="bulletin">
                   <span class="line"></span>
                   <span class="content">商家公告</span>
                   <span class="line"></span>
                   <span class="bulletin-describe">{{seller.bulletin}}</span>
                 </div>

               </div>
               <div class="detail-close" ><i class="icon-close" @touchstart.stop.prevent="detailShow()"></i></div>
             </div>
           </transition>


      </div>
</template>

<script>
  import star from '../star/star.vue'
  import {mapActions,mapGetters,mapMutations,mapState} from 'vuex'
   export default {
    computed:{
      ...mapState(['seller','classMap'])

    },
    methods:{
      ...mapMutations(['detailShow']),
      ...mapActions(['showClass'])
   },
     created(){

     },
     components:{
       star
     }
   }
</script>

<style  lang="stylus" scoped>
  @import "../../common/css/mixin.styl"
     .header
        color #fff
        background rgba(0,0,0,.3)
        padding-bottom 0px
        position: relative
        .content-wrapper
           position relative
           padding 24px 12px 18px 24px
           font-size 0
           .avatar
              display inline-block
           .content
              display inline-block
              font-size 14px
              margin-left 16px
              .title
                margin 2px 0 8px 0
                .brand
                  vertical-align bottom
                  display inline-block
                  width: 30px
                  height: 18px
                  bg-image('../../common/images/brand')
                  background-size 30px 18px
                .name
                    margin-left 6px
                    font-size 16px
                    font-weight bold
                    line-height 18px
              .description
                  margin-bottom 10px
                  line-height 14px
                  font-size 14px
              .support
                  line-height 12px
                  font-size 12px
                  icon(1,14px,14px)
                  .text
                      vertical-align top
                      margin-left 5px
           .support-count
              position absolute
              height 20px
              right 12px
              bottom 14px
              padding 2px 8px
              line-height 20px
              border-radius 14px
              font-size 12px
              font-weight 100
              text-align center
              background rgba(0,0,0,.3)
              box-shadow 1px 1px 3px rgba(0,0,0,.5)



       .bulletin-wrapper
          height 15px
          padding:5px 25px 5px 20px
          position relative
          background rgba(0,0,0,.4)
          position relative
          .bulletin-title
            display inline-block
            width: 22px
            height 12px
            background-size 22px 12px
            bg-image('../../common/images/bulletin')
            position absolute
            top 6px
            left  15px
          .bulletin-text
            display inline-block
            height 14px
            vertical-align top
            font-size 12px
            line-height 14px
            overflow hidden
            margin-left 25px

          .count
             position absolute
             right 10px
             top 4px
        .background
          width: 100%
          height 100%
          position absolute
          top: 0
          left:0
          z-index -1
          filter blur(10px)
        .detail
           position fixed
           width 100%
           min-height 100%
           background rgba(0,0,0,.5)
           top:0
           left:0
           z-index 100
           overflow auto
        .fade-enter-active
             transition opacity 1s
        .fade-enter
              opacity  0
           .detail-content
             height 100%
             margin-top 50px
             padding-bottom 64px
             text-align center
             .title
              text-align center
              font-weight 700
              font-size 18px
              margin-bottom 20px
             .name
               margin 20px 0 0 10px
               text-align center
               .line
                 display inline-block
                 width 25%
                 height 0px
                 border-bottom 1px solid beige
                 vertical-align   middle
               .info
                 display inline-block
                 margin 0 1%  7% 1%
                 font-weight 700
             .supports
               display block
               text-align left
               li
                 display block
                 text-decoration none
                 margin 0 0 3% 17%
                 icon(2,18px,18px)
                 .context
                   font-size 14px
                   margin-left 2%
                   line-height 18px

             .bulletin
              text-align center
              margin 20px 0 20px 0
              .line
                display inline-block
                vertical-align middle
                width 25%
                height 0px
                border-bottom 1px solid beige
              .content
                 display inline-block
                 margin 0 1% 0 1%
                 font-weight 700
              .bulletin-describe
                 display block
                 text-align left
                 margin 4% auto 0 auto
                 width 68%
                 font-size 13px
                 line-height 22px
        .detail-close
              margin-top -32px
              font-size 32px
              text-align center




</style>



















































































