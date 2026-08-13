# 🏗️ Cat Songs — Architecture

> **The implementation blueprint for Cat Songs.**
>
> Follow this document as the technical source of truth while building the project.

---

## 1. Architecture Goal

Cat Songs is a **local-first MERN application** with a clear separation between:

1. React UI
2. Player state
3. REST API
4. Business logic
5. MongoDB persistence
6. External media providers

```text
┌───────────────────────────────────────────────┐
│                    CLIENT                     │
│                    React                      │
│                                               │
│  Pages → Components → Player → API Services   │
└───────────────────────┬───────────────────────┘
                        │ HTTP / REST
                        ▼
┌───────────────────────────────────────────────┐
│                    SERVER                     │
│                Node + Express                 │
│                                               │
│ Routes → Controllers → Services → Models      │
└───────────────────────┬───────────────────────┘
                        │ Mongoose
                        ▼
┌───────────────────────────────────────────────┐
│                   MongoDB                     │
│                                               │
│ Categories / Media / Preferences / History    │
└───────────────────────────────────────────────┘

                        +
                        │
                        ▼
              External Media Providers
              via supported player/embed
```

---

# 2. Non-Negotiable Rules

These rules should be followed throughout development.

### Rule 1 — Categories are data

Do not hard-code user categories into React.

Bad:

```js
const categories = ["90s", "Rock", "Night"];
```

Good:

```text
React
  ↓
GET /api/categories
  ↓
MongoDB
```

---

### Rule 2 — Player does not own categories

The player receives a queue.

It should not know how the queue was created.

```text
Category / Mode
       ↓
Queue Builder
       ↓
Player
```

---

### Rule 3 — Modes are independent

Every mode should implement a common interface.

Conceptually:

```js
mode.getNext(queue, currentIndex)
```

Possible implementations:

```text
SequentialMode
ShuffleMode
RadioMode
FavoritesMode
CustomMode
```

Adding a new mode should not require rewriting the player.

---

### Rule 4 — Server owns persistent data

MongoDB is the source of truth for:

- Categories
- Media URLs
- Metadata
- Favorites
- Persistent preferences
- Optional history

React state is only runtime state.

---

### Rule 5 — Do not store unnecessary media files

Store the URL and metadata.

Do not build the architecture around downloading external media.

Playback should use the supported player/embed mechanism of the provider.

---

### Rule 6 — Build single-user first

The initial application does **not** require authentication.

Design the database so authentication can be added later, but do not make authentication a dependency of the MVP.

---

# 3. Repository Structure

Use this structure:

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
│   │   │   └── Layout/
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
│   │   │   └── PlayerContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePlayer.js
│   │   │   └── useCategories.js
│   │   │
│   │   ├── modes/
│   │   │   ├── sequential.js
│   │   │   ├── shuffle.js
│   │   │   ├── radio.js
│   │   │   └── favorites.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── songController.js
│   │   └── preferenceController.js
│   │
│   ├── models/
│   │   ├── Category.js
│   │   ├── Song.js
│   │   └── Preference.js
│   │
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── songRoutes.js
│   │   └── preferenceRoutes.js
│   │
│   ├── services/
│   │   ├── categoryService.js
│   │   ├── songService.js
│   │   └── metadataService.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
└── README.md
```

---

# 4. Frontend Architecture

Use a layered frontend.

```text
Page
 ↓
Component
 ↓
Hook / Context
 ↓
API Service
 ↓
Express API
```

Do not put API calls directly into every UI component.

### Example

Bad:

```text
SongList.jsx
 ├── fetch()
 ├── MongoDB assumptions
 ├── player logic
 └── rendering
```

Good:

```text
SongList.jsx
      ↓
useSongs()
      ↓
api.js
      ↓
Express
```

---

# 5. Player Architecture

The player is the central feature.

Separate these responsibilities:

```text
                 PLAYER SYSTEM
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Queue Manager   Playback Engine   UI State
        │              │              │
        ▼              ▼              ▼
   next/previous   play/pause      title
   shuffle         provider        volume
   repeat          events          progress
