import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './head-step.styl'
class HeadStep extends PureComponent {
    static propTypes = {
        step: PropTypes.number
    }
    static defaultProps = {
        step: 1
    }
    constructor () {
        super()
        this.state = {
            stepText: ['申请人信息', '车辆信息', '证件照片', '收货地址'],
            stepLine: ['1', '2', '3', '4', '5', '6', '7']
        }
    }
    render() {
        let step = this.props.step
        return (
            <div className="head-setp">
            <div className="setp">
              <div className="setp-tips-box">
                {
                    this.state.stepText.map((item,index) => {
                       return (<span className={step>index ? 'active' : ''} key={index}>{item}</span>)
                    })
                    
                }
              </div>
              <div className="setp-dot-box">
              {
                  this.state.stepLine.map((item,index) => {
                    return <span className={classNames(index<=step+(step-1)? 'active' : '', (index%2===1 ? 'setp-line' : ''))} key={index}></span>
                  })
              }
                
              </div>
            </div>
        </div>
        )
    }
 }
 export default HeadStep