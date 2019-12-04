import React, { useContext, useRef } from 'react';
import GuestContext from '../../context/guestContext/guestContext';

const GuestSearch = () => {
    const {searchGuest, clearSearch} = useContext(GuestContext)
    const searchValue = useRef('')
    const handleChange = e => {
        if(searchValue.current.value !== ''){
            searchGuest(e.target.value)
        }else{
            clearSearch()
        }
    }
    return (
        <div>
            <input type="text"
            ref={searchValue}
            onChange={handleChange}
            className="search"
            placeholder="Search client by name..." />
            <i className="fas fa-search-icon" />
        </div>
    );
};

export default GuestSearch;