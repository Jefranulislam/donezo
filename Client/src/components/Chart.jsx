import React from 'react'
import { chartData } from '../assets/data'
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Chart = () => {
  return (
    <ResponsiveContainer className="w-1/3" >
      
        <BarChart 
            width={150}
            height={100}
            style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}   data = {chartData} >

            <XAxis dataKey= "name"></XAxis>
            <YAxis ></YAxis>
            <Tooltip/>
            <legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="total" fill="#8884d8" />

        </BarChart>

    </ResponsiveContainer>
        
  )
}

export default Chart