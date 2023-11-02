import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form as RBForm, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

const AddDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number()
      .min(0, "Price must be a positive number")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string()
      .url("Enter a valid URL")
      .required("Image URL is required"),
    rating: Yup.object().shape({
      rate: Yup.number()
        .min(0, "Rating must be between 0 and 5")
        .max(5, "Rating must be between 0 and 5")
        .required("Rating is required"),
      count: Yup.number()
        .min(0, "Count must be a positive number")
        .required("Count is required"),
    }),
  });

  const handleSubmit = (values) => {
    dispatch(addProduct(values))
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form as={RBForm}>
          <RBForm.Group as={Row} controlId="title">
            <RBForm.Label column sm="2">
              Title
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="price">
            <RBForm.Label column sm="2">
              Price
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="number" name="price" />
              <ErrorMessage name="price" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="description">
            <RBForm.Label column sm="2">
              Description
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} as="textarea" name="description" />
              <ErrorMessage name="description" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="category">
            <RBForm.Label column sm="2">
              Category
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="text" name="category" />
              <ErrorMessage name="category" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="image">
            <RBForm.Label column sm="2">
              Image URL
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="text" name="image" />
              <ErrorMessage name="image" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="rating.rate">
            <RBForm.Label column sm="2">
              Rating
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="number" name="rating.rate" />
              <ErrorMessage name="rating.rate" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row} controlId="rating.count">
            <RBForm.Label column sm="2">
              Rating Count
            </RBForm.Label>
            <Col sm="10">
              <Field as={RBForm.Control} type="number" name="rating.count" />
              <ErrorMessage name="rating.count" component="div" />
            </Col>
          </RBForm.Group>

          <RBForm.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" style={{ margin: "8px", padding: "5px" }}>
                Add
              </Button>
            </Col>
          </RBForm.Group>
        </Form>
      </Formik>
    </div>
  );
};

export default AddDataForm;