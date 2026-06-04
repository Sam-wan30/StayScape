# StayScape

**StayScape** is a full-stack vacation rental platform inspired by Airbnb. Browse unique stays, filter by category, search by location or price, book reservations, and leave reviews — all built with a modern, responsive UI.

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![EJS](https://img.shields.io/badge/Templates-EJS-blue)

---

## Features

- **Browse & search listings** — filter by 20+ categories or search by title, location, country, or price
- **User authentication** — secure signup/login with Passport.js local strategy
- **Create & manage listings** — upload images via Cloudinary, geocode locations with Mapbox
- **Reviews & ratings** — star-rated reviews on every listing
- **Interactive maps** — Mapbox GL maps on listing detail pages
- **Responsive UI** — mobile-first design with smooth animations (AOS + CSS transitions)
- **MVC architecture** — clean separation of routes, controllers, models, and views

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | EJS, Bootstrap 5, Custom CSS, AOS, Font Awesome |
| **Backend** | Node.js, Express.js, Passport.js, Joi validation |
| **Database** | MongoDB Atlas, Mongoose |
| **Services** | Cloudinary (images), Mapbox (maps & geocoding) |

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [Mapbox](https://account.mapbox.com/) access token
- [Cloudinary](https://cloudinary.com/) account

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd StayScape

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# (Optional) Seed sample listings
npm run seed

# Start the server
npm start
```

Open **http://localhost:8080** in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `ATLASDB_URL` | MongoDB connection string |
| `SECRET` | Session signing secret (long random string) |
| `MAP_TOKEN` | Mapbox public access token |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `PORT` | Server port (default: `8080`) |

---

## Project Structure

```
├── app.js                  # Application entry point
├── cloudConfig.js          # Cloudinary configuration
├── middlewares.js          # Auth, validation, ownership guards
├── schemaValidation.js     # Joi schemas
├── controllers/            # Route handlers
├── models/                 # Mongoose schemas
├── routes/                 # Express routers
├── views/                  # EJS templates
├── public/                 # Static assets (CSS, JS, images)
├── init/                   # Database seed script
└── utils/                  # Helpers (wrapAsync, ExpressError)
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server |
| `npm run seed` | Seed the database with sample listings |

---

## License

ISC
