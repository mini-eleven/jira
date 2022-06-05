import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ProjectListScreen } from 'screens/project-list'
import { LoginScreen } from 'screens/login'

function App() {
	return (
		<div className="App">
			<LoginScreen></LoginScreen>
			{/* <ProjectListScreen></ProjectListScreen> */}
		</div>
	)
}

export default App
