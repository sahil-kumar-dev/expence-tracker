import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
	return (
		// <div>
			<ResponsiveContainer height={300} width="80%">
				<BarChart width={500} height={300} data={budgetList} margin={{
					top: 5, right: 5, left: 5, bottom: 5,
				}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="totalSpend" fill="#87d3ff" />
					<Bar dataKey="amount" fill="#4845d2" />
				</BarChart>
			</ResponsiveContainer>
	)
}

export default BarChartDashboard