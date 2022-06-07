import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    let i=0
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
            >
            <option key="00" disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={i+=1} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;
