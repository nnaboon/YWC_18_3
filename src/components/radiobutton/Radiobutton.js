import React, { useState } from 'react';

const Radiobutton = ({catval}) => {
    const [value, setValue] = useState('');
    return(
        <div>
            <form>
                <label>
                    <input type="radio" value={catval} checkd={value===value} onChange={(e) => setValue(e.target.value)} />{catval}
                </label>  
                <br />
                           
            </form>
            {console.log(value)}
            {console.log(catval)}

        </div>
    )
}

export default Radiobutton;