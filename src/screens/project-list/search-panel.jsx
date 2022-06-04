import React, { useEffect, useState } from 'react'

export const SearchPanel = ({ users, param, setParam }) => {
	return (
		<form>
			<div>
				{/* {setParam(Object.assign({}, param, { name: e.target.value }))} */}
				<input
					type="text"
					value={param.name}
					onChange={(e) => {
						setParam({
							...param,
							name: e.target.value,
						})
					}}
				></input>
				<select
					value={param.personId}
					onChange={(e) => {
						setParam({
							...param,
							personId: e.target.value,
						})
					}}
				>
					<option value={''}>负责人</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))}
				</select>
			</div>
		</form>
	)
}
