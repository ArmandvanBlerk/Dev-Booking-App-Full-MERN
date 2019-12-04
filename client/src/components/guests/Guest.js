import React, { useContext } from 'react';
import GuestContext from '../../context/guestContext/guestContext';

const Guest = ({guest}) => {
    //note that the updateGuest is for the confirmed icom on th UI and not to update the entire card
    const { removeGuest, updateGuest, editGuest } = useContext(GuestContext)
    const { _id, name, phone, email, description, projectscope, isconfirmed } = guest

    const handleRemove = () => {
        removeGuest(_id)
    }
    const handleIsconfirmed = () => {
        updateGuest({
            ...guest, isconfirmed: !isconfirmed
        })
    }

    return (
        <div className="guest-card">
        <div className="card-head">
            <div>
                <label className={`${isconfirmed && 'confirm'}`}> Confirmed
                <i className={`fas fa-check-square ${isconfirmed && 'confirm'} `}>
                    <input type="checkbox" onChange={handleIsconfirmed} />
                </i>
                </label>
            </div>
            <div>
                <button onClick={() => editGuest(guest)}>
                    <i className="fas fa-user-edit"></i>
                </button>
                <button onClick={handleRemove}>
                    <i className="fas fa-trash-alt remove"></i>
                </button>
            </div>
        </div>
        <div className="card-body">
            <h2>{name}</h2>
            <span className={'badge ' + (projectscope === 'Web-Dev' ? 'seaGreen' : projectscope === 'Soft-Dev' ? 'red' : 'green')}>
            {projectscope}</span>
            <div className="contact">
                <i className="fas fa-phone-alt" />
                <p>{phone}</p>
            </div>
            <div className="contact">
                <i className="fas fa-email-alt" />
                <p>{email}</p>
            </div>
            <div className="contact">
                <i className="fas fa-email-alt" />
                <p>{description}</p>
            </div> 
        </div>
            
        </div>
    );
};

export default Guest;