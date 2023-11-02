# FAKE STORE React Application Documentation

## Overview

This project entails an e-commerce web application developed using React and Redux for managing state. The application's layout is designed to be responsive, utilizing React Bootstrap's components and the Bootstrap Grid system. It includes functionalities for managing data, handling forms, displaying paginated entries, and routing between different sections of the application.

## Setup and Basic Layout

- **React Setup**: The application is built using Create React App, providing a solid foundation for the development environment.
- **Styling with React Bootstrap**: React Bootstrap is employed for layout and styling purposes, ensuring a consistent and visually appealing design.
- **Responsive Design**: The layout is crafted to be responsive, utilizing the Bootstrap Grid system for an adaptive display across various screen sizes.

## Data Management

- **Redux Store**: A Redux store is implemented to manage the application state efficiently, allowing for centralized state control.
- **Actions and Reducers**: The application implements actions and reducers for adding, editing, and deleting data entries, enabling seamless data manipulation.
- **Data Fetching**: Axios is utilized to fetch data from the FakeStore API, ensuring the application is populated with realistic product information.

## Form Handling

- **Form Implementation**: Forms are employed for creating and editing data entries, providing a smooth and controlled form handling experience.
- **Validation with Yup**: Form validation is integrated using Yup, guaranteeing that mandatory fields are completed and data is in the correct format, ensuring data integrity.

## Data Display

- **Paginated Display**: Fetched data entries are exhibited in a paginated manner, allowing for a user-friendly browsing experience with a set number of entries shown per page.
- **Pagination Features**: Pagination is included in the Bootstrap Table, facilitating the display of a limited number of entries per page for improved accessibility.

## Routing

- **React Router Setup**: Routes are created using React Router, providing different sections within the application.
- **Defined Routes**: Specific routes include the home page, showcasing paginated data, an add/edit page for managing data, and a details page exhibiting in-depth information about individual data entries.

## Bonus features

- **Sorting Based on Price**: Implemented sorting functionality to sort data entries based on different criteria (:- here sorting is done based on price).
- **Added validation**: Added form validation for specific fields.
- **Loading placeholder**: Added loading placeholders to improve the user experience while data is
being fetched.
- **Error handling**: Implemented error handling in case of any issues with API calls or data.

## Folder Structure

The project is structured as follows:

- `src/components`: Houses React components for different sections.
- `src/store`: Contains Redux-related files including reducers and actions.
- `src/pages`: Contains pages of the application.
- `public`: Includes the HTML template and other static assets for the application.

## Dependencies

Key dependencies used in this project are:

- React
- Redux Toolkit
- React Router
- Axios
- React Bootstrap

## Usage

The application offers a user-friendly interface where users can view, add, edit, and delete products through an intuitive layout and navigation system. Users can easily navigate between different sections of the application using the provided routes.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ash1ni/Fake-Store-Project

2. **Navigate to the project directory**:

    ```bash
    cd Fake-Store-Project
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

### Running the Application

To run the application locally, use the following command:

```bash
npm start
```

## Screenshots

### Home Page

![Home Page](/images/home.jpg)

### Product Details with Edit and Delete Product

![Details](/images/edit-and-delete.jpg)

### Edit Product

![Edit Products](/images/edit-form.jpg)

### Cart Details

![Cart Details](/images/cart.jpg)

### Add a Product

![Add a Product](/images/addproduct.jpg)

## NOTE

The FakeStore API does not allow users to manipulate data in the API from their end. ADD/DELETE/UPDATE functionalities are done locally but when page gets refreshed the default entries with original content gets rendered.