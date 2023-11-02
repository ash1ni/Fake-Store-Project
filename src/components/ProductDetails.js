import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../store/productSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const product = products.find((p) => p.id === parseInt(id));

  const [showEditModal, setShowEditModal] = useState(false);

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number().typeError('Price must be a number').required('Price is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: product?.title || '',
      price: product?.price || '',
      category: product?.category || '',
      description: product?.description || '',
    },
  });


const onSubmit = (data) => {
    const updatedProduct = { ...product, ...data, image: product.image };
    dispatch(updateProduct({ productId: product.id, updatedData: updatedProduct }));
    setShowEditModal(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    navigate('/product/:id');
  };

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
          <Button variant="primary" onClick={handleEdit} style={{margin:'5px'}}>Edit</Button>
          <Button variant="danger" onClick={handleDelete} style={{margin:'5px'}}>Delete</Button>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control {...register('title')} />
              <p className="text-danger">{errors.title?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control {...register('price')} />
              <p className="text-danger">{errors.price?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control {...register('category')} />
              <p className="text-danger">{errors.category?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" {...register('description')} />
              <p className="text-danger">{errors.description?.message}</p>
            </Form.Group>
 
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control {...register('image')} />
              <p className="text-danger">{errors.image?.message}</p>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetails;
