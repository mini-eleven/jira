import { Button, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useDeleteTask, useEditTask } from 'utils/task'
import { useTasksModal, useTasksQueryKey } from './util'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

export const TaskModal = () => {
	const [form] = useForm()
	const { editingTask, editingTaskId, close } = useTasksModal()
	const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
		useTasksQueryKey()
	)

	const onCancel = () => {
		close()
		form.resetFields()
	}

	const onOk = async () => {
		await editTask({ ...editingTask, ...form.getFieldsValue() })
		close()
	}

	useEffect(() => {
		form.setFieldsValue(editingTask)
	}, [form, editingTask])

	const { mutateAsync } = useDeleteTask(useTasksQueryKey())
	const startDelete = () => {
		Modal.confirm({
			okText: '确定',
			cancelText: '取消',
			title: '确定删除任务吗',
			onOk() {
				close()
				return mutateAsync({ id: Number(editingTaskId) })
			},
		})
	}

	return (
		<Modal
			forceRender={true}
			onCancel={onCancel}
			onOk={onOk}
			title={'编辑任务'}
			visible={!!editingTaskId}
			okText={'确认'}
			cancelText={'取消'}
			confirmLoading={editLoading}
		>
			<Form {...layout} initialValues={editingTask} form={form}>
				<Form.Item
					label={'任务名'}
					name={'name'}
					rules={[{ required: true, message: '请输入任务名' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item label={'经办人'} name={'processorId'}>
					<UserSelect defaultOptionName="经办人" />
				</Form.Item>
				<Form.Item label={'类型'} name={'typeId'}>
					<TaskTypeSelect />
				</Form.Item>
			</Form>
			<div style={{ textAlign: 'right' }}>
				<Button
					style={{ fontSize: '14px' }}
					size={'small'}
					onClick={startDelete}
				>
					删除
				</Button>
			</div>
		</Modal>
	)
}
