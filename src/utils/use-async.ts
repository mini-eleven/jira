import { useCallback, useState } from "react"
import { useMountedRef } from "utils"

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

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig }
    const [state, setState] = useState<State<T>>({
        ...defaultInitialState,
        ...initialState
    })
    // 懒初始化, 将() => { } 这方法保存到retry
    // initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
    // const [state, setState] = useState(() => {
    //     const initialState = someExpensiveComputation(props);
    //     return initialState;
    // });
    const mountedRef = useMountedRef()
    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback((data: T) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    // run用来触发异步请求
    const run = useCallback((promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入promise类型数据')
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        // 设置loading
        // 用prevState, 然后返回prevState处理后的值, 这样就不会用到State, 否则useCallback 会因为state无限循环
        setState(prevState => ({ ...prevState, stat: 'loading' }))
        return promise.then(data => {
            // 确保组件加载(渲染)完成之后再setData
            if (mountedRef.current) {
                setData(data)
            }
            return data
        }).catch(error => {
            setError(error)
            if (config.throwOnError)
                return Promise.reject(error)
            return error
        })
    }, [config.throwOnError, mountedRef, setData, setError])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry调用时, 再运行一遍run
        retry: retry,
        ...state
    }
}