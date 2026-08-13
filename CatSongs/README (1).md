# 🐱 Cat Songs

> **A personal, self-hosted music organizer and multi-mode listening experience built with MERN.**

Cat Songs is a private music web app where you can **create your own categories, save media URLs, organize them into playlists, and listen using different playback modes**.

It is inspired by the simple "radio-style" experience of sites such as Deluxe Saloon, but Cat Songs is designed to be **completely user-controlled**: categories, songs, URLs, playlists, and listening modes are all managed by the user.

---

## ✨ What is Cat Songs?

Cat Songs turns a collection of music/video URLs into a personal listening library.

```text
                 🐱 CAT SONGS
                      │
          ┌───────────┴───────────┐
          │                       │
      📂 Categories           🎵 Player
          │                       │
     User-created          Multiple Modes
          │                       │
          └───────────┬───────────┘
                      │
                 ▶️ Playback
```

### Core idea

**Create → Organize → Choose a mode → Listen**

You decide how your library is organized instead of being locked into a single "saloon" or radio format.

---

## 🎯 Main Features

| Feature | Description |
|---|---|
| 📂 Custom Categories | Create categories with your own names |
| 🔗 Save URLs | Save supported media URLs into any category |
| ➕ Explicit Add | Add a URL manually with optional metadata |
| ▶️ Music Player | Play items from your personal library |
| 🔀 Shuffle Mode | Randomize playback |
| 📻 Radio Mode | Continuously play items from a category |
| 📋 Sequential Mode | Play items in their saved order |
| ❤️ Favorites | Keep a separate collection of favorite items |
| 🎨 Custom Modes | Build additional playback modes later |
| 💾 Local First | Designed to run privately on your own machine |
| 🗃️ MongoDB | Store categories, URLs, metadata and preferences |
| ⚛️ React | Modern interactive frontend |
| 🟢 Node + Express | REST API backend |

---

## 🎧 Listening Modes

Cat Songs should support multiple ways of listening.

### 📻 Radio Mode

Select a category and let Cat Songs continuously choose the next item.

```text
Category
   ↓
Start Radio
   ↓
Song 1 → Song 2 → Song 3 → Song 4 → ...
```

### 🔀 Shuffle Mode

Randomly select the next item from the current queue.

```text
Song 1
 ↓
Random
 ↓
Song 7
 ↓
Random
 ↓
Song 3
```

### ▶️ Sequential Mode

Play items in the order they appear in the category.

```text
1 → 2 → 3 → 4 → 5
```

### ❤️ Favorites Mode

Only play items marked as favorites.

### 🎛️ Custom Mode

The architecture should make it possible to add new modes later without rewriting the player.

---

## 📂 User-Created Categories

Categories are completely controlled by the user.

Example:

```text
🐱 My Library

├── 🌙 Night
├── ☕ Morning
├── 🚗 Driving
├── 🎧 Focus
├── ❤️ Favorites
├── 🎵 90s Hindi
├── 🎸 Rock
├── 🌧️ Rainy Day
└── 🎮 Gaming
```

These are examples only.

The user can:

- Create a category
- Rename a category
- Delete a category
- Add URLs to a category
- Move URLs between categories
- Choose a category for playback
- Start a listening mode from a category

---

## 🔗 URL Management

A URL is the fundamental media reference stored by Cat Songs.

### Add a URL

```text
┌─────────────────────────────────────┐
│ Add to Category                     │
│                                     │
│ Category:  🎵 90s Hindi             │
│                                     │
│ URL: https://example.com/video/...  │
│                                     │
│ Title: Optional                     │
│ Artist: Optional                    │
│                                     │
│              [ Save URL ]           │
└─────────────────────────────────────┘
```

Metadata can be optional.

Suggested fields:

- URL
- Provider
- Title
- Artist
- Thumbnail
- Duration
- Category
- Notes
- Favorite
- Enabled/disabled

---

## 🏗️ Technology

Cat Songs follows the **MERN stack**.

```text
┌───────────────────────────────────────┐
│               React                   │
│         Frontend / Player             │
└───────────────────┬───────────────────┘
                    │ REST API
                    ▼
┌───────────────────────────────────────┐
│        Node.js + Express              │
│              Backend                  │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│              MongoDB                  │
│        Categories / Media / Data      │
└───────────────────────────────────────┘
```

### Frontend

- React
- Vite
- JavaScript/TypeScript
- CSS
- React Router
- API client

