import { SET_DASHBOARD_STATS } from '../actions/Dashboard.actions';

const initialState = {
    total: 0,
    attacksByCountry: [],
    attacksByYear: []
};

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DASHBOARD_STATS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export default DashboardReducer;