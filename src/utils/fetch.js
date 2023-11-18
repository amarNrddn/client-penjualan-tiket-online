import axios from "axios";
import handleError from "./handeleError";
import { config } from '../config'

export const getData = async (url, params) => {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};

        const res =  await axios.get(`${config.api_host_dev}${url}`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return handleError(error)
    }
}

export const postData = async (url, payload, formData) => {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}

        const res = await axios.post(`${config.api_host_dev}${url}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            }
        })

        return res
    } catch (error) {
        return handleError(error)
    }
}

export const putData = async (url, payload) => {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}

        return await axios.put(`${config.api_host_dev}${url}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return handleError(error)
    }
}

export const deletData = async (url) => {
    try {
        const { token } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}

        return await axios.delete(`${config.api_host_dev}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        return handleError(error)
    }
}