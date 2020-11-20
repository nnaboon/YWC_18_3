import React, { useState } from 'react';

const Dropdown = ({prices}) => {
    const [dropdown, setDropdown] = useState('');
    return (
        <form>
            <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
                {prices.map((price) => {
                    return(
                        <option>{price}</option>
                    );
                })}
            </select>
        </form>
    );
}

export default Dropdown;