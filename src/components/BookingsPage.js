import React, { useEffect, useState } from 'react';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch user-specific bookings using token from localStorage
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

        fetchBookings();
    }, []);


    

    return (
        <div>
            <h1>Your Bookings</h1>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.ID}>
                            {booking.Name} - {new Date(booking.BookingDate).toLocaleString()} - {booking.No_of_guests} guests
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingsPage;
