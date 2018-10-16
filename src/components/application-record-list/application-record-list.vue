<template>
  <div id="userUpload">
    <!-- <title-line :precent="75"> </title-line> -->
      <div class="userUploadContent" ref="userUploadContent">
        <scroll v-show="ApplyInfoList.length>0" ref="scroll">
          <div >
            <div class="list-box-wrap" v-for="item in ApplyInfoList" :key="item.ID">
                <div class="list-box">
                  <div class="list-car-info">
                    <p><span>申请人 </span><span v-html="item.Name.slice(0,13)">李丽</span></p>
                    <!-- <p>手机号<span v-html="item.Phone">18516262651</span></p>
                      <p>身份证号<span v-html="item.IDNumber">340321199103210085</span></p> -->
                    <p><span>车牌号</span><span>{{item.CarNum}}</span></p>
                    <p><span>车牌颜色</span><span v-html="item.CarColor">黄</span><span v-show="item.CarColor.length===1">牌</span></p>
                    <!-- <p v-show="item.CheckStatus==='1'"><span>可用额度</span><span>{{item.CarNum}}</span></p> -->
                  </div>
                  <div class="status-btn" :class="calStatusBtn(item.CheckStatus)" v-html="formCheckStatus(item.CheckStatus)">
                  </div>
                </div>
            </div>
            <div class="h15"></div>
          </div>
        </scroll>
      </div>
      <!-- <div class="buttonBoxWrap" @click="back()">
        <my-button>
          <div>办理ETC</div>
        </my-button>
      </div>
      <div class="" style="height:40px;">

      </div> -->
      <div class="tips-status-box" v-show="!ApplyInfoList.length">
        <div class="ptc">
          <tipsStatus statusClass="no-record" title="暂时还没有申请记录" text="办理ETC" @btnClick="back()"></tipsStatus>
        </div>
      </div>
      <ajax-loading :type="loadingType" ref="loading"></ajax-loading>
  </div>
</template>
<script>
import Title1 from "base/title1/title1"
import Scroll from 'base/scroll/scroll'
import myInput from "base/my-input/my-input"
import myButton from "base/my-button/my-button"
import titleLine from "base/title-line/title-line"
import VueCoreImageUpload from 'vue-core-image-upload'
import topTips from 'base/top-tips/top-tips'
import tipsStatus from 'base/tipsStatus/tipsStatus'
import {url, IS_SUCCESS} from 'api/config'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import AjaxLoading from 'base/ajax-loading/ajax-loading'
import qs from 'qs'
const debug = process.env.NODE_ENV !== 'production'
const uploadPath = debug ? 'http://localhost:1293/' : '/'
export default {
  name: "userUpload",
  data: () => ({
    ApplyInfoList: [],
    statusBtn: '',
    loadingType: 1, //白底色loading
    btnDisable: false
  }),
  created() {
    //
  },
  activated() {
    this.$refs.scroll.refresh()
    this.getUserApplyInfo()
  },
  mounted() {
    var _height = 10 //按钮高度
    var _boxHeight = this.$el.clientHeight //组件高度与窗口高度一样高
    this.$refs.userUploadContent.style.height = `${_boxHeight - _height}px`
  },
  methods: {
    getUserApplyInfo() {
      ///SubInfo/CheckStep
      var _params = {
        data: {}
      }
      var that = this
      this.axios({ method: 'post',
              url: url + '/SubInfo/QueryApply', //代理跨域之后可以/Test/PostToken或者http://localhost:8080/Test/PostToken
              data: _params
              })
              .then(function (res) {
                  console.log('response2223:', res)
                  if (res.data.issuccess === IS_SUCCESS) {
                    that.ApplyInfoList = res.data.result //[]
                    that.$refs.loading.hide()
                    console.log(that.ApplyInfoList.length)
                  } else {
                     // alert(res.data.message)
                     return false
                  }
              })
              .catch(function (error) {
                  console.log(error)
              })
    },
    formCheckStatus(val) {
      if (val === "-1") {
        return '待申请'
      }
      if (val === "0") return '审核中'
      if (val === "1") return '审核成功'
      if (val === "2") return '审核失败'
      if (val === "3") return '审核中' //人工介入中 -->审核中
      if (val === "4") return '已注销'
    },
    calStatusBtn (val) {
      if (val === "1" || val === "3") {
        return 'success'
      }
      if (val === "-1" || val === "2" || val === "4") {
        return 'fail'
      }
    },
    back() {
      this.$router.push('/process')
    },
    destroy() {
      this.$refs.scroll.destroy()
      // console.log('destroy')
    }
  },
  watch: {
    ApplyInfoList(val) {
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
    }
  },
  computed: {
    ...mapGetters([
      'userApplyStep'
    ])
  },
  components: {
    Title1,
    myInput,
    Scroll,
    AjaxLoading,
    tipsStatus,
    myButton
  }
}
</script>
<style lang="stylus" scoped>

@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.image-upload-test
  position:fixed
  left:0
  right:0
  top:0
  bottom:0
  background:$color-background-dd
  display:none
#userUpload
  position:fixed
  left:0
  right:0
  top:0
  bottom:0
  background:$color-background-dd
.userUploadContent
  height:100%
  overflow:hidden
.list-box-wrap
  // border-1px(#dddddd)
  margin-top:15px
  // margin-bottom:15px
  padding:0 10px
  .list-box
    padding:16px 14px
    background:$color-background
    margin: 0 auto;
    position:relative
    overflow:hidden
    .list-car-info
      position:relative
      p
        width:100%
        text-align:left
        font-size:14px
        color:#333
        height:20px
        line-height:20px
        margin-bottom:12px
        span
          display:inline-block
          &:first-child
            // margin-right:30px
            width:91px
        &:last-child
          margin-bottom:0px
    .status-btn
      position:absolute
      right: -42px
      top: 12px
      font-size:12px
      color:#fff
      background:#f7c223
      height:20px
      width:126px
      line-height:21px
      transform: rotate(45deg)
      &.success
        background:#12c42b
      &.fail
        background:#ff5b05
.split-line
  width:100%
  height:9px
  background:$color-background-dd
  border-1px(#dddddd)
.buttonBoxWrap
  // margin-top:42px
  position:fixed
  bottom:20px
  width:100%
.tips-status-box
  position:absolute
  left: 0
  top:0
  width: 100%
  height:100%
  background:#fff
  // display:none
  .ptc
    margin-top:30%
    position:relative
.h15
  height:15px
</style>
