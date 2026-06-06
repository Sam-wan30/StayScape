# 🏝️ StayScape

**Your Gateway to Extraordinary Stays Worldwide**

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Express](https://img.shields.io/badge/Express-4.19.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![EJS](https://img.shields.io/badge/EJS-3.1.10-B4CA65)
![License](https://img.shields.io/badge/License-ISC-blue)

A production-grade, full-stack vacation rental platform that connects travelers with unique accommodations worldwide. Built with modern web technologies and industry best practices, StayScape offers a seamless booking experience with interactive maps, secure authentication, and responsive design.

---

## 🌐 Live Demo

**Explore the application live at:** [https://stayscape-hbhr.onrender.com](https://stayscape-hbhr.onrender.com)

StayScape is currently deployed on Render's free tier, demonstrating cloud-native deployment capabilities with automatic scaling and SSL termination.

---

## 🎯 Problem Statement

In the crowded vacation rental market, travelers often struggle to find unique, high-quality accommodations that offer authentic experiences. Existing platforms can be overwhelming, with complex booking processes and limited search capabilities. StayScape addresses these challenges by providing:

- **Simplified Discovery**: Intuitive category-based browsing and powerful search functionality
- **Transparent Pricing**: Clear cost breakdown with tax calculation toggle
- **Visual Experience**: High-quality imagery and interactive maps for location context
- **User-Centric Design**: Responsive interface that works seamlessly across devices

---

## ✨ Key Features

### 🏠 User Features

#### Listing Management
- **Browse Listings**: View curated vacation rentals with beautiful card-based layouts
- **Category Filtering**: Filter by 20+ categories including:
  - Rooms, Iconic Cities, Trending, Mountains, Castles
  - Amazing Pools, Camping, Farm, Arctic, Beach
  - Boats, Ski-in/out, Apartments, New Stays, Woodlands
  - Lake, Cabins, Countryside, Bed & Breakfast, Campsite, Historical Homes
- **Advanced Search**: Search by title, location, country, category, or price range
- **Interactive Maps**: View listing locations on Mapbox-powered interactive maps
- **Tax Toggle**: Display pricing with or without taxes (18% GST simulation)

#### Review System
- **Star Ratings**: 1-5 star rating system with interactive UI
- **User Reviews**: Write and read reviews from other travelers
- **Review Management**: Delete your own reviews
- **Author Attribution**: Reviews display author usernames with avatars

#### Reservation System
- **Booking Requests**: Submit reservation requests for desired properties
- **Email Confirmation**: Simulated email confirmation workflow
- **Booking Management**: Track reservation status

### 🔐 Authentication Features

#### User Registration
- **Secure Signup**: Username, email, and password registration
- **Validation**: Joi schema validation for all inputs
- **Unique Constraints**: Email and username uniqueness enforcement
- **Password Requirements**: Minimum 6 characters with client-side validation

#### Session Management
- **Passport.js Authentication**: Industry-standard authentication middleware
- **Session Persistence**: MongoDB-backed session storage with connect-mongo
- **Auto-Login**: Automatic login after successful registration
- **Remember Me**: Session cookies with 7-day expiration

#### Account Management
- **Profile Display**: Username display in navigation bar
- **Secure Logout**: Secure session termination with redirect handling
- **Protected Routes**: Authentication middleware for sensitive operations

### 🛡️ Security Features

#### Web Security
- **Helmet.js**: HTTP security headers for protection against common vulnerabilities
- **Rate Limiting**: Express-rate-limit for authentication endpoints (5 attempts/15 minutes)
- **API Rate Limiting**: General API protection (100 requests/15 minutes)
- **CSRF Protection**: Method-override for secure form submissions

#### Authentication Security
- **Password Hashing**: Automatic salt-hashing via passport-local-mongoose
- **Session Cookies**: HTTP-only, secure, sameSite protection in production
- **Secret Key Management**: Environment-based session secret configuration
- **Input Validation**: Comprehensive Joi validation schemas for all forms

#### Data Security
- **SQL Injection Prevention**: NoSQL (MongoDB) architecture eliminates SQL injection risks
- **XSS Protection**: EJS auto-escaping and Helmet CSP configuration
- **File Upload Security**: Cloudinary integration with format restrictions (PNG, JPG, JPEG, WEBP)

### 🎨 Performance Features

#### Frontend Optimization
- **Image Lazy Loading**: Native lazy loading for listing images
- **CSS Animations**: GPU-accelerated transitions with cubic-bezier easing
- **AOS Library**: Scroll-triggered animations with performance optimization
- **Custom Scrollbars**: Optimized scrollbar styling for better UX

#### Backend Performance
- **Database Indexing**: Indexed fields on email and username for fast lookups
- **Connection Pooling**: Mongoose connection management
- **Session Storage**: Redis-like session persistence with MongoDB
- **Geocoding Caching**: Coordinates stored to reduce API calls

### 🔧 Admin Features

#### Content Management
- **Listing CRUD**: Create, read, update, delete operations
- **Image Management**: Upload and update listing images via Cloudinary
- **Category Management**: Assign categories during listing creation
- **Geographic Data**: Automatic geocoding via Mapbox API

#### Ownership Controls
- **Authorisation**: Ownership verification for listing modifications
- **Review Moderation**: Delete reviews authored by the user
- **Protected Routes**: Middleware-based access control

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **EJS** | 3.1.10 | Server-side templating engine |
| **Bootstrap 5** | 5.3.3 | Responsive CSS framework |
| **AOS** | 2.3.4 | Scroll animation library |
| **Font Awesome** | 6.5.1 | Icon library |
| **RemixIcon** | Latest | Additional icon set |
| **Mapbox GL JS** | 3.4.0 | Interactive map rendering |
| **Custom CSS** | - | Premium design system with CSS variables |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20 | JavaScript runtime environment |
| **Express.js** | 4.19.2 | Web application framework |
| **Passport.js** | 0.7.0 | Authentication middleware |
| **passport-local-mongoose** | 8.0.0 | Passport strategy for Mongoose |
| **Helmet.js** | 8.2.0 | Security HTTP headers |
| **express-rate-limit** | 8.5.2 | Rate limiting middleware |
| **connect-flash** | 0.1.1 | Flash message support |
| **express-session** | 1.18.0 | Session management |
| **connect-mongo** | 5.1.0 | MongoDB session store |
| **method-override** | 3.0.0 | HTTP method override |
| **Joi** | 17.13.1 | Schema validation |
| **Multer** | 1.4.5-lts.1 | File upload handling |
| **dotenv** | 16.4.5 | Environment variable management |
| **cookie-parser** | 1.4.7 | Cookie parsing middleware |

### Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **MongoDB Atlas** | Latest | Cloud-hosted NoSQL database |
| **Mongoose** | 8.4.0 | MongoDB object modeling (ODM) |

### External APIs
| Service | Purpose |
|---------|---------|
| **Mapbox Geocoding API** | Location geocoding and map rendering |
| **Cloudinary API** | Image storage and manipulation |

### Deployment
| Platform | Purpose |
|----------|---------|
| **Render** | Cloud hosting platform (PaaS) |
| **render.yaml** | Infrastructure as code configuration |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **npm** | Package management |
| **Node.js** | JavaScript runtime |

---

## 🏗️ System Architecture

### Request Flow

```
User Request → Express Router → Authentication Middleware → Validation Middleware → Controller → Model → Database
                      ↓                      ↓                     ↓                ↓
                 Response ←           Error Handling ←    View Template ←   Data Processing
```

### Architecture Components

#### 1. **MVC Pattern Implementation**
- **Models**: Mongoose schemas for data structure and validation
- **Views**: EJS templates with component-based partials
- **Controllers**: Business logic and request handling
- **Routes**: URL mapping to controllers with middleware chains

#### 2. **Middleware Pipeline**
```
Request → Static Files → Session → Passport → Flash → Custom Middleware → Route Handler → Error Handler → Response
```

#### 3. **Database Interactions**
- **Connection**: Mongoose connection pool to MongoDB Atlas
- **Queries**: Mongoose query builder with promise support
- **Transactions**: Built-in atomic operations for data consistency
- **Relationships**: ObjectId references between collections
- **Post Hooks**: Automatic cleanup of related documents

#### 4. **Authentication Flow**
```
Signup: Form → Validation → User Creation → Password Hashing → Session Creation → Auto-Login → Redirect
Login: Form → Validation → Passport Strategy → Password Verification → Session Creation → Redirect
Protected Route: Request → Session Check → User Verification → Authorization → Route Handler
```

---

## 📁 Folder Structure

```
WanderLust/
├── app.js                          # Application entry point and configuration
├── cloudConfig.js                  # Cloudinary configuration
├── middlewares.js                 # Custom middleware functions
├── schemaValidation.js            # Joi validation schemas
├── render.yaml                    # Render deployment configuration
├── package.json                   # Dependencies and scripts
├── .env.example                   # Environment variables template
├── controllers/                   # Request handlers
│   ├── listings.js               # Listing CRUD operations
│   ├── reviews.js                # Review management
│   └── users.js                  # Authentication handlers
├── models/                        # Mongoose schemas
│   ├── listing.js                # Listing model with geospatial support
│   ├── review.js                 # Review model
│   └── user.js                   # User model with passport integration
├── routes/                        # Express route definitions
│   ├── listing.js                # Listing routes with middleware
│   ├── review.js                 # Review routes
│   └── user.js                   # Authentication routes
├── views/                         # EJS templates
│   ├── layouts/                  # Layout templates
│   │   └── boilerplate.ejs       # Main layout with includes
│   ├── includes/                 # Reusable components
│   │   ├── navbar.ejs            # Navigation bar with search
│   │   ├── footer.ejs            # Footer with social links
│   │   └── flash.ejs             # Flash message alerts
│   ├── listings/                 # Listing-related views
│   │   ├── index.ejs             # Listing grid with filters
│   │   ├── show.ejs              # Listing detail page
│   │   ├── new.ejs               # Create listing form
│   │   ├── edit.ejs              # Edit listing form
│   │   └── error.ejs             # Custom error page
│   └── users/                    # Authentication views
│       ├── login.ejs             # Login form
│       └── signup.ejs            # Registration form
├── public/                        # Static assets
│   ├── css/                      # Stylesheets
│   │   ├── style.css             # Main stylesheet (1183 lines)
│   │   ├── animations.css       # Animation definitions
│   │   └── rating.css            # Star rating component
│   ├── js/                       # Client-side JavaScript
│   │   ├── script.js             # Main client logic
│   │   └── map.js                # Mapbox integration
│   └── images/                   # Static images
│       └── favicon.svg           # Site favicon
├── init/                          # Database seeding
│   ├── index.js                  # Seed script
│   └── data.js                   # Sample listings data (1106 lines)
└── utils/                         # Utility functions
    ├── ExpressError.js           # Custom error class
    └── wrapAsync.js              # Async error wrapper
```

---

## 🚀 Installation Guide

### Prerequisites

- **Node.js** 20 or higher ([Download](https://nodejs.org/))
- **MongoDB Atlas** account ([Sign up free](https://www.mongodb.com/atlas))
- **Mapbox** account ([Get free access token](https://account.mapbox.com/))
- **Cloudinary** account ([Sign up free](https://cloudinary.com/))
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/WanderLust.git
cd WanderLust
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`:
- Express and middleware packages
- Database drivers (Mongoose)
- Authentication libraries (Passport)
- External API clients (Mapbox, Cloudinary)
- Development dependencies

#### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
NODE_ENV=development

# MongoDB Atlas connection string
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/stayscape

# Session secret (generate a long random string)
SECRET=your-super-secret-session-key-change-this

# Mapbox access token
MAP_TOKEN=pk.your_mapbox_public_token

# Cloudinary credentials
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Server port (optional, defaults to 8080)
PORT=8080
```

#### 4. Database Setup

**Option A: Use MongoDB Atlas (Recommended)**

1. Create a free MongoDB Atlas account
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Copy the connection string to your `.env` file

**Option B: Use Local MongoDB**

```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Start MongoDB service
brew services start mongodb-community  # macOS
sudo systemctl start mongodb          # Linux

# Update .env with local connection string
ATLASDB_URL=mongodb://localhost:27017/stayscape
```

#### 5. Seed the Database (Optional)

```bash
npm run seed
```

This will populate the database with sample listings from `init/data.js`.

#### 6. Start the Development Server

```bash
npm start
```

The application will start on `http://localhost:8080`

#### 7. Access the Application

Open your browser and navigate to:
- **Home**: `http://localhost:8080`
- **Listings**: `http://localhost:8080/listings`
- **Signup**: `http://localhost:8080/signup`
- **Login**: `http://localhost:8080/login`
- **Health Check**: `http://localhost:8080/health`

---

## 🔐 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ATLASDB_URL` | ✅ Yes | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `SECRET` | ✅ Yes | Session signing secret (long random string) | `9f8d2c3e1a4b7d6f8e2c3a1b4d7f6e8c` |
| `MAP_TOKEN` | ✅ Yes | Mapbox public access token for geocoding | `pk.eyJ1Ijoi...` |
| `CLOUD_NAME` | ✅ Yes | Cloudinary cloud name | `my-cloudinary-cloud` |
| `CLOUD_API_KEY` | ✅ Yes | Cloudinary API key | `123456789012345` |
| `CLOUD_API_SECRET` | ✅ Yes | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz123456` |
| `PORT` | ❌ No | Server port (defaults to 8080) | `8080` |
| `NODE_ENV` | ❌ No | Environment mode (development/production) | `development` |

### Security Notes

- Never commit `.env` file to version control
- Use strong, random values for `SECRET`
- Rotate API keys regularly
- Use different credentials for development and production
- Enable IP whitelisting in MongoDB Atlas for production

---

## 📚 API Documentation

### Public Endpoints

#### Listings

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/listings` | Display all listings | No |
| `GET` | `/listings/new` | Render create listing form | Yes |
| `POST` | `/listings` | Create new listing | Yes |
| `GET` | `/listings/:id` | View listing details | No |
| `GET` | `/listings/:id/edit` | Render edit form | Yes (Owner) |
| `PUT` | `/listings/:id` | Update listing | Yes (Owner) |
| `DELETE` | `/listings/:id` | Delete listing | Yes (Owner) |
| `GET` | `/listings/filter/:category` | Filter by category | No |
| `GET` | `/listings/search` | Search listings | No |
| `GET` | `/listings/:id/reservelisting` | Submit reservation request | Yes |

#### Reviews

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/listings/:id/reviews` | Add review to listing | Yes |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete review | Yes (Author) |

#### Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/signup` | Render signup form | No |
| `POST` | `/signup` | Create new account | No |
| `GET` | `/login` | Render login form | No |
| `POST` | `/login` | Authenticate user | No |
| `GET` | `/logout` | Terminate session | Yes |

#### System

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/` | Redirect to listings | No |
| `GET` | `/health` | Health check endpoint | No |

### Request Examples

#### Create Listing

```bash
curl -X POST http://localhost:8080/listings \
  -H "Content-Type: multipart/form-data" \
  -F "listing[title]=Modern Beach Villa" \
  -F "listing[description]=Luxury villa with ocean views" \
  -F "listing[price]=2500" \
  -F "listing[location]=Malibu" \
  -F "listing[country]=United States" \
  -F "listing[category]=Beach" \
  -F "listing[image]=@image.jpg" \
  --cookie "connect.sid=your-session-cookie"
```

#### Search Listings

```bash
curl "http://localhost:8080/listings/search?q=beach"
```

### Response Examples

#### Success Response (Listing)

```json
{
  "_id": "66567c2f75f84fe592f66168",
  "title": "Cozy Beachfront Cottage",
  "description": "Escape to this charming beachfront cottage...",
  "image": {
    "filename": "stayscape_DEV/qjqjlyldxwxw9qquteg0",
    "url": "https://res.cloudinary.com/dhawrroef/image/upload/v1716987958/..."
  },
  "price": 1500,
  "location": "Malibu",
  "country": "United States",
  "category": "Beach",
  "geometry": {
    "type": "Point",
    "coordinates": [-118.68517, 34.034378]
  }
}
```

#### Error Response

```json
{
  "statusCode": 400,
  "message": "Listing image is required."
}
```

---

## 🗄️ Database Design

### Data Models

#### Listing Model

```javascript
{
  title: String (required),
  description: String (required),
  image: {
    filename: String,
    url: String
  },
  price: Number (required),
  location: String (required),
  country: String (required),
  category: String (required),
  geometry: {
    type: String (enum: ["Point"], required),
    coordinates: [Number] (required)
  },
  reviews: [ObjectId (ref: "Review")],
  owner: ObjectId (ref: "User"),
  timestamps: true
}
```

#### Review Model

```javascript
{
  comment: String,
  rating: Number (min: 1, max: 5),
  createdAt: Date (default: Date.now),
  author: ObjectId (ref: "User")
}
```

#### User Model

```javascript
{
  username: String (required, unique, 3-30 chars, alphanumeric),
  email: String (required, unique, validated format),
  password: String (hashed by passport-local-mongoose),
  createdAt: Date (default: Date.now),
  timestamps: true
}
```

### Relationships

- **Listing → Reviews**: One-to-many (listing can have multiple reviews)
- **Listing → Owner**: Many-to-one (listing belongs to one user)
- **Review → Author**: Many-to-one (review written by one user)
- **User → Listings**: One-to-many (user can own multiple listings)
- **User → Reviews**: One-to-many (user can write multiple reviews)

### Database Indexes

```javascript
// User model indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Listing model (implicit indexes on _id)
// Review model (implicit indexes on _id, author)
```

### Post-Database Hooks

```javascript
// Delete reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
```

---

## 🔒 Security Implementation

### Authentication

#### Passport.js Configuration

```javascript
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

#### Session Security

```javascript
const sessionOptions = {
  store: MongoStore.create({ mongoUrl: dbUrl, touchAfter: 24 * 3600 }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  }
};
```

### Authorization

#### Middleware Guards

```javascript
// Authentication check
isLoggedIn: (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in!");
    return res.redirect("/login");
  }
  next();
}

// Ownership verification
isOwner: async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
```

### Password Handling

- **Hashing**: Automatic salt-hashing by passport-local-mongoose
- **Storage**: Only hashed passwords stored in database
- **Validation**: Minimum 6 characters required
- **Reset**: Password reset functionality not implemented (future enhancement)

### Token Management

- **Session Tokens**: HTTP-only cookies with 7-day expiration
- **CSRF Protection**: Method-override for PUT/DELETE requests
- **Session Storage**: MongoDB-backed with automatic cleanup

### Input Validation

#### Joi Validation Schemas

```javascript
// Listing validation
listingSchema: {
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  country: Joi.string().required(),
  category: Joi.string().required()
}

// User registration validation
signupSchema: {
  username: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}
```

### Web Security Headers

```javascript
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for Cloudinary compatibility
  crossOriginEmbedderPolicy: false
}));
```

---

## ⚡ Performance Optimizations

### Frontend Optimizations

1. **Image Optimization**
   - Lazy loading attribute on listing images
   - Cloudinary automatic format conversion (WEBP)
   - Responsive image sizing

2. **CSS Performance**
   - GPU-accelerated animations with `transform` and `opacity`
   - Custom scrollbars for better UX
   - CSS variables for efficient theming

3. **JavaScript Performance**
   - Event delegation for dynamic elements
   - Debounced scroll events
   - AOS library with intersection observer

### Backend Optimizations

1. **Database Performance**
   - Indexed fields on frequently queried attributes
   - Connection pooling via Mongoose
   - Lean queries for read operations

2. **Session Management**
   - MongoDB-backed session storage
   - Session touch after 24 hours to reduce writes
   - Automatic session cleanup

3. **API Efficiency**
   - Geocoding coordinates stored to reduce API calls
   - Pagination-ready query structure
   - Efficient population of related documents

---

## 🌐 Deployment Guide

### Render Deployment

StayScape is deployed using Render's PaaS platform with the following configuration:

#### render.yaml Configuration

```yaml
services:
  - type: web
    name: stayscape
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: ATLASDB_URL
        sync: false
      - key: SECRET
        generateValue: true
      - key: MAP_TOKEN
        sync: false
      - key: CLOUD_NAME
        sync: false
      - key: CLOUD_API_KEY
        sync: false
      - key: CLOUD_API_SECRET
        sync: false
```

#### Deployment Steps

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Web Service**
   - Log in to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`
   - Click "Create Web Service"

3. **Configure Environment Variables**
   - Navigate to your web service
   - Go to "Environment" tab
   - Add all required environment variables (see Environment Variables section)
   - Render auto-generates `SECRET` if configured

4. **Deploy and Monitor**
   - Render automatically builds and deploys
   - Monitor build logs in dashboard
   - Access your application at `https://stayscape-xxxx.onrender.com`

5. **Health Check**
   - The `/health` endpoint is available for monitoring
   - Returns `{ "status": "ok", "message": "Service is healthy" }`

#### Production Environment Setup

**Node.js Version**: Specified in `package.json` engines field:
```json
"engines": {
  "node": "20"
}
```

**Port Configuration**: Uses `PORT` environment variable or defaults to 8080.

**Database Configuration**: Production MongoDB Atlas connection string required.

**SSL/TLS**: Automatic SSL termination by Render.

### Alternative Deployment Platforms

The application can be deployed to any Node.js hosting platform:

- **Heroku**: Requires Procfile and buildpacks
- **Vercel**: Zero-config deployment for Express apps
- **AWS Elastic Beanstalk**: Scalable cloud deployment
- **DigitalOcean App Platform**: Simple PaaS solution
- **Self-hosted**: VPS with PM2 process manager

---

## 🏆 Challenges & Solutions

### Technical Challenges Solved

#### 1. Geocoding Integration

**Challenge**: Accurate location data for interactive maps.

**Solution**: Integrated Mapbox Geocoding API with automatic coordinate storage during listing creation. Implemented fallback to existing coordinates if geocoding fails.

```javascript
async function geocodeLocation(query) {
  const response = await geoCodingClient
    .forwardGeocode({ query, limit: 1 })
    .send();
  return response.body.features[0]?.geometry || null;
}
```

#### 2. Image Upload Management

**Challenge**: Secure, scalable image storage with format optimization.

**Solution**: Implemented Cloudinary integration with Multer, allowing automatic format conversion, compression, and CDN delivery.

```javascript
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stayscape_DEV",
    allowedFormats: ["png", "jpg", "jpeg", "webp"],
  },
});
```

#### 3. Session Persistence

**Challenge**: Reliable session storage across server restarts.

**Solution**: Configured MongoDB-backed session store with connect-mongo, ensuring sessions survive server restarts and scale horizontally.

```javascript
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});
```

#### 4. Search Functionality

**Challenge**: Multi-field search with different data types.

**Solution**: Implemented sequential search strategy trying title, category, country, location, and price with regex and numeric parsing.

```javascript
// Sequential search implementation
let allListings = await Listing.find({
  title: { $regex: input, $options: "i" }
});
// Fallback to category, country, location, price...
```

#### 5. Authentication Flow

**Challenge**: Secure authentication with automatic login after registration.

**Solution**: Used Passport.js with passport-local-mongoose, implementing `req.login()` after successful registration to establish session immediately.

```javascript
req.login(registeredUser, (err) => {
  if (err) return next(err);
  req.flash("success", "Account created successfully!");
  return res.redirect("/listings");
});
```

---

## 🚀 Future Enhancements

### Planned Features

#### Phase 1: Core Functionality
- [ ] **Booking System**: Implement real booking calendar with availability management
- [ ] **Payment Integration**: Stripe integration for secure payments
- [ ] **Email Notifications**: Real email notifications for bookings and messages
- [ ] **User Profiles**: Enhanced user profiles with profile pictures
- [ ] **Wishlist**: Save favorite listings to personal wishlist

#### Phase 2: Advanced Features
- [ ] **Advanced Search**: Date range search, guest count filters, amenity filters
- [ ] **Real-time Chat**: In-app messaging between hosts and guests
- [ ] **Reviews System**: Review responses from hosts, review helpfulness voting
- [ ] **Multi-image Support**: Upload multiple images per listing
- [ ] **Google Maps Integration**: Alternative map provider support

#### Phase 3: Platform Features
- [ ] **Host Dashboard**: Analytics dashboard for listing performance
- [ ] **Calendar Management**: Availability calendar with block dates
- [ ] **Pricing Rules**: Dynamic pricing based on demand and seasonality
- [ ] **Superhost Program**: Host achievement system
- [ ] **Verification System**: ID verification for hosts and guests

#### Phase 4: Technical Improvements
- [ ] **API Rate Limiting**: Advanced rate limiting by user tiers
- [ ] **Caching Layer**: Redis caching for frequently accessed data
- [ ] **CDN Integration**: Full CDN implementation for static assets
- [ ] **Search Engine Optimization**: Enhanced meta tags and sitemaps
- [ ] **Mobile Application**: React Native mobile app

---

## 💼 Developer Highlights

### Full-Stack Development Skills Demonstrated

#### Frontend Development
- **Template Engine**: EJS with partials, layouts, and component reusability
- **Responsive Design**: Mobile-first approach with Bootstrap 5 grid system
- **CSS Architecture**: CSS variables, custom properties, and design tokens
- **JavaScript**: Client-side validation, DOM manipulation, and event handling
- **Animation**: AOS library integration with custom CSS animations
- **Map Integration**: Mapbox GL JS for interactive geospatial visualizations

#### Backend Development
- **RESTful APIs**: Clean API design with Express.js routing
- **Authentication**: Passport.js implementation with local strategy
- **Session Management**: Secure session handling with MongoDB persistence
- **File Upload**: Multer integration with Cloudinary for scalable storage
- **Error Handling**: Custom error classes with try-catch wrappers
- **Middleware Pipeline**: Authentication, validation, and authorization middleware

#### Database Development
- **NoSQL Design**: MongoDB schema design with Mongoose ODM
- **Relationship Modeling**: ObjectId references and population
- **Geospatial Queries**: GeoJSON Point coordinates for location-based features
- **Data Validation**: Schema-level validation with custom validators
- **Indexing**: Strategic indexing for query optimization
- **Hooks**: Post-database hooks for cascade operations

### System Design Concepts Used

#### Architectural Patterns
- **MVC Architecture**: Separation of concerns with models, views, and controllers
- **Middleware Pattern**: Request processing pipeline with modular middleware
- **Repository Pattern**: Database access abstraction through Mongoose models
- **Strategy Pattern**: Passport authentication strategy implementation

#### Scalability Considerations
- **Stateless API Design**: Session-based authentication with persistence
- **Connection Pooling**: Mongoose connection management
- **CDN Integration**: Cloudinary for scalable image delivery
- **Database Indexing**: Query optimization through strategic indexes

### Security Best Practices

#### Authentication & Authorization
- **Password Hashing**: Automatic salt-hashing with bcrypt
- **Session Security**: HTTP-only, secure, sameSite cookies
- **CSRF Protection**: Method-override for safe form submissions
- **Rate Limiting**: API abuse prevention with express-rate-limit

#### Web Security
- **Security Headers**: Helmet.js for HTTP security headers
- **Input Validation**: Joi schema validation for all inputs
- **XSS Prevention**: EJS auto-escaping and CSP configuration
- **SQL Injection Prevention**: NoSQL architecture eliminates SQL injection

### Clean Architecture Practices

#### Code Organization
- **Separation of Concerns**: Clear separation between routes, controllers, and models
- **DRY Principle**: Reusable middleware functions and utility modules
- **Single Responsibility**: Each function and class has a single, well-defined purpose
- **Modular Design**: Component-based architecture for easy maintenance

#### Code Quality
- **Error Handling**: Consistent error handling with custom error classes
- **Validation**: Comprehensive input validation at multiple layers
- **Logging**: Structured logging for debugging and monitoring
- **Code Comments**: Clear documentation for complex logic

---

## 📊 Resume Impact

### Technical Skills Demonstrated

#### Core Competencies
- **Full-Stack JavaScript Development**: Proficiency in Node.js and modern JavaScript
- **Web Application Architecture**: Understanding of MVC, REST APIs, and microservices
- **Database Design**: Experience with NoSQL databases and schema design
- **Authentication & Security**: Implementation of secure authentication systems
- **API Integration**: Third-party API integration (Mapbox, Cloudinary)
- **Cloud Deployment**: Experience with PaaS deployment (Render)

#### Engineering Competencies
- **Problem-Solving**: Ability to troubleshoot complex technical issues
- **System Design**: Understanding of scalable system architecture
- **Best Practices**: Adherence to industry best practices and standards
- **Code Quality**: Focus on clean, maintainable, and well-documented code
- **Performance Optimization**: Experience with frontend and backend optimization
- **Security Awareness**: Understanding of web security vulnerabilities and mitigation

### Project Complexity

This project demonstrates the ability to:
- Build a production-grade application from scratch
- Integrate multiple third-party services seamlessly
- Implement complex business logic (booking, reviews, search)
- Handle edge cases and error scenarios gracefully
- Design intuitive user interfaces with modern UX patterns
- Deploy and maintain cloud-based applications

### Industry Relevance

StayScape showcases skills relevant to:
- **Full-Stack Development**: End-to-end application development
- **SaaS Products**: Building scalable software-as-a-service applications
- **E-commerce**: Product listing, search, and booking functionality
- **Geolocation Services**: Location-based features and mapping
- **Content Management**: CRUD operations and data management

---

## 📸 Screenshots

### Application Screenshots

> **Note**: Screenshots will be added to demonstrate the application's UI and features.
> 
> Key screenshots to include:
> - Landing page with hero section and search
> - Listings grid with category filters
> - Listing detail page with map and reviews
> - Create listing form with image upload
> - User authentication pages (login/signup)
> - Mobile responsive views

---

## 📄 License

This project is licensed under the ISC License.

```
Copyright (c) 2024 StayScape

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Author

**StayScape** was developed as a demonstration of full-stack web development capabilities, showcasing modern web technologies, security best practices, and clean architecture principles.

### Contact & Collaboration

For questions, suggestions, or collaboration opportunities, please reach out through the repository's issue tracker or contact channels.

### Acknowledgments

- **Inspiration**: This project was inspired by Airbnb's vacation rental platform
- **Libraries**: Built using excellent open-source libraries from the Node.js ecosystem
- **Design**: UI/UX inspired by modern web design trends and best practices

---

<div align="center">

**Built with ❤️ using modern web technologies**

</div>
