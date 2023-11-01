import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const items = useSelector((state) => state.cart);
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <span className="logo">FAKE STORE</span>
            <div>
                <Link className="btn" style={{margin:'8px'}} to="/">
                    Home
                </Link>
                <Link className="btn" to="/cart" style={{margin:'8px'}}>
                    Cart
                </Link>
                <Link to="/add-product" className='btn' style={{margin:'8px'}}>Add a Product</Link>
                <span className="cartCount">Cart items: {items.length}</span>
            </div>
        </div>
    );
};

export default Navbar;
