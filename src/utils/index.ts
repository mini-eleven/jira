import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里, 改变传入的对象本身是不好的
// object: { [key: string]: unknown } 定义object为键值对对象类型
export const cleanObject = (object: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        const value = result[key]
        if (isVoid(value)) {
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

export const useDocumentTitle = (title: string, keepOnUmmount: boolean = true) => {
    const oldTitle = document.title

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUmmount) {
                document.title = oldTitle
            }
        }
    }, [])
}
