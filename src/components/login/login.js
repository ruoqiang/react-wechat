import React, {Component} from 'react'
import axios from 'common/js/http'
import { url } from 'common/js/config'
import Confirm from 'base/confirm/confirm'
import { withRouter, Link } from 'react-router-dom'

import { setToken } from 'common/js/cache'
// import { addClass, removeClass } from 'common/js/dom'
class Login extends Component{
    constructor() {
        super()
        this.state = {
            mobile: '',
            password: '',
            tipsText: '',
            isOpen: false,
            inputType: 'password'
        }
        this.confirm = React.createRef()
        this.buttonBtn = React.createRef()
        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handlePassWordChange = this.handlePassWordChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.switchEye = this.switchEye.bind(this)
        this.btnDisable = false
    }
    componentDidMount() {
        let _mobile = localStorage.getItem('mobile')
        this.setState({
            mobile: _mobile
        })
    }
    handleMobileChange (e) {
        this.setState({
            mobile: e.target.value
        })
    }
    handleLogin (e) {
        let that = this
        let params = {
            Identifier:this.state.mobile,
            Credential:this.state.password
        }
        if (params.Identifier === '') {
            this.setState({
                tipsText:'请输入手机号码'
            })
            this.refs.confirm.show()
            return
          }
          if (!/1[3|4|5|7|8]\d{9}/.test(params.Identifier)) {
            this.setState({
                tipsText:'请输入正确手机号码'
            })
            this.refs.confirm.show()
            return
          }
          if (params.Credential === '') {
            this.setState({
                tipsText:'请输入密码'
            })
            this.refs.confirm.show()
            return false
          }
        axios({ method: 'post',
            url: url + 'Login/UserLogin',
            data: params
        }).then((res) => {
            // console.log(res);
            if (res.data.issuccess) {
                console.log(that.props);
                // that.props.history.go()
                // that.props.history.push('/home')
                setToken(res.data.result.Token)
                localStorage.setItem('mobile', that.state.mobile)
                let _href = window.location.href
                let _hrefArr = _href.split('#')
                window.location.href = _hrefArr[0] + '#/home'; //太low了。。。。
            } else {
                that.setState({
                    tipsText: res.data.message
                })
                that.refs.confirm.show()
            }
        })
    }
    handlePassWordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    switchEye () {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }), ()=> {
            this.state.isOpen ? this.setState({inputType: 'text'}) : this.setState({inputType: 'password'})
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('nextProps', nextProps);
        console.log('nextState', nextState);
        if (nextState.mobile && (/1[3|4|5|7|8]\d{9}/.test(nextState.mobile)) && nextState.password ) {
            // removeClass(this.buttonBtn.current, 'disable')
            // this.setState({btnDisable: false})
            this.btnDisable = true
            
        } else {
            // this.setState({btnDisable: true})
            this.btnDisable = false
            // return false  //注意这里千万不要return false ，这样的话组件就不会更新，看不到界面上更新的效果
            // addClass(this.buttonBtn.current, 'disable')
        }
        // console.log('--------', nextState.btnDisable);
        
        return true
    }
    render() {
        return (
            <div>
                <div className="title">用户登录</div> 
                <div className="inputBox padType">
                    <div className="input size-0 align-1">
                        <label >手机号</label>
                        <input type="tel" placeholder="请输入手机号" maxLength="11" value={this.state.mobile} onChange={this.handleMobileChange}/>
                    </div>
                </div> 
                <div className="inputBox padType">
                    <div className="input size-0 align-1">
                        <label >密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <input placeholder="请输入密码" maxLength="16" type={this.state.inputType} onChange={this.handlePassWordChange}/>
                         <div className={ 'eye ' + (this.state.isOpen ? 'open' : '')} onClick={this.switchEye}></div>
                    </div>
                </div>
                <div className="buttonBox ">
                        <div className={'button ' + (this.btnDisable ? "": "disable")} ref={this.buttonBtn}  onClick={this.handleLogin}>
                        登录
                        </div>
                </div> <div className="forget-register">
                    <Link className="extend-click" to="/forgetpassword">忘记密码？</Link>
                    <Link className="extend-click register-btn" to="/register">立即注册</Link>
                </div>
                <Confirm text={this.state.tipsText} confirmType='2' ref="confirm"></Confirm>
            </div>
        )
    }
}
export default withRouter(Login)