
<template>
  <div class="tips-status" v-show="flag">
    <!-- <img width="24" height="24" src="./loading.gif"> -->
    <p class="statusImg" :class="statusClass"></p>
    <p class="desc">{{title}}</p>
    <div class="button" v-if="isShowButton" @click="btnClick">
      {{text}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '恭喜！您的信息已提交成功！'
      },
      statusClass: {
        type: String,
        default: 'success'
      },
      text: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default() {
          return [0]
        }
      }
    },
    data() {
      return {
        isShowButton: true,
        flag: true
      }
    },
    created() {
      //do something after creating vue instance
      if (this.text === '') {
        this.isShowButton = false
      }
    },
    methods: {
      btnClick() {
        this.$emit('btnClick')
        // console.log('btnClick')
      },
      show() {
          this.flag = true
      }
    },
    watch: {
      data(val) {
        if (!val.length) {
          this.flag = true
        } else {
          this.flag = false
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tips-status
    position:absolute
    left: 0
    top:0
    width: 100%
    height:100%
    // background:$color-background
    text-align: center
    // padding-top:30%
    .desc
      font-size: $font-size-medium
      color:$color-text
      // position:absolute
      // left: 0
      // bottom:-10px
      margin-top:-10px
  .statusImg
    width:165px
    height:165px
    background:url('./success.png')
    background-size:cover
    margin:0 auto
    position:relative
    &.no-network
      background:url('./no-network.png')
      background-size:cover
    &.no-record
      background:url('./no-record.png')
      background-size:cover
    &.no-coupon
      background:url('./no-coupon.png')
      background-size:cover
  .button
    width:150px
    height:40px
    line-height:40px
    border-radius:0px
    text-align: center
    background:$color-theme
    margin:0 auto
    color:#fff
    margin-top:20px
    font-size:14px
    &:active
      background:$color-theme-d
</style>
