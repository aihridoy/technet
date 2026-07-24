# Tech Net - Watch E-commerce Platform

A modern e-commerce platform for watches featuring Haylou, Apple, Samsung, Garmin, Casio, Seiko, and more. Built with React, Redux Toolkit, TypeScript, and Tailwind CSS on the frontend, powered by Express.js and MongoDB on the backend.

## Live Demo

- [Frontend (Netlify)](https://awesometechnet.netlify.app)
- [Backend (Render)](https://technet-server-r79t.onrender.com)

## Features

### Shopping Experience
- 61+ watch products across 11 categories
- Infinite scrolling product catalog with Intersection Observer
- Advanced filters: category, price range, availability, rating
- Responsive design for mobile, tablet, and desktop

### Product Pages
- Modern product detail page with image zoom and hover effects
- Star rating display with half-star support
- Quantity selector and add to cart
- Wishlist and share buttons
- Trust badges (free shipping, warranty, returns)

### User Features
- Google authentication via Firebase
- Order history with PDF export (single order or all orders)
- User profile with purchase stats

### Admin Features
- Admin dashboard for order management
- Order status updates
- Product management

## Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit + RTK Query
- Vite
- Tailwind CSS
- Radix UI
- React Router v6
- Lucide React icons
- Framer Motion
- pdf-lib (PDF generation)

### Backend
- Node.js + Express.js
- MongoDB (native driver)
- Firebase Admin SDK (token verification)
- JWKS-RSA (JWT validation)

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
- Git

### Installation

```bash
# Clone the client repo
git clone https://github.com/aihridoy/technet-react-redux.git
cd technet-react-redux
npm install

# Clone the server repo (in a separate directory)
git clone https://github.com/aihridoy/technet-server.git
cd technet-server
npm install
```

### Environment Variables

**Client** (create `.env` in root):

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Server** (create `.env` in root):

```env
DB_USER=your_db_username
DB_PASS=your_db_password
FIREBASE_PROJECT_ID=your_firebase_project_id
PORT=8000
```

### Running Locally

```bash
# Start server (in technet-server directory)
npm run dev

# Start client (in technet-react-redux directory)
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:8000

### Seed Database

```bash
# In technet-server directory
node scripts/seed.js --force
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get paginated products (`?page=1&limit=12`) |
| GET | `/api/product/:id` | Get single product |
| POST | `/api/product` | Add product (admin) |
| PATCH | `/api/product/:id` | Update product (admin) |
| DELETE | `/api/product/:id` | Delete product (admin) |
| GET | `/api/product/:id/reviews` | Get product reviews |
| POST | `/api/product/:id/reviews` | Add review |
| GET | `/api/search?name=` | Search products |
| POST | `/api/order` | Create order |
| GET | `/api/orders` | Get all orders (admin) |
| GET | `/api/orders/mine` | Get user orders (auth) |
| PATCH | `/api/order/:id/status` | Update order status (admin) |
| GET | `/api/health` | Health check |

## Project Structure

```
technet-react-redux/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/           # Radix UI components
│   ├── lib/              # Utilities (firebase, pdf generation)
│   ├── pages/            # Page components
│   ├── redux/            # Redux store, slices, API
│   ├── types/            # TypeScript types
│   └── App.tsx
├── public/
├── package.json
└── vite.config.ts

technet-server/
├── controllers/          # Route handlers
├── middleware/            # Auth, admin middleware
├── models/               # MongoDB models
├── routes/               # Express routes
├── scripts/              # Seed script
├── utils/                # DB connection, config
├── app.js
└── index.js
```

## Deployment

### Client (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`

### Server (Render)
- Build command: `npm install`
- Start command: `node index.js`
- Set environment variables in Render dashboard

## License

MIT
