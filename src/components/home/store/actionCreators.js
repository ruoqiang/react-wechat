import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';
import { url } from 'common/js/config'
import { saveUserApplyStep } from 'common/js/cache'
// import axios from 'common/js/http'
const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList,
	articleList: result.articleList,
	recommendList: result.recommendList
});

export const getHomeInfo = () => {
	// alert()
	return (dispatch) => {
		var data1 = {
            // token: localStorage.getItem('__token__') || '1111'
        }
        axios({ method: 'get',
            url: 'http://localhost:3000/api/home.json',
            data: data1
        }).then((res) => {
			const result = res.data.data;
			console.log('ass',result)
			dispatch(changHomeData(result));
		});
	}
}

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})
export const getMoreList = (page) => {
	return (dispatch) => {
		axios.get('/api/homeList.json?page=' + page).then((res) => {
			const result = res.data.data;
			dispatch(addHomeList(result, page + 1));
		});
	}
}

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})
export const setToken = (token) => ({
	type: constants.SET_TOKEN,
	token
})

const changeUserBaseInfo = (result) => ({ //修改数据状态
	type: constants.CHANGE_USER_INFO,
	userApplyStepList: result
});
export const getUserBaseInfo = (cb) => { //异步去服务器获取数据
	return (dispatch) => {
        var _params = {
			data: {}
		  }
		axios({ method: 'post',
			url: url + 'SubInfo/CheckStep',
			data: _params
		}).then(function (res) {
			//if (res.issuccess) {
				const result = res.data.result;
				dispatch(changeUserBaseInfo(result)); //全局更新数据状态
				saveUserApplyStep(result); //把数据储存到本地，以便页面刷新后初始化去本地去取
				cb && cb()
			//} else {
				//saveUserApplyStep({})
			//}
		})
	}
}