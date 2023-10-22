import { 
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS,
    SET_KEYWORD,
    ERROR_FETCHING_TALENTS
} from "./constans";

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    keyword: '',
    status: statuslist.idle
}

export default function reducer(state= initialState, action) {
    switch(action.type) {
        case START_FETCHING_TALENTS: 
            return {...state, status: statuslist.process}
        
        case SUCCESS_FETCHING_TALENTS: 
            return {
                ...state, 
                status: statuslist.success,
                data: action.talents
            }
        
        case ERROR_FETCHING_TALENTS: 
            return {...state, status: statuslist.error}
        
        case SET_KEYWORD: 
            return {...state, keyword: action.keyword}
            
        default:
            return state
    }
}