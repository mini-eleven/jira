import React, { ReactNode } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop = ({ children, ...props }: DropProps) => {
	return (
		<Droppable {...props}>
			{(provided) => {
				if (React.isValidElement(children)) {
					return React.cloneElement(children, {
						...provided.droppableProps,
						ref: provided.innerRef,
						provided,
					})
				}
				return <div />
			}}
		</Droppable>
	)
}
