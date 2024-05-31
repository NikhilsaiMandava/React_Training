import * as React from 'react';
import './ViewCargo.css';

interface ViewCargoProps {
    onClose : () => void;
    cargo :any
}
const ViewCargo:React.FC<ViewCargoProps> = ({onClose,cargo}) =>{
    return (
        <div>
            <span>{cargo.cargoSubType}</span>
            <div onClick={onClose}>
                <span>{cargo.cargoStatus}</span>
            </div>
        </div>
    )
}

export default ViewCargo;