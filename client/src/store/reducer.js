import * as actions from './actionTypes'
import {combineReducers} from 'redux'

const initialState = {
    title: "title"
}

export const rootReducer = combineReducers({
    title: reducerPage
})

export default function reducerPage(state=initialState,action) {
    switch (action.type) {
        case actions.SET_PAGE:
            return {...state,title: action.title.title}
        default:
            return state;
    }
}