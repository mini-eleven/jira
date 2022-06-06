import { useState } from "react"

interface State<T> {
    error: Error | null
    data: T | null
    stat: 'idle' | 'loading' | 'error' | 'success' // 异步操作状态: 还未发生 | 正在发生 | 错误 | 成功
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

export const useAsync = <T>(initialState?: State<T>) => {
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data: T) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    // run用来触发异步请求
    const run = (promise: Promise<T>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入promise类型数据')
        }
        // 设置loading
        setState({ ...state, stat: 'loading' })
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}