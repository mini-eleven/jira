import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from 'screens/Epic'
import { KanbanScreen } from 'screens/Kanban'

export const ProjectScreen = () => {
	return (
		<div>
			<h1>Proejct Screen</h1>
			<Link to={'kanban'}>看板</Link>
			<Link to={'epic'}>任务组</Link>
			<Routes>
				<Route path="/kanban" element={<KanbanScreen />}></Route>
				<Route path="/epic" element={<EpicScreen />}></Route>
				<Route
					path="*"
					element={<Navigate to={window.location.pathname + '/kanban'} />}
				/>
			</Routes>
		</div>
	)
}
