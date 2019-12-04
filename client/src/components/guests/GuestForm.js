import React, { useState, useContext, useEffect } from 'react';
import GuestContext from '../../context/guestContext/guestContext';

const GuestForm = () => {
    const {addGuest, editAble, updateGuest, clearEdit } = useContext(GuestContext)
    useEffect(()=> {
        if(editAble !== null){
            setGuest(editAble)
        }else{
            setGuest({
                name: '',
                email: '',
                phone: '',
                description: '',
                projectscope: 'Web-Dev'
            })
        }
    } ,[editAble]) 

    const [guest, setGuest] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        projectscope: 'Web-Dev'
    })
    if(editAble !== null){
        console.log(editAble)
    }

    const {name, email, phone, description, projectscope} = guest

    const handleChange = e => {
        setGuest({
            ...guest,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = e => {
        e.preventDefault()
        if(editAble !== null){
            updateGuest(guest)
            clearEdit()
        }else{
            addGuest(guest)
        setGuest({
            name: '',
            email: '',
            phone: '',
            description: '',
            projectscope: 'Web-Dev'
        })
    }
}
       
    return (
        <div className="invite-section">
        <h1>{editAble !== null ? 'Edit Booking' : 'Book Appointment'}</h1>
        <form onSubmit={onsubmit}>
            <input type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            />
            <input type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            />
            <input type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            />
            <input type="text"
            placeholder="Enquiry Description"
            name="description"
            value={description}
            onChange={handleChange}
            />
            <p className="options-label">Project Scope</p>
            <div className="options">
                <label className="container">Web dev
                <input type="radio" name="projectscope" value='Web-Dev' checked={projectscope === 'Web-Dev'} onChange={handleChange} />
                <span className="checkmark"></span>
                </label>
                <label className="container">Soft dev
                <input type="radio" name="projectscope" value='Soft-Dev' checked={projectscope === 'Soft-Dev'} onChange={handleChange}/>
                <span className="checkmark"></span>
                </label>
                <label className="container">Mobile dev
                <input type="radio" name="projectscope" value='Mob-Dev' checked={projectscope === 'Mob-Dev'} onChange={handleChange}/>
                <span className="checkmark"></span>
                </label>
            </div>
            <input type="submit" value={editAble !== null ? 'Update Booking' : 'Make Booking'} className="btn" />
            {editAble !== null ? <input onClick={clearEdit} value="Cancel" type="button" className="btn clear" />: null}
        </form>
            
        </div>
    );
};

export default GuestForm;