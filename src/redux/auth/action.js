import { USER_LOGIN, USER_LOGOUT } from "./constants";

export const userLogin = (token, role, refreshToken, email) => {
    return {
        type: USER_LOGIN,
        token,
        role,
        refreshToken,
        email
    }
}

export const userLogout = () => {
    localStorage.removeItem('auth')
    return {
        type: USER_LOGOUT
    }
}