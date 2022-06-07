import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = ({
	projectButton,
}: {
	projectButton: JSX.Element
}) => {
	const { data: projects } = useProjects()
	const pinnedProjects = projects?.filter((x) => x.pin)

	const content = (
		<ContentContainer>
			<Typography.Text type="secondary">收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map((p) => (
					<List.Item key={p.id}>
						<List.Item.Meta title={p.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			{projectButton}
		</ContentContainer>
	)
	return (
		<Popover placement="bottom" content={content}>
			<span>项目</span>
		</Popover>
	)
}

const ContentContainer = styled.div`
	min-width: 30rem;
`
