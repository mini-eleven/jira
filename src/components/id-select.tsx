import { Select } from 'antd'
import React from 'react'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>

interface IIdSelectProps
	extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
	value: Raw | null | undefined
	onChange: (value?: number) => void
	defaultOptionName?: string
	options?: { name: string; id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true的时候, 代表选择默认类型
 * 当选择默认类型的时候, onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IIdSelectProps) => {
	const { value, onChange, defaultOptionName, options, ...restProps } = props
	return (
		<Select
			{...restProps}
			value={toNumber(value)}
			onChange={(value) => onChange(toNumber(value) || undefined)}
		>
			{defaultOptionName ? (
				<Select.Option value={0}>{defaultOptionName}</Select.Option>
			) : null}
			{options?.map((opt) => (
				<Select.Option key={opt.id} value={opt.id}>
					{opt.name}
				</Select.Option>
			))}
		</Select>
	)
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
