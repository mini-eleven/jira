import QueryString from "qs"
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context"
import { useCallback } from "react"

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    data?: object
    token?: string
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

    // 此处config中的method:'GET', 其实相当于将config的method默认设置为GET,
    // 因为后面会展开...customConfig, 如果有method属性的话会覆盖
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${QueryString.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    // axios 和 fetch的表现不一样, axios会在response status !== 2xx的时候返回异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const { user } = useAuth()
    // TODO TS操作符
    return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }), [user?.token])
}