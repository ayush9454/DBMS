#!/bin/bash

# Create project structure
mkdir -p frontend/src/{components,pages,contexts}
mkdir -p backend

# Initialize backend
cd backend
npm init -y
npm install express cors mysql2 dotenv bcryptjs jsonwebtoken

# Initialize frontend
cd ../frontend
npx create-react-app . --template typescript
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom framer-motion axios

# Create .env file for backend
cd ../backend
echo "PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_parking" > .env

# Set up database
mysql -u root < database.sql

echo "Project setup complete! You can now start the development servers:"
echo "1. Start backend: cd backend && npm start"
echo "2. Start frontend: cd frontend && npm start" 