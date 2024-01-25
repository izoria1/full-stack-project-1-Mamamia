import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ Name: '', BookingDate: '', No_of_guests: '' });
    const [editing, setEditing] = useState(false);
    const [currentBookingId, setCurrentBookingId] = useState(null);
    

    // Define fetchBookings outside of useEffect
    const fetchBookings = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/restaurant/booking/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Error fetching bookings:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name === 'No_of_guests' ? 'No_of_guests' :
                     e.target.name === 'BookingDate' ? 'BookingDate' : 'Name';
        setNewBooking({ ...newBooking, [name]: e.target.value });
    };

    const handleEdit = (booking) => {
        setEditing(true);
        setCurrentBookingId(booking.ID);
        // Convert BookingDate to a format suitable for datetime-local input
        const formattedDate = new Date(booking.BookingDate).toISOString().slice(0, 16);
        setNewBooking({ 
            Name: booking.Name, 
            BookingDate: formattedDate, 
            No_of_guests: booking.No_of_guests 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = editing 
            ? `http://127.0.0.1:8000/restaurant/booking/${currentBookingId}/`
            : 'http://127.0.0.1:8000/restaurant/booking/';
        const method = editing ? 'PUT' : 'POST';

        if (token) {
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify(newBooking)
                });

                if (response.ok) {
                    setNewBooking({ Name: '', BookingDate: '', No_of_guests: '' });
                    fetchBookings();
                    setEditing(false);
                    setCurrentBookingId(null);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleCancel = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/restaurant/booking/${bookingId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (response.ok) {
                    fetchBookings(); // Refresh bookings after cancellation
                } else {
                    console.error('Error cancelling booking:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <h1>{editing ? 'Edit Booking' : 'Create New Booking'}</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="Name" 
                    placeholder="Name" 
                    value={newBooking.Name} 
                    onChange={handleChange} 
                />
                <input 
                    type="datetime-local" 
                    name="BookingDate" 
                    value={newBooking.BookingDate} 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="No_of_guests" 
                    placeholder="Number of Guests" 
                    value={newBooking.No_of_guests} 
                    onChange={handleChange} 
                />
                <button type="submit">{editing ? 'Update Booking' : 'Create Booking'}</button>
            </form>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <li key={booking.ID}>
                        {booking.Name} - {new Date(booking.BookingDate).toLocaleString()} - {booking.No_of_guests} guests
                        <button onClick={() => handleEdit(booking)}>Edit</button>
                        <button onClick={() => handleCancel(booking.ID)}>Cancel</button> {/* Cancel button */}
                    </li>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingsPage;