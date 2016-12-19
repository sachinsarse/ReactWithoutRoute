import * as types from './action-types';
import ApiUtils from '../utils/api-utils';

export function showListAction(showList, id) {
    return function (dispatch) {
        dispatch({
            type: types.SHOW_LIST,
            value: {
                showList: showList,
                editID: id
            }
        });
    };
}
