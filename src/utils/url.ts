import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回页面url中, 指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return [
        useMemo(
            () => keys.reduce((prev, currentKey) => {
                return { ...prev, [currentKey]: searchParams.get(currentKey) || '' }
            }, {} as { [key in T]: string }), [searchParams, keys]),
        (params: Partial<{ [key in T]: unknown }>) => {
            // iterator 遍历器
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}


/**
 * 单独定义出一个setUrlParam
 * 原因是发现了一个bug, 如果用上面的方法, 连续2次setSearchParams会不成功, 找不到原因
 * @returns 
 */
export const useSetUrlParam = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
        return setSearchParams(o)
    }
}