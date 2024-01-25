import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup, Container, Alert } from 'react-bootstrap';
import '../styles/BookingsPage.css'; // Import custom CSS for BookingsPage styling

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ Name: '', BookingDate: '', No_of_guests: '' });
    const [editing, setEditing] = useState(false);
    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [error, setError] = useState(null); // State for error message

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
                    setError('Error fetching bookings.'); // Set error message
                    console.error('Error fetching bookings:', response.statusText);
                }
            } catch (error) {
                setError('There was an error. Please try again later.'); // Set error message
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
        setError(null); // Clear any previous errors

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
                    setError('Booking submission failed. Please check your information.'); // Set error message
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                setError('There was an error. Please try again later.'); // Set error message
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
                    setError('Error cancelling booking.'); // Set error message
                    console.error('Error cancelling booking:', response.statusText);
                }
            } catch (error) {
                setError('There was an error. Please try again later.'); // Set error message
                console.error('Error:', error);
            }
        }
    };

    return (
        <Container className="bookings-container">
            <h1>{editing ? 'Edit Booking' : 'Create New Booking'}</h1>
            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="Name" value={newBooking.Name} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Booking Date</Form.Label>
                    <Form.Control type="datetime-local" name="BookingDate" value={newBooking.BookingDate} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Number of Guests</Form.Label>
                    <Form.Control type="number" placeholder="Number of Guests" name="No_of_guests" value={newBooking.No_of_guests} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">{editing ? 'Update Booking' : 'Create Booking'}</Button>
            </Form>

            <ListGroup className="mt-4">
                {bookings.length > 0 ? bookings.map(booking => (
                    <ListGroup.Item key={booking.ID}>
                        {booking.Name} - {new Date(booking.BookingDate).toLocaleString()} - {booking.No_of_guests} guests
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(booking)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleCancel(booking.ID)}>Cancel</Button>
                    </ListGroup.Item>
                )) : <p id="no-bookings">No bookings found...</p>}
            </ListGroup>
        </Container>
    );
};

export default BookingsPage;
