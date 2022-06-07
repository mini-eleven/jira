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
import { Row } from 'components/lib'

export const ProjectListScreen = ({
	projectButton,
}: {
	projectButton: JSX.Element
}) => {
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
			<Row between={true}>
				<h1>项目列表</h1>
				{projectButton}
			</Row>
			<SearchPanel
				param={param}
				setParam={setParam}
				users={users || []}
			></SearchPanel>
			{error ? (
				<Typography.Text type={'danger'}>{error.message}</Typography.Text>
			) : null}
			<List
				projectButton={projectButton}
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
