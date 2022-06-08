import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state) {
            // redux-toolkit 借助immer 处理数据可变/不可变问题
            // redux 比较对象是Objec.is?? 
            // 此处如果是正常情况, 那就相当于 var preState = {};  preState.projectModalOpen = true; preState === preState, 这样不会不会导致更新才对
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen