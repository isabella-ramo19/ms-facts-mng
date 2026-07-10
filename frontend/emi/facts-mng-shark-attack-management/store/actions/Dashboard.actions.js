import graphqlService from '../../../../services/graphqlService';
import { FactsMngSharkAttackDashboard } from '../../gql/SharkAttack';

export const SET_DASHBOARD_STATS = '[DASHBOARD] SET DASHBOARD STATS';

export function getDashboardStats() {
    return (dispatch) =>
        graphqlService.client
            .query(FactsMngSharkAttackDashboard())
            .then(result => {
                dispatch({
                    type: SET_DASHBOARD_STATS,
                    payload: result.data.FactsMngSharkAttackDashboard
                });
            });
}