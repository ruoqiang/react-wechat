import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../components/home/store';

const reducer = combineReducers({
	home: homeReducer
});

export default reducer;
