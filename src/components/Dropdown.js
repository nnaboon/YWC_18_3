import React, { useState } from 'react';
import './Dropdown.css';
import './Box.css';

const Dropdown = ({prices}) => {
    const [dropdown, setDropdown] = useState('');
    return (
        <form classname="Form">
            <select className="dropbox" value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
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