```

## Player State

Keep runtime state similar to:

```js
{
  queue: [],
  currentIndex: 0,
  currentItem: null,
  isPlaying: false,
  volume: 1,
  mode: "sequential",
  repeat: false,
  shuffle: false
}
```

Do not store the entire player state in MongoDB.

Only persist settings that need to survive a restart.

---

# 6. Queue System

The queue is the bridge between categories/modes and the player.

```text
Category
   ↓
Fetch items
   ↓
Filter enabled items
   ↓
Apply mode
   ↓
Create queue
   ↓
Player
```

Example:

```js
const queue = buildQueue({
  items,
  mode: "shuffle"
});
```

The player then works only with `queue`.

---

# 7. Playback Modes

Every mode should produce or navigate a queue.

## Sequential

```text
1 → 2 → 3 → 4 → 5
```

Algorithm:

```text
currentIndex + 1
```

---

## Shuffle

```text
3 → 1 → 5 → 2 → 4
```

Use a proper shuffle algorithm and avoid immediately repeating the same item where possible.

---

## Radio

Radio mode is a continuous listening experience.

```text
Category
   ↓
Current queue
   ↓
Play
   ↓
Next item
   ↓
Continue
```

Radio mode can use shuffle or weighted selection internally, but that implementation detail must remain inside the mode.

---

## Favorites

```text
All items
   ↓
favorite === true
   ↓
Queue
```

---

## Future Custom Modes

Custom modes should be added as separate modules.

Example:

```text
client/src/modes/
├── sequential.js
├── shuffle.js
├── radio.js
├── favorites.js
└── night.js
```

---

# 8. Category Architecture

A category represents a user-created collection.

Example:

```js
{
  name: "Night",
  description: "Songs for late night",
  icon: "🌙"
}
```

A category should not contain a giant embedded array of songs.

Use references:

```text
Category
   │
   └── Song.categoryId
