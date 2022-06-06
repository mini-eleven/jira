// 在真是环境中, 如果使用firebase这种第三方base服务的话, 本文件不需要开发者开发

import { User } from 'screens/project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    }).then(async (resp) => {
        if (resp.ok) {
            return handleUserResponse(await resp.json())
        } else {
            return Promise.reject(await resp.json())
        }
    })
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    }).then(async (resp) => {
        if (resp.ok) {
            return handleUserResponse(await resp.json())
        } else {
            return Promise.reject(await resp.json())
        }
    })
}

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey)
}