import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
// react-router 和 react-router-dom 的关系 类似于 react 和react-dom/react-native
// react-router 主要用来管理路由状态, react-router-dom消费其计算结果
import { Link } from 'react-router-dom'
import { useDeleteProject, useEditProject } from 'utils/project'
import { Project } from 'types/project'
import { User } from "types/user"
import { useProjectModal, useProjectsQueryKey } from './util'

interface IListProps extends TableProps<Project> {
	users: User[]
	refresh?: () => void
}

export const List = ({ users, ...props }: IListProps) => {
	const queryKey = useProjectsQueryKey()
	const { mutate } = useEditProject(queryKey)
	// 柯里化
	const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
	return (
		<Table
			rowKey={'id'}
			pagination={false}
			columns={[
				{
					title: <Pin checked={true} disabled={true} />,
					render(value, project) {
						return (
							<Pin
								checked={project.pin}
								// js果然挺好玩
								onCheckedChange={pinProject(project.id)}
							/>
						)
					},
				},
				{
					title: '名称',
					render(value, project) {
						return <Link to={String(project.id)}>{project.name}</Link>
					},
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{
					title: '部门',
					dataIndex: 'organization',
				},
				{
					title: '负责人',
					render(value, project) {
						return (
							<span>
								{users.find((user) => user.id === project.personId)?.name ||
									'未知'}
							</span>
						)
					},
				},
				{
					title: '创建时间',
					render(value, project) {
						return (
							<span>
								{project.created
									? dayjs(project.created).format('YYYY-MM-DD')
									: '无'}
							</span>
						)
					},
				},
				{
					render(value, project) {
						return <More project={project} />
					},
				},
			]}
			{...props}
		></Table>
	)
}

const More = ({ project }: { project: Project }) => {
	const { startEdit } = useProjectModal()
	const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
	const editProject = (id: number) => () => startEdit(id)
	const confirmDeleteProject = (id: number) => {
		Modal.confirm({
			title: '确定删除这个项目吗?',
			content: '点击确定删除',
			okText: '确定',
			onOk() {
				deleteProject({ id })
			},
		})
	}
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key={'edit'}>
						<ButtonNoPadding type="link" onClick={editProject(project.id)}>
							编辑
						</ButtonNoPadding>
					</Menu.Item>
					<Menu.Item key={'delete'}>
						<ButtonNoPadding
							type="link"
							onClick={() => confirmDeleteProject(project.id)}
						>
							删除
						</ButtonNoPadding>
					</Menu.Item>
				</Menu>
			}
		>
			<ButtonNoPadding type="link">...</ButtonNoPadding>
		</Dropdown>
	)
}
