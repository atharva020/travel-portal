# Travel Portal

A full-stack web application for booking travel guides and managing tour bookings. Built with React.js, Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Browse and search travel guides
- Book guides and manage bookings
- View booking history and status
- Special request handling for bookings
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS3
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository
```bash
git clone https://github.com/atharva020/travel-portal.git
```
2. Install Backend Dependencies
```
cd client npm init
cd ..
cd server npm init
```
3.Start the App
start the frontend
```
cd client
npm start
```
Start the backend
```
cd server
node server.js
```
## Configuration

1. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