### Backend

- Node.js
- Express.js
- REST API
- Mongoose

### Database

- MongoDB

### Media playback

Use the supported player/embed mechanism of the relevant media provider.

---

## 🗂️ Project Structure

The recommended project structure is:

```text
cat-songs/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Player/
│   │   │   ├── CategoryList/
│   │   │   ├── SongList/
│   │   │   ├── AddUrl/
│   │   │   ├── ModeSelector/
│   │   │   └── Navbar/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Categories/
│   │   │   ├── Favorites/
│   │   │   └── Settings/
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
└── README.md
```

For the detailed rules to follow while building the application, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

---

## 🧠 Design Principles

Cat Songs should follow these principles:

### 1. User owns the organization

Do not hard-code categories such as "Saloon Classics".

Categories must come from the database.

### 2. Player and categories stay separate

The player should not care whether the current category is "Night", "Rock", or "90s Hindi".

It should receive a queue and play it.

### 3. Modes are pluggable

A new playback mode should be possible without rewriting the entire player.

### 4. Store URLs, not unnecessary copies of media

The application should treat external media as provider-hosted content and use supported playback/embed mechanisms.

### 5. Local-first

The first version should work comfortably on a local machine.

### 6. Keep the MVP simple

Do not add authentication, payments, cloud infrastructure, analytics, or unnecessary services until they are actually needed.

---

## 🚀 Local Development

### Prerequisites

Install:

- Node.js
- npm
- MongoDB

### Clone

```bash
git clone <your-repository-url>
cd cat-songs
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The API will normally run at:

```text
http://localhost:5000
```

---

## ⚙️ Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cat-songs
CLIENT_URL=http://localhost:5173
```

Never commit real secrets to GitHub.

Keep a safe template in:

```text
.env.example
```

---

## 🗄️ Basic Data Model

### Category

```js
{
  _id,
  name,
  description,
  icon,
  createdAt,
  updatedAt
}
```

### Song / Media URL

```js
{
  _id,
  categoryId,
  url,
  provider,
  title,
  artist,
  thumbnail,
  duration,
  favorite,
  enabled,
  createdAt,
  updatedAt
}
```

### User Preferences

For the initial single-user version, preferences can be stored globally or locally.

Possible fields:

```js
{
  theme,
  volume,
  selectedCategory,
  selectedMode,
  shuffle,
  repeat
}
```

---

## 🔌 REST API

### Categories

```http
GET    /api/categories
POST   /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
```

### Songs / URLs

```http
GET    /api/songs
POST   /api/songs
GET    /api/songs/:id
PUT    /api/songs/:id
DELETE /api/songs/:id
```

Filter by category:

```http
GET /api/songs?categoryId=CATEGORY_ID
```

### Favorites

```http
POST   /api/songs/:id/favorite
DELETE /api/songs/:id/favorite
GET    /api/songs/favorites
```

---

## 🛣️ Development Roadmap

### Phase 1 — MVP

- [ ] React application
- [ ] Express API
- [ ] MongoDB connection
- [ ] Category CRUD
- [ ] Add URL
- [ ] Edit URL
- [ ] Delete URL
- [ ] Category-based song list
- [ ] Basic player
- [ ] Next / previous
- [ ] Shuffle
- [ ] Favorites

### Phase 2 — Better Player

- [ ] Radio mode
- [ ] Sequential mode
- [ ] Queue
- [ ] Repeat
- [ ] Search
- [ ] Sorting
- [ ] Recently played
- [ ] Playback history
- [ ] Better metadata handling

### Phase 3 — Personalization

- [ ] Custom modes
- [ ] Import/export library
- [ ] Custom themes
- [ ] Keyboard controls
- [ ] Mobile-friendly player
- [ ] PWA support
- [ ] Backup/restore

### Phase 4 — Optional

- [ ] Authentication
- [ ] Multiple users
- [ ] Cloud deployment
- [ ] Multi-device synchronization

---

## 🔐 Media & Copyright Note

Cat Songs is intended as a personal project and should use media through the playback mechanisms permitted by the relevant provider.

The application should **store references/URLs rather than automatically downloading or extracting protected third-party audio**.

For YouTube and other providers, follow their current API, embedding, and platform requirements.

---

## 🐾 Why "Cat Songs"?

Because every serious music application needs a cat.

```text
 /\_/\\
( o.o )
 > ^ <
```

**Cat Songs — your library, your categories, your modes. 🎵🐱**
