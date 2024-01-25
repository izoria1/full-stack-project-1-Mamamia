import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';


const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/restaurant/menu/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <Container className="mt-5">
            <h1>Menu</h1>
            <ListGroup>
                {menuItems.map(item => (
                    <ListGroup.Item key={item.ID}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.Title}</Card.Title>
                                <Card.Text>Price: ${parseFloat(item.Price).toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default MenuPage;
