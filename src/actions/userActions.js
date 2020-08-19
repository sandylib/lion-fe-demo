import {createAction} from 'redux-actions';
import * as ACTION_CONSTANTS from '../constants/actionConstants';
export const getCurrentUser = createAction(ACTION_CONSTANTS.GET_CURRENT_USER);
export const getAllItems = createAction(ACTION_CONSTANTS.GET_ALL_ITEMS);
export const updateAllItems = createAction(ACTION_CONSTANTS.UPDATE_ALL_ITEMS);