import React, { useEffect, useState } from 'react';

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
        <div>
            <h1>Menu</h1>
            <ul>
                {menuItems.map(item => (
                    <li key={item.ID}>
                        {item.Title} - Price: ${parseFloat(item.Price).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuPage;
