import initialState from './initial-state';
import * as types from '../actions/action-types';

export default function AlbumReducer(state = initialState, action) {
  var errors = [];
  switch (action.type) {

    case types.SHOW_LIST:
      return Object.assign({}, state, {
        showList: action.value.showList,
        editID: action.value.editID
      });

    default:
      return state;
  }
}