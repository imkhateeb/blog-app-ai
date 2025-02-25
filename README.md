# BlogWise

## Overview

**BlogWise** is a full-stack Blog application built using **Next.js**, **PostgreSQL**, and **TailwindCSS**. This project demonstrates user and blog post management with authentication, role-based access control, and an interactive UI with modern React libraries.
![Screenshot 2025-02-18 050621](https://github.com/user-attachments/assets/f4fc74c7-2a27-4b9d-b679-f29178c6dcc0)

## Features

- 🔐 **Authentication & Authorization** (JWT-based authentication, role-based access control)
- 📄 **User & Blog Post Management** (Create, Read, Update, Delete operations)
- 🌐 **Next.js 15 with Server-Side Rendering (SSR) & API Routes**
- 🎨 **TailwindCSS for Styling**
- 🎭 **Framer Motion Animations**
- 🖼️ **Cloudinary Integration for Image Uploads**
- 📦 **PostgreSQL Database with pg package**
- 📜 **Form Validation using React Hook Form & Zod**
- 🚀 **Hot Reloading & Optimized Performance with Next.js**

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 18)
- **PostgreSQL** (Installed and running locally or via Docker)

### PostgreSQL Setup

- Start Docker Desktop
- Run the following command to start the PostgreSQL container:

```bash
docker-compose up -d
```

### Clone the Repository

```bash
git clone https://github.com/imkhateeb/blog-app-ai
cd blog-app-ai
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and configure the following:

```env
DB_USER=myuser
DB_HOST=localhost
DB_NAME=mydatabase
DB_PASSWORD=mypassword
DB_PORT=5432
JWT_SECRET=my_super_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Running the Project

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build & Start for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
next-pg-crud/
│── public/               # Static assets
│── src/
│   ├── components/       # Reusable React components
│   ├── app/              # Next.js pages (API routes & frontend pages)
│   ├── public/           # Public assets
│   ├── lib/              # Database and utility functions
│   └── types/            # TypeScript type definitions
│── .env.local            # Environment variables (ignored by Git)
│── package.json          # Project dependencies and scripts
│── docker-compose.yml    # Docker Compose configuration
│── tailwind.config.ts    # TailwindCSS configuration
│── tsconfig.json         # TypeScript configuration
│── README.md             # Project documentation
```

---

## API Endpoints

### User Routes

| Method   | Endpoint             | Description         |
| -------- | -------------------- | ------------------- |
| `POST`   | `/api/auth/login`    | User login          |
| `POST`   | `/api/auth/register` | User registration   |
| `GET`    | `/api/users`         | Fetch all users     |
| `GET`    | `/api/users/:id`     | Fetch a single user |
| `PUT`    | `/api/users/:id`     | Update a user       |
| `DELETE` | `/api/users/:id`     | Delete a user       |

### Post Routes

| Method   | Endpoint         | Description         |
| -------- | ---------------- | ------------------- |
| `POST`   | `/api/posts`     | Create a new post   |
| `GET`    | `/api/posts`     | Fetch all posts     |
| `GET`    | `/api/posts/:id` | Fetch a single post |
| `PUT`    | `/api/posts/:id` | Update a post       |
| `DELETE` | `/api/posts/:id` | Delete a post       |

---

## Technologies Used

- **Frontend:** React, Next.js 15, TailwindCSS, React Hook Form, Framer Motion
- **Backend:** Next.js API Routes, Node.js, PostgreSQL (pg package), JWT Authentication
- **Storage & Media:** Cloudinary for image uploads
- **Validation:** Zod, React Hook Form

---

## Contact

For any questions or feedback, reach out to:

- **Email:** luckykhateeb4@gmail.com
- **GitHub:** [imkhateeb](https://github.com/imkhateeb)

Happy coding! 🚀
