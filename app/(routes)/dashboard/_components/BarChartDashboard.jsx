import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
	return (
		<div>
			<BarChart width={500} height={300} data={budgetList} margin={{
				top: 5, right: 5, left: 5, bottom: 5
			}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="totalSpend" fill="#4545d2" />
				<Bar dataKey="amount" fill="#4845d2" />
			</BarChart>
		</div>
	)
}

export default BarChartDashboard