```

This keeps the data easier to query and manage.

---

# 9. MongoDB Models

## Category

```js
{
  name: String,
  description: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

Recommended indexes:

```text
name
createdAt
```

---

## Song

```js
{
  categoryId: ObjectId,
  url: String,
  provider: String,
  title: String,
  artist: String,
  thumbnail: String,
  duration: Number,
  favorite: Boolean,
  enabled: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

Recommended indexes:

```text
categoryId
favorite
enabled
createdAt
```

---

## Preference

For the single-user version:

```js
{
  theme: String,
  volume: Number,
  selectedCategoryId: ObjectId,
  selectedMode: String,
  repeat: Boolean,
  updatedAt: Date
}
```

---

# 10. REST API Design

## Category API

```http
GET    /api/categories
POST   /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
```

### Create category

```http
POST /api/categories
Content-Type: application/json
```

```json
{
  "name": "Night",
  "description": "Late night songs",
  "icon": "🌙"
}
```

---

## Song API

```http
GET    /api/songs
POST   /api/songs
GET    /api/songs/:id
PUT    /api/songs/:id
DELETE /api/songs/:id
```

Category filtering:

```http
GET /api/songs?categoryId=...
```

Favorites:

```http
GET    /api/songs/favorites
POST   /api/songs/:id/favorite
DELETE /api/songs/:id/favorite
```

---

# 11. Add URL Flow

The user enters a URL.

```text
User
 ↓
Add URL form
 ↓
Client validation
 ↓
POST /api/songs
 ↓
Controller
 ↓
Song service
 ↓
MongoDB
 ↓
Response
 ↓
Update UI
```

Optional metadata can be supplied by the user.

If metadata is retrieved from a provider, keep that functionality isolated inside:

```text
server/services/metadataService.js
```

Do not mix metadata fetching into the controller.

---

# 12. URL Validation

The backend must validate URLs before storing them.

Minimum validation:

```text
Is it a valid URL?
Is the provider supported?
Is the category valid?
```

Example logical result:

```js
{
  valid: true,
  provider: "youtube"
}
```

Provider detection belongs in a service/helper, not inside the React UI.

---

# 13. External Player Architecture

The application should not assume every URL is a raw audio file.

Use a provider abstraction:

```text
Media URL
   ↓
Provider Detector
   ↓
Provider Adapter
   ↓
Supported Player / Embed
```

Conceptually:

```js
{
  provider: "youtube",
  url: "...",
  playerType: "youtube"
}
```

Future providers can be added without rewriting the entire player.

---

# 14. API Error Handling

Every API should return predictable errors.

Example:

```json
{
  "success": false,
  "message": "Category not found"
}
```

Successful response:

```json
{
  "success": true,
  "data": {}
}
```

Use a centralized Express error handler.

---

# 15. State Management

Use React Context for the player initially.

Recommended:

```text
PlayerContext
```

It owns:

- Current item
- Queue
- Current index
- Playing state
- Volume
- Mode
- Repeat
- Player actions

Category and song fetching can use dedicated hooks.

Do not introduce Redux unless the application becomes complex enough to justify it.

---

# 16. UI Structure

Recommended layout:

```text
┌──────────────────────────────────────────────┐
│ 🐱 CAT SONGS                         ⚙️      │
├───────────────┬──────────────────────────────┤
│               │                              │
│  Categories   │       Current Song           │
│               │                              │
│  🌙 Night     │       🎵                     │
│  ☕ Morning   │       Song Title              │
│  🎧 Focus     │       Artist                  │
│  🎸 Rock      │                              │
│               │       ▶  ⏮  ⏭  🔀            │
│  + Add        │                              │
│               │       ───────────────         │
│               │                              │
├───────────────┴──────────────────────────────┤
│ Mode: Radio       Category: Night            │
└──────────────────────────────────────────────┘
```

Keep the player accessible from every relevant page.

---

# 17. Page Responsibilities

## Home

Show:

- Current player
- Current category
- Mode
- Queue
- Quick category selection

## Categories

Show:

- All categories
- Create
- Rename
- Delete
- Open category

## Category Detail

Show:

- Category name
- URLs/items
- Add URL
- Edit
- Delete
- Start mode

## Favorites

Show:

- Favorite items
- Start Favorites Mode

## Settings

Show:

- Theme
- Volume
- Default mode
- Default category
- Import/export later

---

# 18. Development Order

Follow this order.

```text
1. Create MERN project
        ↓
2. Connect MongoDB
        ↓
3. Build Category model/API
        ↓
4. Build Song model/API
        ↓
5. Build category UI
        ↓
6. Build add URL UI
        ↓
7. Build provider player
        ↓
8. Build queue
        ↓
9. Build sequential mode
        ↓
10. Build shuffle mode
        ↓
11. Build radio mode
        ↓
12. Build favorites
        ↓
13. Add preferences
        ↓
14. Polish UI
```

Do **not** start with authentication, deployment, analytics, or advanced features.

---

# 19. MVP Definition

The MVP is complete when a user can:

```text
Create Category
      ↓
Add URL
      ↓
See URL in Category
      ↓
Open Category
      ↓
Start Player
      ↓
Play
      ↓
Next
      ↓
Previous
      ↓
Shuffle
```

If this works reliably, the foundation is correct.

---

# 20. Security

Even though this is initially local/private:

- Never commit `.env`.
- Never hard-code secrets.
- Validate request bodies.
- Validate MongoDB IDs.
- Validate URLs.
- Sanitize user-controlled text where appropriate.
- Add rate limiting if the app becomes remotely accessible.
- Add authentication before exposing user data publicly.

---

# 21. Git Rules

`.gitignore` should include:

```text
node_modules/
.env
.env.local
dist/
build/
coverage/
.DS_Store
*.log
```

Do not commit:

```text
.env
database dumps containing private data
personal media files
credentials
API secrets
```

---

# 22. Architecture Summary

The entire application should follow this simple dependency direction:

```text
              ┌──────────────┐
              │    React     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ API Service  │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   Express    │
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │ Controllers  │
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │   Services   │
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │   Models     │
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │   MongoDB    │
              └──────────────┘
```

Player flow:

```text
Category
   ↓
Song Repository
   ↓
Mode
   ↓
Queue
   ↓
Player
   ↓
External Provider Player
```

**Keep these boundaries clean.**

That is the core architecture Cat Songs should follow.
