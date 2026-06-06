# MERN Food Reels System 

A full-stack food discovery platform inspired by short-form video content. Users can explore food reels uploaded by food partners, like and save their favorite reels, and discover restaurants through engaging visual content.

## Live Demo

**Frontend:** Deployed on Vercel

**Backend:** Deployed on Render

**Database:** MongoDB Atlas

---

## Overview

MERN Food Reels System is a social food discovery platform built using the MERN stack. The application allows food partners to upload food-related reels while users can browse, like, and save content for later viewing.

Instead of relying on text-heavy restaurant listings, the platform focuses on short-form video content to help users discover food visually.

---

## Features

### User Features

* User registration and authentication
* Browse food reels
* Like reels
* Save reels for later
* View food partner profiles

### Food Partner Features

* Food partner authentication
* Upload food reels
* Dedicated food partner profile page
* Showcase food offerings through video content

### Platform Features

* JWT-based authentication
* Role-based access control
* Responsive UI
* Video delivery through ImageKit
* MongoDB database integration
* Dockerized development environment

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie-based Authentication

### Cloud Services

* MongoDB Atlas
* ImageKit
* Render
* Vercel

### DevOps

* Docker
* Docker Compose

---

## Project Structure

```text
mern-food-reels-system/
│
├── backend/
│   ├── src/
│   ├── scripts/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── videos/
│
├── docker-compose.yml
└── .gitignore
```

---

## Authentication

The application supports two user roles:

### User

Can:

* Browse reels
* Like reels
* Save reels
* Manage profile

### Food Partner

Can:

* Upload reels
* Manage uploaded content
* Maintain food partner profile

---

## Media Handling

Videos are managed using **ImageKit**.

Instead of storing videos directly in the database, the application stores and serves ImageKit-generated URLs, allowing efficient media delivery and optimization.

---

## Local Development Setup

### Clone Repository

```bash
git clone https://github.com/Rohith-r-007/mern-food-reels-system.git

cd mern-food-reels-system
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000 //for testing locally
```

Start frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## Docker Setup

Run the complete application using Docker:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

---

## Future Improvements

* Reel comments
* Food item search
* Follow food partners
* Food partner likes and saves
* Recommendation system
* Advanced analytics dashboard
* Real-time notifications

---

## Author

**Rohith R**

GitHub: https://github.com/Rohith-r-007
