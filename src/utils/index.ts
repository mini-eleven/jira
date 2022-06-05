import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value)

// 在一个函数里, 改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    // Object.assign({}, object)
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

// const debounce = (func, delay) => {
//     let timeout
//     return (...param) => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             func(...param)
//         }, delay)
//     }
// }

export const useDebounce = <T>(value: T, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后, 设置一个定时器
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // 每次在上一次useEffect运行完之后清理
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}
