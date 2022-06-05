import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})
	const debouncedParam = useDebounce(param, 200)
	const [list, setList] = useState([])
	const client = useHttp()

	useEffect(() => {
		client('projects', { data: cleanObject(debouncedParam) }).then(setList)
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
			<List list={list} users={users}></List>
		</Container>
	)
}

const Container = styled.div`
	padding: 3.2rem;
`
