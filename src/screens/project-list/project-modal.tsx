import { Button, Drawer } from 'antd'
import React from 'react'

export const ProjectModal = ({
	projectModalOpen,
	onClose,
}: {
	projectModalOpen: boolean
	onClose: () => void
}) => {
	return (
		<Drawer onClose={onClose} visible={projectModalOpen} width={'100%'}>
			<h1>Proejct Modal</h1>
			<Button onClick={onClose}>关闭</Button>
		</Drawer>
	)
}
