# AdCraft AI Backend

Backend API for authentication and multi-tenant (company) data isolation using SQLite + Sequelize.

## Features

- Multi-tenant company isolation (each company only sees its own data)
- User Signup/Registration (assign or create company on signup)
- User Login with JWT authentication
- Password hashing with bcrypt
- SQLite (file-based) database via Sequelize (no external DB install needed)
- Protected routes with JWT middleware
- Sample tenant-scoped Campaign CRUD endpoints
- Input validation & consistent error handling

## Installation

1. Install dependencies:
```bash
npm install
```
2. Configure environment variables in `.env`:
```
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
DB_PATH=./database.sqlite
```
3. (MongoDB no longer required – using SQLite file `./database.sqlite`)
4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

#### 1. Signup (Create user + company)
- **URL**: `POST /api/auth/signup`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "companyName": "Acme"   // If company exists, user is added; else company is created
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "company": { "id": 1, "name": "Acme" },
    "createdAt": "2025-11-11T..."
  }
}
```

#### 2. Login
- **URL**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLogin": "2025-11-11T...",
    "company": { "id": 1, "name": "Acme" }
  }
}
```

#### 3. Get Current User Profile
- **URL**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response** (200):
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-11-11T...",
    "lastLogin": "2025-11-11T...",
    "company": { "id": 1, "name": "Acme" }
  }
}
```

#### 4. Logout
- **URL**: `POST /api/auth/logout`
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Campaign Routes (Tenant-Scoped)
All routes require `Authorization: Bearer <token>` and are scoped to your company.

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/campaigns` | List campaigns for your company |
| POST | `/api/campaigns` | Create a campaign |
| GET | `/api/campaigns/:id` | Get a single campaign (must belong to company) |
| PUT | `/api/campaigns/:id` | Update a campaign |
| DELETE | `/api/campaigns/:id` | Delete a campaign |

#### Create Campaign
```json
{
  "name": "Holiday Promo",
  "objective": "Increase seasonal sales",
  "budget": 5000
}
```

### Company Routes (Admin Only)
All routes require `Authorization: Bearer <token>` and `company_admin` or `admin` role.

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/companies/me` | Get current user's company info + user count |
| GET | `/api/companies/users` | List all users in your company |
| POST | `/api/companies/invite` | Invite a new user (returns temp password) |
| PUT | `/api/companies/promote/:userId` | Promote a user to company_admin |

#### Invite User
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```
Response includes `tempPassword` (in production, send via email instead).

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── campaignController.js  # Campaign CRUD logic
│   └── companyController.js   # Company admin actions
├── middleware/
│   └── auth.js                # JWT verification middleware (adds req.companyId)
├── models/
│   ├── User.js                # User model (includes companyId FK, roles: user, company_admin, admin)
│   ├── Company.js             # Company/Tenant model
│   └── Campaign.js            # Tenant-scoped resource
├── routes/
│   ├── auth.js                # Authentication routes
│   ├── campaigns.js           # Campaign routes (tenant-scoped)
│   └── companies.js           # Company management routes (admin)
├── scripts/
│   └── seed.js                # Seed sample data with admin users
├── server.js                  # Main server file & associations
└── package.json               # Dependencies
```

## Dependencies

- **express**: Web framework
- **sequelize**: ORM for SQLite
- **sqlite3**: File-based DB driver
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **validator**: Input validation
- **nodemon**: Development server (dev dependency)

## Testing with cURL

### Signup (with company):
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","companyName":"Acme"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile (replace YOUR_TOKEN):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Campaign:
```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Holiday Promo","objective":"Increase seasonal sales","budget":5000}'
```

### List Campaigns:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/campaigns
```

## Security Features

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Password field excluded from JSON serialization
- Input validation for email format and password length
- Protected routes require valid JWT token
- Tenant ownership enforced on campaign resources

## Multi-Tenancy Overview
Users belong to a company (`User.companyId`). All tenant data filters by this key. Controllers enforce ownership both by query filtering and by validating resource `companyId` matches `req.companyId`.

**Roles:**
- `user` – Standard user within a company (can manage own campaigns)
- `company_admin` – Can invite users and promote others within the same company
- `admin` – Global admin (future: cross-company access)

**Company Enforcement:**
- New users **must** provide `companyName` on signup or be invited by a `company_admin`.
- Login is blocked if user has no `companyId` assigned.
- Model hook prevents creating users without a company going forward.

### Data Isolation Guarantee
Users from another company cannot access or modify your company's campaigns. Unauthorized access returns 404 (resource not found) to avoid information leakage.

## Next Steps / Hardening
- ✅ Enforce non-null `companyId` for all users (implemented via model hook)
- ✅ Add company admin role & invitations (implemented)
- Add pagination & indexing for large datasets
- Add password reset & invitation token flows (replace temp passwords)
- Consider per-tenant DB or schema if isolation/security requirements grow

---
Legacy MongoDB documentation removed; current implementation uses SQLite.

## Notes
- Change `JWT_SECRET` in production.
- Server runs on port 5000 by default.
- SQLite file (`database.sqlite`) is created automatically.

## Seeding & Quick Tenant Test
Run the seed script (after starting the server in another terminal) to create sample companies, users, and campaigns and print ready-to-use JWTs:
```bash
npm run seed
```
Use a printed token to list campaigns for its company:
```bash
curl -H "Authorization: Bearer <TOKEN_FROM_SEED>" http://localhost:5000/api/campaigns
```
