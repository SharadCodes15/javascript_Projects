# 📝 Notes App

<p align="center">
  <img src="./assets/banner.png" alt="Notes App Banner" width="100%">
</p>

<p align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-005571?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)

</p>

---

## 📖 About

A full-stack **Notes Management Application** built using the **MERN Stack** following **REST API architecture**.

Users can securely create, edit, delete, and organize personal notes after authentication. The project demonstrates clean backend architecture, JWT authentication, CRUD operations, and responsive frontend design.

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- ➕ Create Notes
- 📝 Update Notes
- ❌ Delete Notes
- 📄 View All Notes
- 🔍 Search Notes
- 📱 Responsive UI
- 🌐 RESTful API
- 🔒 Protected Routes

---

# 📸 Preview

> Replace the image below with your project screenshot.

<p align="center">
<img src="./assets/Home.png" width="900">
<img src="./assets/Login.png" width="900">
<img src="./assets/Edit.png" width="900">
<img src="./assets/Settings.png" width="900">

</p>

---

# 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS / Tailwind CSS (if used)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt.js

---

# 📂 Project Structure

```
Notes-App/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── assets/
│   ├── banner.png
│   └── preview.png
│
├── README.md
└── .env
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/notes-app.git
```

```bash
cd notes-app
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm start
```

---

# 🔗 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notes` | Get All Notes |
| GET | `/api/notes/:id` | Get Single Note |
| POST | `/api/notes` | Create Note |
| PUT | `/api/notes/:id` | Update Note |
| DELETE | `/api/notes/:id` | Delete Note |

---

# 🔒 Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 💻 Available Scripts

### Client

```bash
npm start
```

### Server

```bash
npm run dev
```

---

# 🌍 Deployment

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway

### Database

- MongoDB Atlas

---

# 📦 Built With

- React
- Express
- Node.js
- MongoDB
- Mongoose
- JWT
- Axios
- bcrypt.js

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# ⭐ Support

If you like this project, don't forget to ⭐ the repository!

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
Made with ❤️ using the MERN Stack
</p>