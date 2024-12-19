# Online Teaching System (OTS)

## Overview

An Online Teaching System (OTS) built using the MERN stack that allows admins, teachers, and students to interact with educational content. The system implements role-based access control to ensure security and proper functionality.

### Features

- **Admin**:
  - Manage user information (add/edit/delete).
  - Manage notes, videos, and test materials (add/edit/delete).
- **Teacher**:
  - Upload videos and notes.
  - Cannot edit or delete uploaded content.
- **Student**:
  - View and access videos, notes, and test materials.
  - Cannot upload, edit, or delete content.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, React Router DOM, Tailwind CSS, React Redux, React Hot Toast, React Icons
- **Database**: MongoDB Atlas
- **Other Libraries**: React Player, Chart.js/Recharts

## Features Breakdown

### Backend

1. **Authentication**:

   - Custom authentication using bcrypt for password hashing and JWT for token-based authentication.
   - Role-based access control (RBAC) middleware for admin, teacher, and student roles.

2. **Database**:

   - MongoDB Atlas for storing user details, uploaded content (notes/videos), and test materials.
   - Schemas:
     - **User**: Contains `name`, `email`, `password`, `role`.
     - **Content**: Contains `title`, `type` (video/note), `author`, `uploadedBy` (teacher/admin), and `url` (storage location).

3. **API Endpoints**:

   - User:
     - `POST /api/auth/register` - Register a new user.
     - `POST /api/auth/login` - Login an existing user.
     - `GET /api/users` - List all users (admin only).
   - Content:
     - `POST /api/content` - Upload new content (teacher/admin).
     - `GET /api/content` - Fetch all content (student/teacher/admin).
     - `PUT /api/content/:id` - Edit content (admin only).
     - `DELETE /api/content/:id` - Delete content (admin only).

4. **File Storage**:

   - Use AWS S3, Cloudinary, or Firebase Storage for handling video and note uploads.
   - Optionally use MongoDB GridFS for storage.

5. **Pagination**:

   - Implement pagination for large datasets to optimize API performance.

### Frontend

1. **React Components**:

   - **Auth Pages**: Login and Register forms.
   - **Admin Dashboard**:
     - User Management (view/add/edit/delete users).
     - Content Management (view/add/edit/delete videos and notes).
   - **Teacher Dashboard**:
     - Upload videos and notes.
     - View uploaded content.
   - **Student Dashboard**:
     - View and access available content.

2. **Routing**:

   - Implement protected routes for admin, teacher, and student roles using React Router DOM.

3. **State Management**:

   - Use React Redux Toolkit for managing user authentication state, role permissions, and content data.

4. **Notifications**:

   - Display success/error messages using React Hot Toast.

5. **Responsive Design**:

   - Tailwind CSS for creating responsive layouts suitable for all devices.

6. **Video Playback**:

   - Use React Player for playing video lectures with playback controls.

7. **Charts & Analytics**:

   - Admin dashboard includes analytics like total users, uploaded videos/notes using Chart.js or Recharts.

### Deployment

1. **Backend**:

   - Deploy on Render or Heroku.
   - Use PM2 to manage the Node.js server.

2. **Frontend**:

   - Deploy with Netlify or Vercel.

3. **Database**:

   - Use MongoDB Atlas for cloud-based database storage.

4. **Domain**:

   - Add a custom domain for the application.

### Additional Features

- **Search and Filters**:

  - Search content by title, type, or uploaded by (teacher/admin).

- **Progress Tracking**:

  - Allow students to track watched videos and completed notes.

- **Notifications**:

  - Notify students about new uploads via email (Nodemailer) or in-app notifications.

- **Testing**:

  - Use Postman for API testing.
  - Add unit and integration tests with Jest or Mocha for backend.

### Future Enhancements

- Add quiz functionality for students.
- Implement real-time notifications using WebSockets.
- Enable offline video playback for students.
