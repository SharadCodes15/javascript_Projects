# 📱 MERN Social Media App

A modern **Social Media Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Users can create posts with images and captions, and view them in a clean, responsive feed.

---

## 🚀 Features

- 📸 Create a new post with an image
- 📝 Add captions to posts
- 📰 Responsive feed page displaying all posts
- ☁️ Store images and post data in MongoDB
- 🔄 Fetch posts dynamically using Axios
- 🎨 Modern React UI
- ⚡ REST API using Express.js

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- Multer (Image Upload)
- CORS

### Database
- MongoDB
- Mongoose

---

## 📂 Project Structure

```
social-media-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePost.jsx
│   │   │   └── Feed.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/social-media-app.git

cd social-media-app
```

---

## Install Frontend

```bash
cd client

npm install
```

---

## Install Backend

```bash
cd ../server

npm install
```

---

# ▶️ Run the Project

## Start Backend

```bash
cd server

npm start
```

Backend runs on:

```
http://localhost:3000
```

---

## Start Frontend

```bash
cd client

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Create Post

```
POST /posts
```

### Form Data

| Field | Type |
|---------|------|
| image | File |
| caption | String |

---

## Get All Posts

```
GET /posts
```

Returns:

```json
{
    "post":[
        {
            "_id":"66...",
            "image":"uploads/image.jpg",
            "caption":"Hello World"
        }
    ]
}
```

---

# 💾 MongoDB Schema

```javascript
const PostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
});
```

---

# 📷 Screens

### Create Post

- Upload Image
- Enter Caption
- Submit Post

---

### Feed Page

- Displays uploaded image
- Displays caption
- Responsive card layout

---

# 📦 Dependencies

### Frontend

```
react
react-dom
axios
```

### Backend

```
express
mongoose
multer
cors
dotenv
nodemon
```

---

# 🔮 Future Improvements

- 👤 User Authentication (JWT)
- ❤️ Like Posts
- 💬 Comments
- 🔍 Search Users
- 🗑️ Delete Posts
- ✏️ Edit Posts
- 📄 User Profiles
- 📱 Responsive Navigation
- ☁️ Cloudinary Image Upload
- 🔔 Notifications

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

# 👨‍💻 Author

**Your Name**

GitHub: https://github.com/yourusername

---

# 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ If you like this project, don't forget to star the repository!
