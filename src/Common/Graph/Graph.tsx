import * as React from 'react';
import './Graph.css';

interface GraphProps {
    data:any
}
const Graph:React.FC<GraphProps> = ({data}) => {
    return (
        <div>
            <p>Graph</p>
        </div>
    )
}

export default Graph;