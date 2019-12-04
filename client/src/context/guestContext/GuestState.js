import React, { useReducer } from 'react';
import axios from 'axios';
import GuestContext from './guestContext';
import guestReducer from './guestReducer';
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    GET_GUESTS,
    GUEST_ERROR
} from '../types';


const GuestState = (props) => {
    const initialState = {
        filterGuest: false,
        search: null,
        editAble: null,
        guests: [],
        errors: null
    }
    const [state, dispatch] = useReducer(guestReducer, initialState)

//Get guests
    const getGuests = async () => {
       try {
         const res = await axios.get('/guests')
         dispatch({
            type: GET_GUESTS,
            payload: res.data
         })  
       } catch (err) {
           dispatch({
               type: GUEST_ERROR,
               payload: err.response.msg 
           })
       } 
    }

// add guest action
    const addGuest = async (guest) => {
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.post('/guests', guest, config)
        dispatch({
            type: ADD_GUEST,
            payload: res.data
        })
        } catch (err) {
            dispatch({
                type: GUEST_ERROR,
                payload: err.response.msg
            })
        }
        
    }
// remove guest action
    const removeGuest = async (id) => {
        try {
            await axios.delete(`/guests/${id}`)
            dispatch({
                type: REMOVE_GUEST,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: GUEST_ERROR,
                payload: err.response.msg
            })
        }
        
    }
// update guest action
    const updateGuest = async (guest) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/guests/${guest._id}`, guest, config)
            dispatch({
                type: UPDATE_GUEST,
                payload: res.data
            }) 
        } catch (err) {
            dispatch({
                type: GUEST_ERROR,
                payload: err.response.msg
            }) 
        }
        
    }
// edit guest action
    const editGuest = (guest) => {
        dispatch({
            type: EDIT_GUEST,
            payload: guest
        })
    }
// clear guest action
    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT,
            
        })
    }
//first action
    const toggleFilter = () => {
        dispatch({
            type: TOGGLE_FILTER
        }) 
    }
// second action
    const searchGuest = (guest) => {
        dispatch({
            type: SEARCH_GUEST,
            payload: guest
        })
    }
// third acrion
    const clearSearch = () => {
        dispatch({
            type: CLEAR_SEARCH,
        })
    }
    return (
       <GuestContext.Provider
       value={{
            guests: state.guests,
            filterGuest: state.filterGuest,
            search: state.search,
            editAble: state.editAble,
            getGuests,
            addGuest,
            removeGuest,
            updateGuest,
            editGuest,
            clearEdit,
            toggleFilter,
            searchGuest,
            clearSearch
       }}
       >{props.children}</GuestContext.Provider>
    );
};

export default GuestState;