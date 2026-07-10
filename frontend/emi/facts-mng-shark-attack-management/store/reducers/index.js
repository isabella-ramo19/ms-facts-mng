import {combineReducers} from 'redux';
import sharkAttacks from './SharkAttacks.reducer';
import dashboard from './Dashboard.reducer';

const reducer = combineReducers({
    sharkAttacks,
    dashboard,
});
export default reducer;
