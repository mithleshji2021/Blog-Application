# Blog Application

## Overview
This is a full-stack Blog Application built using modern web technologies. Users can create and manage blog posts by uploading images, adding titles, and writing descriptions using a rich text editor. The backend is powered by Appwrite, handling authentication, database management, and file storage.

## Live Demo
Check out the live application here: [Visit Blog App](https://blog-application-orcin.vercel.app/)

## Features
- User authentication (Login/Signup) with Appwrite.
- Create, update, and delete blog posts.
- Upload images for blog posts.
- Write rich-text content using an Editor.
- Form validation using React Hook Form.
- State management with Redux.
- HTML parsing for rendering blog content.

## Technologies Used
### Frontend:
- **HTML** - Structure of the web pages.
- **Tailwind CSS** - For responsive and modern styling.
- **JavaScript** - Adds interactivity.
- **React.js** - Frontend framework for building UI components.
- **Redux** - State management.
- **React Hook Form** - Form validation and handling.
- **HTML Parser** - To render HTML content inside blog posts.

### Backend:
- **Appwrite** - Backend-as-a-Service (BaaS) for authentication, database, and file storage.

## Installation and Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/mithleshji2021/Blog-Application.git
   ```
2. Navigate to the project directory:
   ```sh
   cd blog-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure Appwrite:
   - Set up an Appwrite project.
   - Create a database and storage bucket.
   - Update the Appwrite configuration in `.env` file.
5. Start the development server:
   ```sh
   npm start
   ```





