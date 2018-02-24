<template>
          <div class="tab">
            <div class="tab-item">
               <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
          </div>
</template>

<script>

</script>

<style scoped lang="stylus">
   @import "./../../common/css/mixin.styl"
   .tab
         display: flex
         width: 100%
         height: 40px
         line-height: 40px
         text-align: center
         box-shadow 1px 2px 3px rgba(7,17,27,.15)

   &.tab-item
         flex: 1
      & .tab-item a
         display block
         color: rgba(7,17,27,.6);
         margin 0 40px 0 40px
   & .tab-item .active
         color: red;
         border-1px(red)




</style>
