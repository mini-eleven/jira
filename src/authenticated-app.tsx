import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React, { useState } from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as Logo } from 'assets/logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { resetRoute, useDocumentTitle } from 'utils'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { ProjectPopover } from 'components/project-popover'
import { ProjectModal } from 'screens/project-list/project-modal'

export const AuthenticatedApp = () => {
	useDocumentTitle('项目列表', false)
	return (
		<Container>
			<Router>
				<PageHeader />
				<Main>
					<Routes>
						<Route path="/projects" element={<ProjectListScreen />} />
						<Route path="/projects/:projectId/*" element={<ProjectScreen />} />
						<Route path="*" element={<Navigate to={'/projects'} />} />
					</Routes>
				</Main>
				<ProjectModal />
			</Router>
		</Container>
	)
}

const PageHeader = () => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<ButtonNoPadding type="link" onClick={resetRoute}>
					<Logo width={'5rem'} color={'rgb(38, 132, 255)'} />
				</ButtonNoPadding>
				<ProjectPopover />
				<span>用户</span>
			</HeaderLeft>
			<HeaderRight>
				<User />
			</HeaderRight>
		</Header>
	)
}

const User = () => {
	const { logout, user } = useAuth()
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key={'logout'}>
						<Button type="link" onClick={logout}>
							登出
						</Button>
					</Menu.Item>
				</Menu>
			}
		>
			<Button type="link" onClick={(e) => e.preventDefault()}>
				Hi,{user?.name}
			</Button>
		</Dropdown>
	)
}

const Container = styled.div`
	display: grid;
	height: 100vh;
	grid-template-rows: 6rem 1fr;
`

const Header = styled(Row)`
	height: 6rem;
	padding: 3.2rem;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled(Row)``

const Main = styled.main`
	/* height: calc(100vh - 6rem); */
	display: flex;
	overflow: hidden;
`
