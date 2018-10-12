import React, {Component} from 'react'
// import { BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import { HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'

import LazyLoadComponent from 'common/js/lazyLoad'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const Login = LazyLoadComponent({loader: () => import('components/login/login')})
const Register = LazyLoadComponent({loader: () => import('components/register/register')})
const Forgetpassword = LazyLoadComponent({loader: () => import('components/forgetpassword/forgetpassword')})
const Home = LazyLoadComponent({loader: () => import('components/home/home')})

const userBaseInfo = LazyLoadComponent({loader: () => import('components/user-baseinfo/user-baseinfo')})
const userCarInfo = LazyLoadComponent({loader: () => import('components/user-carinfo/user-carinfo')})
const userUpload = LazyLoadComponent({loader: () => import('components/user-upload/user-upload')})
const userAddAddress = LazyLoadComponent({loader: () => import('components/user-add-address/user-add-address')})
const SelectCar = LazyLoadComponent({loader: () => import('components/select-car/select-car')})
const RecordCar = LazyLoadComponent({loader: () => import('components/record-car/record-car')})
const Bill = LazyLoadComponent({loader: () => import('components/bill/bill')})

class RouteConfig extends Component{
  render() {
    return (
      <Router>{/*<Router  history={history}>*/}
        <div className="app-wrapper">
          <div className="app-view">
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/forgetpassword" component={Forgetpassword}></Route>
              <Route path="/home" component={Home}></Route>
              <Route path="/userBaseInfo" component={userBaseInfo}></Route>
              <Route path="/userCarInfo" component={userCarInfo}></Route>
              <Route path="/userUpload" component={userUpload}></Route>
              <Route path="/userAddAddress" component={userAddAddress}></Route>
              <Route path="/selectCar/:id" component={SelectCar}></Route>
              <Route path="/recordCar" component={RecordCar}></Route>
              <Route path="/bill" component={Bill}></Route>
              <Redirect from="/" to="/home"></Redirect>
            </Switch>
          </div>
          </div>
      </Router>
    )
  }
}
export default RouteConfig