import React from 'react';

const WatchedDropDown = ({onDropDownSelect}) => {

    const handleChange = (event) => {
        const chosenOption = event.target.value;
        onDropDownSelect(chosenOption);
    };
    

    return(
        <select onChange={handleChange}>
            <option value="all">All</option>
            <option value="watched">Watched</option>
            <option value="unwatched">Unwatched</option>
        </select>
    )

};

export default WatchedDropDown;