import React, {useContext} from 'react';
import GuestContext from '../../context/guestContext/guestContext';


const GuestCounter = () => {
    const {guests} = useContext(GuestContext)
    const totalBooked = guests.length
    const confirmed = guests.filter(guest => guest.isconfirmed)
    const totalConfirmed = confirmed.length
    const bookedByProjectscope = (type) => guests.filter(guest => guest.projectscope === type).length
    const confirmedByProjectscope = (type) => confirmed.filter(guest => guest.projectscope === type).length


    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Client</th>
                        <th>Booked</th>
                        <th>Confirmed</th>
                    </tr>
                    <tr>
                        <th>Web Dev</th>
                        <td>{bookedByProjectscope('Web-Dev')}</td>
                        <td>{confirmedByProjectscope('Web-Dev')}</td>
                    </tr>
                    <tr>
                        <th>Soft Dev</th>
                        <td>{bookedByProjectscope('Soft-Dev')}</td>
                        <td>{confirmedByProjectscope('Soft-Dev')}</td>
                    </tr>
                    <tr>
                        <th>Mobile Dev</th>
                        <td>{bookedByProjectscope('Mob-Dev')}</td>
                        <td>{confirmedByProjectscope('Mob-Dev')}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{totalBooked}</td>
                        <td>{totalConfirmed}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GuestCounter;