import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk'
// import reducer from 'store/index'
import {Provider} from 'react-redux';
import RouteConfig from '@/router';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
// import fastclick from 'fastclick'
import 'common/styl/index.styl';

//去除页面点击300毫秒延时
// fastclick.attach(document.body)
// const store = createStore(
//     reducer,
//     compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))
ReactDOM.render(
    <Provider store={store}>
    <RouteConfig>

    </RouteConfig>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
