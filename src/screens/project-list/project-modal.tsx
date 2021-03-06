import { Button, Drawer, Form, Input, Spin } from 'antd'
import { UserSelect } from 'components/user-select'
import React, { useEffect } from 'react'
import { useProjectModal, useProjectsQueryKey } from './util'
import { useEditProject, useAddProject } from 'utils/project'
import { useForm } from 'antd/es/form/Form'
import { ErrorBox } from 'components/lib'
import styled from '@emotion/styled'

export const ProjectModal = () => {
	const { projectModalOpen, close, editingProject, isLoading } =
		useProjectModal()
	const useMutateProject = editingProject ? useEditProject : useAddProject

	const queryKey = useProjectsQueryKey()
	const {
		mutateAsync,
		error,
		isLoading: mutateLoading,
	} = useMutateProject(queryKey)
	const [form] = useForm()
	const onFinish = (values: any) => {
		mutateAsync({ ...editingProject, ...values }).then(() => {
			form.resetFields()
			close()
		})
	}

	useEffect(() => {
		form.setFieldsValue(editingProject)
	}, [editingProject, form])

	const closeModal = () => {
		form.resetFields()
		close()
	}

	const title = editingProject ? '编辑项目' : '创建项目'
	return (
		<Drawer
			onClose={closeModal}
			visible={projectModalOpen}
			width={'100%'}
			forceRender={true}
		>
			<Container>
				{isLoading ? (
					<Spin size="large" />
				) : (
					<>
						<h1>{title}</h1>
						<ErrorBox error={error} />
						<Form
							form={form}
							layout="vertical"
							style={{ width: '40rem' }}
							onFinish={onFinish}
						>
							<Form.Item
								label={'名称'}
								name="name"
								rules={[{ required: true, message: '请输入项目名' }]}
							>
								<Input placeholder="请输入项目名称" />
							</Form.Item>
							<Form.Item
								label={'部门'}
								name="organization"
								rules={[{ required: true, message: '请输入部门名' }]}
							>
								<Input placeholder="请输入部门名称" />
							</Form.Item>
							<Form.Item label={'负责人'} name="personId">
								<UserSelect defaultOptionName="负责人"></UserSelect>
							</Form.Item>
							<Form.Item style={{ textAlign: 'right' }}>
								<Button
									type="primary"
									htmlType="submit"
									loading={mutateLoading}
								>
									提交
								</Button>
							</Form.Item>
						</Form>
					</>
				)}
			</Container>
		</Drawer>
	)
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
