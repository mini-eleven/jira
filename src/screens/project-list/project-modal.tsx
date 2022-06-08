import { Button, Drawer } from 'antd'
import React from 'react'
import { useProjectModal } from './util'

export const ProjectModal = () => {
	const { projectModalOpen, open, close } = useProjectModal()
	return (
		<Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
			<h1>Proejct Modal</h1>
			<Button onClick={close}>关闭</Button>
		</Drawer>
	)
}
