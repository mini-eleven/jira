import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { ProjectListScreen } from 'screens/project-list'

export const AuthenticatedApp = () => {
	const { logout } = useAuth()
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<h2>1</h2>
					<h2>1</h2>
					<h2>1</h2>
				</HeaderLeft>
				<HeaderRight>
					<button onClick={logout}>登出</button>
				</HeaderRight>
			</Header>
			<Main>
				<ProjectListScreen />
			</Main>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	height: 100vh;
	grid-template-rows: 6rem 1fr;
`

const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled(Row)``

const Main = styled.main`
	height: calc(100vh - 6rem);
`
