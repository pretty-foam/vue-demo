<template>
  <div class="ratings" ref="rating">
        <div class="rateTotal">
             <div class="totalScore">
                  <div class="score">3.7</div>
                  <div class="title">综合评分</div>
                  <div class="compare">高于周家商铺95.5%</div>
             </div>
             <div class="totalStar">
                  <div class="serverAtitude-wrapper">
                       <span class="atitude">服务态度</span>
                        <star :score="3" :size="1"></star>
                      <span class="score clearfix">3.0</span>
                  </div>
                  <div class="taste-wrapper">
                       <span class="taste">口味评分</span>
                       <star :score="4.5" :size="1"></star>
                       <span class="score clearfix">4.5</span>
                  </div>
                  <div class="time-wrapper">
                       <span class="reach">送达时间</span>
                       <span class="time">44分钟</span>
                  </div>
             </div>
        </div>
        <div class="satisfied-nav">
             <ul class="clearfix">
                  <li @click="controlRate()">全部</li>
                  <li @click="controlRate(1)">满意</li>
                  <li @click="controlRate(0)">不满意</li>
             </ul>
        </div>
        <div class="userRate" v-for="user of ratings" v-show="rateShow[user.rateType]">
             <ul class="clearfix InfoList" >
                <li class="icon"><img :src="user.avatar" alt="" width="30px" height="30px"></li>
                <li class="userInfo">
                    <span class="name">{{user.username}}</span>
                    <span class="star">
                          <star :score="user.score" size="0"></star>
                    </span>
                    <span class="reach">{{user.deliveryTime}}分钟送达</span>
                </li>
                <li class="time">
                   <span > {{new Date(user.rateTime).toLocaleTimeString()}}</span>
                </li>
               <span class="rateText">{{user.text}}</span>
             </ul>


        </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    computed:{
      ...mapState(['ratings'])
    },
    components:{
      star
    },
    data(){
       return{
         rateShow:[true,true]
       }
    },
    methods:{
      ...mapActions(['slide']),
      //评论切换
      controlRate(number){
        switch(number){
          case 0:
            this.rateShow=Object.assign([],[false,true])
            ;break;
          case 1:
            this.rateShow=Object.assign([],[true,false])
            ;break;
          default:
            this.rateShow=Object.assign([],[true,true])
            ;break;
        }
      }
    },
    mounted(){
      this.slide({el:this.$refs.rating,that:this});
      this.$store.state.slideCount=1;
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/css/mixin.styl"
  .ratings
    background rgba(217, 217, 217, 0.2)
    .rateTotal
      display flex
      font-size 14px
      padding 15px 15px 18px 12px
      background white
      box-shadow 0 2px 3px rgba(7,17,27,.15)
      position sticky
      .totalScore
        flex  3
        text-align center
        border-right:1px solid rgba(7,17,27,.1);
        margin-right 14px
        .score
          color rgb(255,155,0)
          font-size 34px
          font-weight 700
          margin-bottom 4px
        .title
          font-size 15px
          font-weight 600
          line-height 30px
        .compare
          font-size 12px
          color rgba(7,17,27,.4)
      .totalStar
        flex 5
        line-height 30px
        .serverAtitude-wrapper
           .atitude
            font-weight 600
            margin-right 4px
        .score
             color rgb(250,170,0)
             float right
        .taste-wrapper
           .taste
             font-weight 600
             margin-right 4px
        .time-wrapper
           .reach
             font-weight 600
             margin-right 10px
           .time
             color rgba(7,17,27,.3)
             font-weight 600

    .satisfied-nav
      margin 20px 0 1px
      padding 18px 0 28px
      background white
      box-shadow 0 2px 3px rgba(7,17,27,.15)
      ul li
        float left
        display block
        background rgba(0,160,220,.2)
        margin-left 16px
        font-size 12px
        padding 8px
        border-radius 3px
        color rgb(77,85,93)
        box-shadow 2px 2px 3px rgba(7,17,27,.15)
      li:nth-child(1)
        background rgba(0,160,220,.7)
        color white
      li:nth-child(3)
        background rgba(77,83,93,.1)
      li:hover
        background rgb(0,160,220)
        color white
    .userRate
       background white
       padding 20px 18px 0 18px
      ul
        position relative
        ul li
          float left
          margin-right 10px
          font-size:14px
        .icon
          display inline-block
          margin-right 5px
        .icon img
          border-radius 50%
        .userInfo
          display inline-block
          font-size 14px
          .name
            display block
            line-height 20px
          .reach
            color rgba(7,17,27,.6)
            font-size 12px
        .time
          position absolute
          top 5px
          right 0
          font-size 12px
        .rateText
          padding  10px 0 15px 40px
          display block
          font-size 14px
          border-1px(rgba(7,17,27,.1))
</style>
