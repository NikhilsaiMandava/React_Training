import * as React from 'react';
import './Graph.css';
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

interface DataPoint {
    date: string;
    value: number;
}

interface GraphProps {
    data: DataPoint[];
}
const Graph: React.FC<GraphProps> = ({ data }) => {
    console.log("--------------------------",data);
    const GraphData=data;
    console.log("++++++++++++++++++++++",GraphData);
    return (
        <ResponsiveContainer aspect={3}>
            <LineChart data={GraphData} width={730} height={250} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5 5"/>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type='monotone'
                    dataKey="value"
                    stroke="red"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Graph;