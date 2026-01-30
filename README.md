# Residential-Apartment-Rental-Portal
Kots world Mini Project : Residential Apartment Rental Portal

# Overview

This repository contains the **full stack implementation** for a Residential Apartment Rental Portal.  
The system allows users to browse apartments, view amenities, request bookings, and allows admins to manage units, amenities, and booking approvals.

The project is divided into two main components:
- **Backend:** A Flask (Python) API handling database operations, authentication, and business logic.
- **Frontend:** An Angular 19+ Single Page Application (SPA) providing a responsive user interface.

---

## Tech Stack

### Backend
- **Language:** Python, Flask
- **Authentication:** JWT (flask-jwt-extended)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Containerization:** Docker, Docker Compose

### Frontend
- **Framework:** Angular 19+
- **Language:** TypeScript
- **Styling:** CSS (Custom Properties / Variables), Responsive Grid Layouts
- **State Management:** RxJS (Observables)
- **Tooling:** Angular CLI, Vitest

---

## Features

### User Features
- **Authentication:** Secure Registration & Login (JWT)
- **Browse Units:** View available apartments with pricing and details
- **My Bookings:** Tenant dashboard to view lease status (Pending, Approved, Declined)

### Admin Features
- **Dashboard:** System overview
- **Unit Management:** Add, edit, and list apartment units
- **Tower Management:** Organize units by towers
- **Amenity Management:** Create and manage building amenities
- **Lease Management:** Approve or decline booking requests

### System Features
- Role-based access control (USER / ADMIN)
- Secure password hashing
- Dockerized backend environment
- Modern, responsive UI design

---

## Project Structure

```
RentEasy/
├── Backend/                 # Python Flask API
│   ├── app.py
│   ├── auth/
│   ├── admin/
│   ├── bookings/
│   ├── units/
│   ├── amenities/
│   ├── models/
│   ├── seed.py
│   └── Dockerfile
│
├── Frontend/                # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/      # Route components (Login, Units, Dashboard)
│   │   │   ├── components/ # Reusable UI (Navbar, Cards)
│   │   │   ├── services/   # HTTP Services
│   └── package.json
│
└── docker-compose.yml       # Orchestration
```

---

## Getting Started

### 1. Backend Setup (Docker)

**Prerequisites:** Docker, Docker Compose

Start the backend and database:
```bash
docker-compose up --build
```
Backend will be available at: `http://localhost:5001`

**Database Setup (First Run Only):**
```bash
docker exec -it renteasy_backend python

from app import create_app
from extensions import db

app = create_app()
with app.app_context():
    db.create_all()
```
Exit the shell.

**Optional: Seed Data:**
Populate with demo data (Admin user, towers, units):
```bash
docker exec -it renteasy_backend python seed.py
```
*seed credentials: admin@test.com / admin123*

### 2. Frontend Setup (Angular)

**Prerequisites:** Node.js (v18+), NPM

Open a new terminal and navigate to the **Frontend** directory:
```bash
cd Frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```
Frontend will be available at: `http://localhost:4200`

---

## API Overview

### Auth
`POST /auth/register` - Register new user  
`POST /auth/login` - Login and get JWT

### Units & Towers
`GET /units` - List all units  
`GET /towers` - List all towers

### Bookings
`POST /bookings` - Request to book a unit  
`GET /bookings` - Get user's bookings  
`GET /admin/bookings` - (Admin) View all requests
`POST /admin/bookings/{id}/approve` - (Admin) Approve booking

---

## Security Notes
- Passwords are stored as secure hashes (pbkdf2)
- JWT tokens are required for protected routes
- Role-based access control enforced on API endpoints

# Author
Jayesh Patil