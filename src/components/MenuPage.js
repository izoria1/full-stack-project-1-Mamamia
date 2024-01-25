import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../styles/MenuPage.css'; 

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

    const getImageFilename = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-') + '.png';
    };

    return (
        <Container className="mt-5">
            <h1 class="menu-title">Menu</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {menuItems.map(item => (
                    <Col key={item.ID}>
                        <Card>
                            <Card.Img variant="top" src={`/images/${getImageFilename(item.Title)}`} alt={item.Title} className="menu-image" />
                            <Card.Body>
                                <Card.Title>{item.Title}</Card.Title>
                                <Card.Text>Price: ${parseFloat(item.Price).toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MenuPage;
