import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})
	const debouncedParam = useDebounce(param, 200)
	const [list, setList] = useState([])
	const client = useHttp()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		setIsLoading(true)
		client('projects', { data: cleanObject(debouncedParam) })
			.then(setList)
			.catch((error) => {
				setList([])
				setError(error)
			})
			.finally(() => setIsLoading(false))
	}, [debouncedParam])

	useMount(() => {
		client('users').then(setUsers)
	})

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel
				param={param}
				setParam={setParam}
				users={users}
			></SearchPanel>
			{error ? (
				<Typography.Text type={'danger'}>{error.message}</Typography.Text>
			) : null}
			<List loading={isLoading} dataSource={list} users={users}></List>
		</Container>
	)
}

const Container = styled.div`
	padding: 3.2rem;
`
