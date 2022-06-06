import React, { ReactNode } from 'react'

// react-error-boundary
type Fallbackrender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
	React.PropsWithChildren<{ fallbackRender: Fallbackrender }>,
	{ error: Error | null }
> {
	state = { error: null }

	// 当捕获子组件异常时, 这里会接受并调用
	static getDerivedStateFromError(error: Error) {
		// 返回对象给state
		return { error }
	}

	render() {
		const { error } = this.state
		const { fallbackRender, children } = this.props
		if (error) {
			return fallbackRender({ error })
		}
		return children
	}
}
