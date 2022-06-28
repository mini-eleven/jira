import { useQuery } from "react-query"
import { Task } from "types/task"
import { useHttp } from "./http"

export const useTaskTypes = () => {
    const client = useHttp()
    return useQuery<Task[]>(['taskTypes'], () => client('taskTypes'))
}
