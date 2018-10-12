import React, { Component } from 'react'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import TipsStatus from 'base/tipsStatus/tipsStatus'
import './record-car.styl'

class RecordCar extends Component {
    constructor() {
        super()
        this.state = {
            items: [1,1,2,3,4,3,4,45,3,5,3,54,3,345,34,5,5,5],
            btnDisable: false,
            mask: false,
            backTopShow: false
        }
        // this._btnClick = this._btnClick.bind(this)
        this.scroll = React.createRef()
        this.backTop = this.backTop.bind(this)
        this.onScroll = this.onScroll.bind(this)

    }
    onScroll (pos) {
        console.log(pos)
        if (pos.y < -160) {
            this.setState({backTopShow: true})
          } else {
            this.setState({backTopShow: false})
          }
    }
    backTop() {
        // this.refs.scroll.scrollTo(0, 0, 500) //ref="scroll"
        this.scroll.current.scrollTo(0, 0, 500) //ref={this.scroll}
    }
    render(){
        return(
            <div id="record-car">
                <div className="record-img" ref="recordImg">
                <div className="record-time-span">
                    <div className="span-title">
                    出站时间段
                    </div>
                    <div className="time-span">
                    <span className="time">2018-02-50</span>
                    <span className="text">至</span>
                    <span className="time">2018-02-50</span>
                    </div>
                    <div className="btn" >
                        <div className="buttonBox" style={{marginTop: '25px'}}>
                                <div className={'button ' + (this.state.btnDisable ? "disable": "")}>
                                    查询
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="record-list-box-wrap" ref="recordListBoxWrap" style={{height: '360px'}}>
                <div id="record-list">
                        <Scroll ref={this.scroll} data={this.state.items}  isOverflowHidden probeType={3} listenScroll={true} onScroll={this.onScroll}>
                            <div className="record-list-box hasBj">
                            {this.state.items.map((item,index)=> {
                                return (
                                    <div className="record-list" key={index}>
                                        <div className="record-list-title">
                                        <div className="">通行费用  </div>
                                        <div className="cost">￥1000.00</div>
                                        </div>
                                        <div className="record-list-info">
                                        <div className="in-out-list">
                                            <div className="go-site">进站名：<span>铜仁大兴站</span> </div>
                                            <div className="go-time">2018-10-06 06:05:04</div>
                                        </div>
                                        <div className="in-out-list">
                                            <div className="go-site">出站名：<span>龙里西站</span> </div>
                                            <div className="go-time">2018-10-06 07:05:04</div>
                                        </div>
                                        </div>
                                    </div>
                                ) 
                            })}
                            
                           
                            <div className="dataTipsBtnBox">
                                <div className="seeMore">
                                <span>
                                    <div className="loadingBox">
                                    <Loading v-show="hasMore" title="" size="20"></Loading>
                                </div>
                                加载更多记录</span>
                                </div>
                            </div>
                            <div className="dataTipsBtnBox" >
                                <div className="seeMore noMore" v-show="!hasMore">
                                <span>没有更多记录了</span>
                                </div>
                            </div>
                            <div style={{height:'16px'}}></div>
                            {/* <div className="tipsStatusBox1">
                                <TipsStatus></TipsStatus>
                            </div> */}
                            </div>
                    </Scroll>
                    </div>
                    {
                        this.state.mask ? (
                            <div className="ajaxLoaing" >
                                <Loading  title="加载中。。。。"></Loading>
                            </div> 
                        ): null
                    }
                    
                </div>
                {
                    this.state.backTopShow ? (<div className="icon-top" onClick={this.backTop}></div>) : null
                }
                
                {
                    this.state.mask ? (<div className="mask" ref="mask"></div>) : null
                }
                
            </div>
        )
    }
}
export default RecordCar