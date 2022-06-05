import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as Logo } from 'assets/logo.svg'
import { Dropdown, Menu } from 'antd'

export const AuthenticatedApp = () => {
	const { logout, user } = useAuth()
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<Logo width={'5rem'} color={'rgb(38, 132, 255)'} />
					<h2>项目</h2>
					<h2>用户</h2>
				</HeaderLeft>
				<HeaderRight>
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key={'logout'}>
									<a onClick={logout}>登出</a>
								</Menu.Item>
							</Menu>
						}
					>
						<a onClick={(e) => e.preventDefault()}>Hi,{user?.name}</a>
					</Dropdown>
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

const Header = styled(Row)`
	height: 6rem;
	padding: 3.2rem;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled(Row)``

const Main = styled.main`
	height: calc(100vh - 6rem);
`
