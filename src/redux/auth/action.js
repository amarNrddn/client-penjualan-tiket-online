import { USER_LOGIN, USER_LOGOUT } from "./constants";

export const userLogin = (token, role) => {
    return {
        type: USER_LOGIN,
        token,
        role,
    }
}

export const userLogout = () => {
    localStorage.removeItem('auth')
    return {
        type: USER_LOGOUT
    }
}