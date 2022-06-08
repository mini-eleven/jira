import { useCallback, useEffect } from "react"
import { useQuery } from "react-query"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()

    return useQuery<Project[], Error>(['projects', param], () => client('projects', { data: param }))
}

export const useEditProject = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}