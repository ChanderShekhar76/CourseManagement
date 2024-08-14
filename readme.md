# Course Management Backend Service

This project is a backend service for a course management platform built with the MERN stack (MongoDB, Express, Node.js). The service includes two main roles: Admin and User. Admins can create and manage courses, while Users can browse and purchase courses (payment functionality not yet implemented).

## Features

### Admin
- **Sign Up:** Admins can register for an account.
- **Login:** Admins can log in to their account.
- **Create Courses:** Admins can create and manage courses.

### User
- **Sign Up:** Users can register for an account.
- **Login:** Users can log in to their account.
- **Purchase Courses:** Users can purchase courses (without payment functionality).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/course-management-backend.git
   cd course-management-backend
2. **Install dependencies:**
    npm install
3. **Set up environment variables:**
    Create a .env file in the root of your project and add the following:

    PORT=3000
    URL=your_mongodb_connection_string
    SECRET_KEY=your_jwt_secret_key
4. **Start Server**
    node index.js

## API Endpoints
### Admin Routes
**POST /admin/signup**
- Description: Register a new admin account.
- Request Body: { "username": "string", "password": "string" }
- Response: 201 Created on success, with admin details.

**POST /admin/login**
- Description: Login for admin.
- Request Body: { "username": "string", "password": "string" }
- Response: 200 OK with JWT token.

**POST /admin/courses**
- Description: Create a new course (authentication required).
- Request Body: { "title": "string", "description": "string","image":"string","price":"number"}
- Response: 201 Created on success, with course details.

**GET /admin/courses**
- Description: Get Courses Created By Admin (authentication required).
- Request Headers: { "Authorization": "JWT token"}
- Response: 200 all courses list.

### User Routes

**POST /user/signup**
- Description: Register a new user account.
- Request Body: { "username": "string", "password": "string" }
- Response: 201 Created on success, with user details.

**POST /user/login**

- Description: Login for user.
- Request Body: { "username": "string", "password": "string" }
- Response: 200 OK with JWT token.

**POST /user/courses/:id**

- Description: Purchase a course (authentication required, payment not implemented).
- Request Params: id - The ID of the course to purchase.
- Response: 200 OK on success, with purchase details.

**GET /user/allcourses**

- Description: get all courses available (authentication required).
- Request Headers: "Authorization" jwt token.
- Response: 200 OK on success, list of all courses.

**GET /user/courses**

- Description: get all purchased course (authentication required).
- Request Headers: "Authorization" jwt token.
- Response: 200 OK on success, list of all purchased courses.

## Future Enhancements
- **Payment Integration**: Implement payment gateway integration for course purchases.
- **Course Catalog**: Add functionality for users to browse and search for courses.
- **Admin Dashboard**: Develop a dashboard for admins to manage courses and users.