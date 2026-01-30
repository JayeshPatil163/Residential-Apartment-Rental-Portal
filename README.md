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

**Demo credentials for admin and user:**\
**seed Admin credentials:** `Username: admin@test.com / Password: admin123`\
**seed User credentials:** `Username: user@test.com / Password: user123`



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

## Screenshots

### Login
<img width="684" height="647" alt="login" src="https://github.com/user-attachments/assets/59f73821-5443-4958-a498-ef27d9ed5981" />

### Register
<img width="695" height="703" alt="register" src="https://github.com/user-attachments/assets/d0e872f6-c3ef-4257-a6bb-aa9a2d8fd9c3" />



## Admin
### Dashboard
<img width="1710" height="985" alt="Dashboard" src="https://github.com/user-attachments/assets/b7943637-b275-48d3-bcbc-032c5f3c4d0e" />


### Manage Units
<img width="1710" height="984" alt="Admin units" src="https://github.com/user-attachments/assets/62c9afc2-578f-49bc-ba17-7647cf27b625" />


### Manage Bookings
<img width="1710" height="983" alt="Admin bookings" src="https://github.com/user-attachments/assets/24fa12b8-59b7-475a-b0d7-349ffa019589" />


### Manage Amenities
<img width="1710" height="985" alt="Admin aminities" src="https://github.com/user-attachments/assets/f34b724b-5bb8-4bb2-b75f-3ebb5934055d" />


### Manage Towers
<img width="1710" height="985" alt="Admin towers" src="https://github.com/user-attachments/assets/694c5e7b-5eba-4285-aae1-dbb2966fcf8d" />


### Manage Tenants
<img width="1710" height="984" alt="admin tenants" src="https://github.com/user-attachments/assets/ea250b6a-bec8-402a-b638-59d8ddd3bcb2" />




## Public User
### Units Available
<img width="1710" height="1073" alt="units" src="https://github.com/user-attachments/assets/1d3447a2-8664-452b-afc9-fdcc13b8e503" />


### Units Booked
<img width="1710" height="1072" alt="units booked" src="https://github.com/user-attachments/assets/fafd860a-2d24-4383-be6b-88954dd676b3" />


### Bookings
<img width="1710" height="1072" alt="My-bookings" src="https://github.com/user-attachments/assets/7bf728cc-019f-42c7-8537-19c00d21160d" />



---

## Security Notes
- Passwords are stored as secure hashes (pbkdf2)
- JWT tokens are required for protected routes
- Role-based access control enforced on API endpoints

# Author
Jayesh Patil
