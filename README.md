# Ecommerce-Follow-Along
# Milestone 1:
Project Overview:

This project will guide you through building a full-stack e-commerce web application using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). You will learn how to implement key functionalities such as *user authentication*, **product management**, and *order handling* while gaining hands-on experience with REST APIs, database schema design, and frontend development with React.

## Key Features:

- **User Authentication:** Secure login and registration with JWT.
- **Product Management:** CRUD operations for products, with features like filtering and sorting.
- **Order Handling:** Users can place and view orders.
- **REST API:** Build scalable API endpoints for managing users, products, and orders.
- **Frontend:** Responsive UI built with React for a smooth user experience.

## Technologies Used:

- MongoDB
- Express.js
- React.js
- Node.js
- JWT for authentication
- REST API
# Milestone 2 : Project Setup and Login Page
Created a structured folder hierarchy for the project. Set up a React app for the frontend. Set up a Node.js server for the backend. Configured Tailwind CSS for streamlined styling. Added optional extensions for improving development efficiency. Built a functional and styled Login Page for the frontend.

# Milestone 3 :
Set up dedicated folders for organizing backend code effectively. Initialized and configured a Node.js server to handle API requests. Connected the application to MongoDB to store and manage data. Implemented basic error handling to ensure smooth server operation.

# Milestone 4 :
created a User Model to define how user data is structured in the database also developed a User Controller to manage user interactions, like adding or retrieving data. Additionally, configured Multer to handle file uploads, allowing users to store files such as images.

# Milestone 5 (Frontend - Signup page) :
developed the frontend signup page using React. The page includes a form for users to register, with input validation for fields like email and password. integrated the page with the backend API to handle user registration and implemented error handling to ensure a smooth user experience.

# Milestone 6 :
In this milestone, we implemented secure user authentication using JSON Web Tokens (JWT). This ensures that users can securely register, log in, and maintain authentication across sessions.

Key Updates:
 JWT-Based Authentication: Users receive a signed token upon login or signup.
 Protected Routes: Implemented middleware to restrict access to authorized users only.
 Password Hashing: Used bcrypt.js to securely hash passwords before storing them.
 User Login & Logout: Developed API endpoints for user login and logout functionality.
 Persistent Authentication: Implemented token storage for maintaining user sessions.

With this milestone, we have laid the foundation for secure user access and protected API endpoints, ensuring a robust authentication system.

## Milestone 7 (Backend - User Login Authentication)  
Implemented user login functionality with secure password validation using bcrypt.  

 Key Updates:  
- Created a login API endpoint to authenticate users.  
- Retrieved user data from the database based on email/username.  
- Used bcrypt to compare entered passwords with stored hashed passwords.  
- Implemented error handling for invalid credentials.  

With this milestone, users can securely log in to the application, ensuring safe authentication.  

## Milestone 8 (Frontend - Product Card Component & Homepage)  
Designed a reusable product card component and created a structured homepage layout to display products effectively.  

Key Updates:  
- Developed a dynamic product card component using props to display product details.  
- Implemented array mapping to render multiple product cards dynamically.  
- Styled the homepage using a grid/flexbox layout for better organization.  

With this milestone, the homepage now showcases products in a clean and visually appealing manner.  

## Milestone 9: Frontend - Product Input Form

- Created a product input form to collect product details.
- Implemented functionality to upload multiple product images.
- Ensured form validation for required fields.
- Designed a user-friendly UI for product entry.
- Prepared for future enhancements like admin access and shop profile integration.

## Milestone 10: Backend - Product Schema & API Endpoint

- Created a Mongoose schema for products, defining fields such as name, description, price, and image URL.
- Implemented validation to ensure proper data integrity.
- Built a POST endpoint to receive and store product details in MongoDB.
- Ensured validation before saving product data to prevent errors.
- Prepared for future enhancements such as admin-only access and shop profiles.

## Milestone 11: Displaying All Products from Database
In this milestone, we focused on enabling data exchange between the backend and frontend, ensuring product information is dynamically displayed using React components.

Key Tasks:
- Created an API endpoint to send product data.
- Retrieved product data on the frontend.
- Dynamically displayed product information using React components.
- Milestone 12: My Products Page
- In this milestone, we developed a "My Products" page that displays only the products added by the logged-in user, filtered by their email.

Features:
Backend: Added an endpoint to fetch products by user email.
Frontend: Implemented a function to retrieve and display user-specific products dynamically.
Component: Used the Card component to present each product in a structured layout.
## Milestone 13: Edit Product Functionality
Learning Goals:
Created an API endpoint to update existing product data in MongoDB.
Implemented an edit form with pre-filled data for easy modifications.
## Milestone 14: Delete Product Functionality
Learning Goals:
Developed an API endpoint to remove a product from the database.
Ensured products get deleted from both the backend and frontend dynamically.
## Milestone 15 Responsive Navbar Added
A responsive Navbar component has been created with links to all pages ensuring smooth navigation across the application. The component is designed for reusability across multiple pages and is fully responsive.

## Milestone 16 Product Detail Page Added
A Product Detail Page has been added providing in-depth information about each product. The page includes links to the Buy and Cart pages a responsive design and a section displaying similar products at the bottom.

## Milestone 17 Cart Functionality in Node.js and MongoDB
This milestone adds cart functionality allowing users to create a cart add products retrieve cart details and remove products from their cart.

## Milestone 18: Fetch Cart Items by Email
Added a backend API to retrieve cart products using the user's email, returning detailed product information for display.

## Milestone 19: Cart System Implementation
Developed a dynamic cart page with frontend and backend functionality. Users can view products, adjust quantities with + and - buttons, and backend endpoints manage updates efficiently.

## Milestone 20: Profile Page & User Data API
Created a profile page displaying user details (photo, name, email, address) with an option to add addresses. A backend API fetches and manages user data, ensuring a responsive and user-friendly experience.
Milestone 21
Developed a frontend form to collect user inputs for country, city, address line 1, address line 2, zip code, and address type, along with displaying the address if available.

## Milestone 22
Created a backend endpoint to receive address details from the frontend and store them within the user's profile in the database.

## Milestone 23
Implemented a page allowing users to select an address during the cart checkout process.

## Milestone 24
Developed a confirmation page to review order details before finalizing the checkout.

## Milestone 25
Built a backend endpoint to process order placements.

## Milestone 26
Created an endpoint that retrieves a user’s orders based on their email.

## Milestone 27
Designed the "My Orders" page for smooth order tracking and management.

## Milestone 28
Added functionality to allow users to cancel their orders.

## Milestone 29
Integrated PayPal as a payment gateway, giving users the option to choose between Cash on Delivery (COD) and online payment via PayPal.
