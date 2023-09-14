import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialSate = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : { token: null, role: null }

export default function reducer(state = initialSate, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                token: action.token,
                role: action.role
            }
        case USER_LOGOUT:
            return { token: null, role: null }

        default:
            return state
    }
}
