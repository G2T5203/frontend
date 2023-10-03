import React, { useState } from 'react';

function PlaneSeat({ seatId, label, disabled }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if(!disabled) {
            setIsSelected(!isSelected);
        }
    }

    return (
        <li 
            className={`seat ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`} 
            onClick={handleClick}
        >
            {label}
        </li>
    );
}


export default PlaneSeat;

