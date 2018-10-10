import { fromJS } from 'immutable';
import * as constants from './constants';
import { loadUserApplyStep, loadToken } from 'common/js/cache'
const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
	articlePage: 1,
	showScroll: false,
	token: loadToken() || '22222',
	userApplyStepList: loadUserApplyStep(),
	IsShow: true,
	apply: {},
	listphoto: [],
	address: {}
});

const changeHomeData = (state, action) => {
	return state.merge({
		topicList: fromJS(action.topicList),
		articleList: fromJS(action.articleList),
		recommendList: fromJS(action.recommendList)
	});
};

const changeUserBaseInfo = (state, action) => {
	return state.merge({
		userApplyStepList: fromJS(action.userApplyStepList),
		IsShow:fromJS(action.userApplyStepList.IsShow),
		apply:fromJS(action.userApplyStepList.apply),
		listphoto:fromJS(action.userApplyStepList.listphoto),
		address:fromJS(action.userApplyStepList.address)
	});
};

const addArticleList = (state, action) => {
	return state.merge({
		'articleList': state.get('articleList').concat(action.list),
		'articlePage': action.nextPage
	});
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_DATA:
			return changeHomeData(state, action);
		case constants.ADD_ARTICLE_LIST:
			return addArticleList(state, action);
		case constants.TOGGLE_SCROLL_TOP:
			return state.set('showScroll', action.show);
		case constants.CHANGE_USER_INFO:
		return changeUserBaseInfo(state, action);
		case constants.SET_TOKEN:
		return state.set('token', action.token);
		default:
			return state;
	}
}