import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Col, Row, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: products, status } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [expandedProductId, setExpandedProductId] = useState(null);
    const [sortType, setSortType] = useState(''); // State to handle sorting type

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Sort the products based on the selected criteria
    if (sortType === 'priceLowToHigh') {
        currentProducts = currentProducts.slice().sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHighToLow') {
        currentProducts = currentProducts.slice().sort((a, b) => b.price - a.price);
    }

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    const handleProductClick = (productId) => {
        setExpandedProductId(productId === expandedProductId ? null : productId);
        navigate(`product/${productId}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div>
            <label  style={{ marginBottom: '10px', display: 'block' }}>
                Sort By:
                <select value={sortType} onChange={handleSortChange}
                 style={{
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                }}>
                    <option value="">-- Select --</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                </select>
            </label>
            
            <Row xs={1} md={2} className="g-4">
                {currentProducts.map((product) => (
                    <Col key={product.id}>
                        <Card className="mb-3">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ width: '30%', height: '30%' }}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button onClick={() => handleAdd(product)} variant="primary">
                                    Add to cart
                                </Button>
                                {expandedProductId === product.id && (
                                    <div>
                                        <p>Description: {product.description}</p>
                                    </div>
                                )}
                                <Button onClick={() => handleProductClick(product.id)} style={{ margin: '10px' }}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className="container p-2 d-flex justify-content-center">
                    <Pagination>
                        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
};

export default Products;

