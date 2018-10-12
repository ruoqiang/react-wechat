import React,{ Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { noToken } from './config'
import store from 'store/index.js'
import { loadToken } from 'common/js/cache'
// import createHistory from "history/createBrowserHistory"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
let token = loadToken()
export default (WrappedComponent) => {
    return class extends Component {
      constructor(props) {
        super(props)
        this.state = {
          error: false
        }
      }
      componentWillMount() {
        axios.interceptors.response.use((config) => {
            var newData = Object.assign({}, config.data || {})
            //不需要包裹一层data属性的字段特殊处理接入第三方接口时的传惨形式
            if (config.url.indexOf('isThirdInterface') > -1) {
              // alert('isThirdInterface')
            } else { //传递参数的时候需要把参数包裹一层data属性字段的
              config.data['data'] = newData
              config.data['token'] = token //拿到token
              for (var key in config.data) {
                if (key !== 'data' && key !== 'token') {
                  delete config.data[key]
                }
              }
            }
            config.data = qs.stringify(config.data)
          if (config.method === 'post') {
            if (token === noToken) { //没有token ///store.state.token === noToken
                // let noNeedLoginPage = ['/', '/register', '/login', '/findpassword', '/userSeeFlowingWater', '/userSeeCarPass', '/userSeeCarPass/List', '/operationReport', '/webankUserLogin']
                // if (noNeedLoginPage.indexOf(router.currentRoute.path) < 0) { //不在数组里
                //   router.push('/login')
                // }
              }
            }
          return config
            },
            (err) => {
                return Promise.reject(err)
        });
        // http response 拦截器
        axios.interceptors.response.use(
            (response) => {
            if (response.data.statuscode === 403) {
            console.log('403');
            
            // const history = createHistory();
            setTimeout(() => {
                // history.push('/login')
                let _href = window.location.href
                let _hrefArr = _href.split('#')
                window.location.href = _hrefArr[0] + '#/login'; //太low了。。。。
                }, 100)
            }
            return response
            },
            (error) => {
            if (error.response) {
                // switch (error.response.status) {
                //   case 401:
                //   // 返回 401 清除token信息并跳转到登录页面
                //     //store.commit(types.LOGOUT)
                //   //   router.replace({
                //   //     path: '/login',
                //   //     query: {
                //   //       redirect: router.currentRoute.fullPath
                //   //     }
                //   //   })
                // }
                return
            }
            //console.log(error)
            return Promise.reject(error.response)
            }
        )
      }
      render() {
        const errorElem = this.state.error ? <div>请求出错了</div> : null
        return (
          <div>
            { errorElem }
            <WrappedComponent {...this.props}/>
          </div>
        )
      }
    }
  }