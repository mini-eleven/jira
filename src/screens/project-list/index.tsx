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
import { useProjectSearchParams } from './util'

export const ProjectListScreen = () => {
	const [param, setParam] = useProjectSearchParams()
	const {
		data: list,
		isLoading,
		error,
		retry,
	} = useProjects(useDebounce(param, 200))
	const { data: users } = useUsers()

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel
				param={param}
				setParam={setParam}
				users={users || []}
			></SearchPanel>
			{error ? (
				<Typography.Text type={'danger'}>{error.message}</Typography.Text>
			) : null}
			<List
				refresh={retry}
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
