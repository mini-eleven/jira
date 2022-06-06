import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回页面url中, 指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return [
        useMemo(() =>
            keys.reduce((prev, currentKey) => {
                return { ...prev, [currentKey]: searchParams.get(currentKey) || '' }
            }, {} as { [key in T]: string }), [searchParams]),
        (params: Partial<{ [key in T]: unknown }>) => {
            // iterator 遍历器
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}