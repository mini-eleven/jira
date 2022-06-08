import { Dropdown, Menu, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
// react-router 和 react-router-dom 的关系 类似于 react 和react-dom/react-native
// react-router 主要用来管理路由状态, react-router-dom消费其计算结果
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/project'
import { User } from './search-panel'
import { useProjectModal } from './util'

// TODO 把所有ID改为number
export interface Project {
	id: number
	name: string
	personId: number
	pin: boolean
	organization: string
	created: number
}

interface IListProps extends TableProps<Project> {
	users: User[]
	refresh?: () => void
}

export const List = ({ users, ...props }: IListProps) => {
	const { mutate } = useEditProject()
	const { open } = useProjectModal()
	// 柯里化
	const pinProject = (id: number) => (pin: boolean) =>
		mutate({ id, pin }).then(props.refresh)
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
						return (
							<Dropdown
								overlay={
									<Menu>
										<Menu.Item key={'edit'}>
											<ButtonNoPadding type="link" onClick={open}>
												创建项目
											</ButtonNoPadding>
										</Menu.Item>
										<Menu.Item key={'delete'}>
											<ButtonNoPadding type="link">删除</ButtonNoPadding>
										</Menu.Item>
									</Menu>
								}
							>
								<ButtonNoPadding type="link">...</ButtonNoPadding>
							</Dropdown>
						)
					},
				},
			]}
			{...props}
		></Table>
	)
}
