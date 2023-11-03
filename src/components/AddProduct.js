import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string().url("Enter a valid URL").required("Image URL is required"),
    rating: Yup.object().shape({
      rate: Yup.number().min(0, "Rating must be between 0 and 5").max(5, "Rating must be between 0 and 5").required("Rating is required"),
      count: Yup.number().min(0, "Count must be a positive number").required("Count is required"),
    }),
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(addProduct(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to add product", error);
      });
  };

  return (
    <div>
      <h2>Add Data</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="title">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("title")} />
            {errors.title && <div>{errors.title.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="price">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" {...register("price")} />
            {errors.price && <div>{errors.price.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="description">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" {...register("description")} />
            {errors.description && <div>{errors.description.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="category">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("category")} />
            {errors.category && <div>{errors.category.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="image">
          <Form.Label column sm="2">
            Image URL
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" {...register("image")} />
            {errors.image && <div>{errors.image.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rating.rate">
          <Form.Label column sm="2">
            Rating
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" {...register("rating.rate")} />
            {errors.rating && errors.rating.rate && <div>{errors.rating.rate.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rating.count">
          <Form.Label column sm="2">
            Rating Count
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" {...register("rating.count")} />
            {errors.rating && errors.rating.count && <div>{errors.rating.count.message}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" style={{ margin: "8px", padding: "5px" }}>
              Add
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddProductForm;
