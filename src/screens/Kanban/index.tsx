import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

const nameList = ['apple', 'banana', 'peer']
export const KanbanScreen = () => {
	const [price, setPrice] = useState(0)
	const [name, setName] = useState('apple')

	const getProductName = () => {
		console.log('getproductName ')
		return name
	}

	useEffect(() => {
		console.log('effectName', name)
		getProductName()
	}, [name])

	useEffect(() => {
		console.log('effectPrice', price)
	}, [price])
	return (
		<div>
			<p>{name}</p>
			<p>{price}</p>
			<p>{getProductName()}</p>
			<button onClick={() => setPrice(price + 1)}>+1</button>
			<button
				onClick={() =>
					setName(nameList[(Math.random() * nameList.length) << 0])
				}
			>
				改名
			</button>
		</div>
	)
}
