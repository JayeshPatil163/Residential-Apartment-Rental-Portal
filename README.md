# Residential-Apartment-Rental-Portal
Kots world Mini Project : Residential Apartment Rental Portal


# Residential Apartment Rental Portal – Backend

This repository contains the **backend implementation** for a Residential Apartment Rental Portal.  
The system allows users to browse apartments, view amenities, request bookings, and allows admins to manage units, amenities, and booking approvals.

Frontend (Angular) will be integrated in later phases.

---

## Tech Stack

- **Backend:** Python, Flask
- **Authentication:** JWT (flask-jwt-extended)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Containerization:** Docker, Docker Compose

---

## Features

### User Features
- User registration & login (JWT-based authentication)
- Browse apartment units
- View amenities associated with each unit
- Request bookings
- View booking status

### Admin Features
- Admin login
- Create and manage units
- Create and manage amenities
- Assign amenities to units
- Approve or reject booking requests

### System Features
- Role-based access control (USER / ADMIN)
- Secure password hashing
- Dockerized backend and database
- Optional seed data for quick setup

---

## Project Structure

backend/
├── app.py
├── config.py
├── extensions.py
├── auth/
├── admin/
├── bookings/
├── units/
├── amenities/
├── models/
├── utils/
├── seed.py
├── requirements.txt
└── Dockerfile

docker-compose.yml

yaml
Copy code

---

## Running the Backend with Docker

### Prerequisites
- Docker
- Docker Compose

### Start the backend
```bash
docker-compose up --build
Backend will be available at:

arduino
Copy code
http://localhost:5000
Health check:

bash
Copy code
GET /health
Database Setup (First Run Only)
Create database tables:

bash
Copy code
docker exec -it renteasy_backend python
python
Copy code
from app import create_app
from extensions import db

app = create_app()
with app.app_context():
    db.create_all()
Exit the shell once done.

Optional: Seed Demo Data
To quickly populate the database with demo data (admin user, units, amenities):

bash
Copy code
docker exec -it renteasy_backend python seed.py
Seeded Admin Credentials
makefile
Copy code
Email: admin@test.com
Password: admin123
Authentication Overview
JWT-based stateless authentication

Public registration creates USER role only

ADMIN users are created internally (seed / DB) to prevent privilege escalation

JWT contains user identity and role claims

API Overview (Backend)
Auth
POST /auth/register

POST /auth/login

Units
GET /units

Amenities
GET /amenities

POST /amenities (ADMIN)

Bookings
POST /bookings (USER)

GET /bookings (USER)

GET /admin/bookings (ADMIN)

POST /admin/bookings/{id}/approve (ADMIN)

Security Notes
Passwords are stored as secure hashes

Admin role cannot be assigned via public APIs

Role-based access enforced at API level

Frontend Integration (Planned)
Angular User Portal

Angular Admin Portal

API integration with this backend

UI for booking flow and admin management

README will be updated once frontend is integrated.

Author
Jayesh Patil