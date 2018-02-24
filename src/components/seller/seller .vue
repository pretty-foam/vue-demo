<template>
  <div class="seller" ref="seller">
        <div class="sellerInfo">
              <div class="nameWrapper">
                    <span class="name">{{seller.name}}</span>
                    <span class="star">
                          <star :score="seller.score" :size="1"></star>
                           <span class="ratingTotal">({{seller.ratingCount}})</span>
                           <span class="sellNumber">月售{{seller.sellCount}}单</span>
                    </span>
                    <span class="collection">
                          <span class="heart icon-favorite"></span>
                          <span class="title">收藏</span>
                    </span>
              </div>
              <ul class="sendDetail">
                  <li class="sendPrice">
                      <div>起送价</div>
                      <span class="priceDetail">{{seller.minPrice}}</span>元
                  </li>
                  <li  class="sendCost">
                       <div>商家配送</div>
                       <span class="costDetail">{{seller.deliveryPrice}}</span>元
                  </li>
                  <li class="sendTime">
                      <div>平均配送时间</div>
                      <span class="timeDetail">{{seller.deliveryTime}}</span>分钟
                  </li>
              </ul>
        </div>
        <div class="bulletinActive">
              <div class="title">公布与活动</div>
              <div class="description">{{seller.bulletin}}</div>
              <ul v-if="seller.supports" class="supports">
                  <li v-for='(value,index) in seller.supports'>
                        <span :class=classMap[index] class="icon"></span>
                        <span class="context">{{value.description}}</span>
                  </li>
              </ul>
        </div>
        <div class="real">
              <div class="title">商家实景</div>
              <ul class="clearfix">
                  <li v-for="value of seller.pics"><img :src="value" alt="" width="120px" height="90px"></li>
              </ul>
        </div>
        <div class="sellerInfo">
             <div class="title">商家信息</div>
             <ul>
                 <li v-for="value of seller.infos">
                   <span>{{value}}</span>
                 </li>
             </ul>
        </div>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import star from '../star/star.vue'
   export  default {
     computed:{
       ...mapState(['seller','classMap'])
     },
     components:{
       star
     },
     methods:{
       ...mapActions(['slide'])
     },
     mounted(){
       this.slide({el:this.$refs.seller,that:this});
       this.$store.state.slideCount=2;
     }
   }
</script>

<style scoped lang="stylus">
  @import "../../common/css/mixin.styl"
.seller
  background rgba(7,17,27,.05)
  .sellerInfo
    padding  18px
    font-size 14px
    background white
    box-shadow 0 2px 3px rgba(7,17,27,.15)
    .nameWrapper
       position relative
       border-1px(rgba(7,17,27,.1))
       padding-bottom 10px
      .name
        display block
        font-size 17px
        font-weight 600
      .star
        font-size 12px
        line-height 30px
        color rgba(7,17,27,.4)
        padding-top 5px
        vertical-align bottom
        .ratingTotal
          display inline-block
          margin-right 10px
      .collection
        position absolute
        top: 0
        right 0
        text-align center
       .heart
         color red
         font-size 24px
       .title
         display block
         line-height 30px
         font-size 13px
  .sendDetail
    display flex
    margin 15px 0 0
    text-align center
    & li
      flex 1
      color rgba(7,17,27,.5)
      line-height 30px
      .priceDetail
        color black
        font-size 20px
      .costDetail
         color black
         font-size 20px
      .timeDetail
        color black
        font-size 20px
    .sendCost
      border-left 1px solid rgba(7,17,27,.1)
      border-right 1px solid rgba(7,17,27,.1)
  .bulletinActive
   background white
   margin 20px 0 0 0
   padding 18px
   line-height 30px
   font-size 14px
   box-shadow 0 2px 3px rgba(7,17,27,.15)
   .title
     font-size 16px
     font-weight 700
   .description
     color red
     padding 0 12px
   .supports
      display block
      text-align left
      margin-top 15px
      li
        display block
        text-decoration none
        margin 0 10px 0 10px
        padding 10px 0
        border-top 1px solid rgba(7,17,27,.1)
        icon(2,18px,18px)
        .context
          font-size 14px
          margin-left 2%
          line-height 18px
  .real
    background white
    margin 10px 0 10px
    padding 18px
    .title
      font-size 16px
      font-weight 700
      line-height 30px
    ul
      width: 100%
      overflow hidden
      margin 10px 0 0 4px
    ul li
       float left
       margin 0 36px  32px 10px
       box-shadow 1px 1px 3px rgba(7,17,27,.15)

  .sellerInfo
    margin 10px 0 0
    .title
       font-weight 700
       font-size 16px
       line-height 30px
    ul li
       display block
       margin 5px 0 0 10px
       font-size 13px
       border-top: 1px solid rgba(7,17,27,.1)
       padding 10px 0 10px
</style>
