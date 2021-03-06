import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Test } from './test'
import { useUrlQueryParam } from 'utils/url'
import { useProjectModal, useProjectSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
	const [param, setParam] = useProjectSearchParams()
	const { data: list, isLoading, error } = useProjects(useDebounce(param, 200))
	const { data: users } = useUsers()
	const { open } = useProjectModal()

	return (
		<Container>
			<Row between={true}>
				<h1>项目列表</h1>
				<ButtonNoPadding type="link" onClick={open}>
					创建项目
				</ButtonNoPadding>
			</Row>
			<SearchPanel
				param={param}
				setParam={setParam}
				users={users || []}
			></SearchPanel>
			<ErrorBox error={error} />
			<List
				loading={isLoading}
				dataSource={list || []}
				users={users || []}
			></List>
		</Container>
	)
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
	padding: 3.2rem;
`
