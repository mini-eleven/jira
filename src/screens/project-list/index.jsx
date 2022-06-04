import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})

	const debouncedParam = useDebounce(param, 2000)
	const [list, setList] = useState([])
	useEffect(() => {
		fetch(
			`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
		).then(async (resp) => {
			if (resp.ok) {
				setList(await resp.json())
			}
		})
	}, [debouncedParam])

	useMount(() => {
		fetch(`${apiUrl}/users`).then(async (resp) => {
			if (resp.ok) {
				setUsers(await resp.json())
			}
		})
	})

	return (
		<div>
			<SearchPanel
				param={param}
				setParam={setParam}
				users={users}
			></SearchPanel>
			<List list={list} users={users}></List>
		</div>
	)
}
