import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
// react-router 和 react-router-dom 的关系 类似于 react 和react-dom/react-native
// react-router 主要用来管理路由状态, react-router-dom消费其计算结果
import { Link } from 'react-router-dom'
import { User } from './search-panel'

// TODO 把所有ID改为number
export interface Project {
	id: string
	name: string
	personId: string
	pin: boolean
	organization: string
	created: number
}

interface IListProps extends TableProps<Project> {
	users: User[]
}

export const List = ({ users, ...props }: IListProps) => {
	return (
		<Table
			rowKey={'id'}
			pagination={false}
			columns={[
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
			]}
			{...props}
		></Table>
	)
}
