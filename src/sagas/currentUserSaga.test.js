
import {takeLatest, put, call} from 'redux-saga/effects';
import * as CONSTANTS from '../constants/actionConstants';
import request from '../utils/request';

import { currentUserSaga } from './currentUserSaga'


describe("The current user saga",()=>{
    test("It fetches and puts the current user's data",()=>{
        const id = `NCC1701`;
        const user = {name:"Jean Luc"};
        const json = ()=>{};
        const response = {json};
        const gen = currentUserSaga();
        expect(gen.next({id}).value.type).toEqual('FORK');
        
    });
});