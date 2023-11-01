import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.product.data);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.image} style={{ width: '50%', height: '50%' }} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
