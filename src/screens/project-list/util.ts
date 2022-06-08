import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({
            ...param,
            personId: Number(param.personId) || undefined
        }), [param])
        , setParam] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    return ['projects', params]
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    // 不得已为之,
    // todo 找找原因和解决办法
    const setUrlParam = useSetUrlSearchParam()
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => {
        // setProjectCreate({ projectCreate: undefined })
        // setEditingProjectId({ editingProjectId: undefined })
        setUrlParam({ projectCreate: undefined, editingProjectId: undefined })
    }
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || !!editingProjectId,
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}