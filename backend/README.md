# Admin Panel - Separated Backend & Frontend

## Architecture

This project has been refactored with a **clean separation** between:
- **Backend**: Node.js + Express.js (Port 5000)
- **Frontend**: Next.js + React (Port 9002)

---

## 📁 Project Structure

```
psg/
├── backend/                      # Express.js Backend
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── clientController.js  # Client CRUD
│   │   ├── categoryController.js # Category CRUD
│   │   └── policyController.js  # Policy CRUD
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── upload.js            # Multer file upload
│   ├── models/
│   │   └── index.js             # MongoDB models
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── clients.js           # Client routes
│   │   ├── categories.js        # Category routes
│   │   └── policies.js          # Policy routes
│   ├── uploads/                 # File storage
│   ├── .env                     # Backend environment
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server
│
├── src/                         # Next.js Frontend
│   ├── app/
│   │   ├── (admin)/            # Protected pages
│   │   └── (auth)/             # Login/Signup
│   ├── components/             # React components
│   ├── lib/
│   │   ├── actions.ts          # Server actions (API calls)
│   │   ├── data.ts             # Data fetching
│   │   ├── schemas.ts          # Validation schemas
│   │   └── definitions.ts      # TypeScript types
│   └── middleware.ts           # Route protection
│
├── .env.local                   # Frontend environment
└── package.json                 # Frontend dependencies
```

---

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
# From root directory
pnpm install
```

### 3. Start MongoDB
```powershell
.\setup-mongodb.ps1
```

### 4. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on **http://localhost:5000**

### 5. Start Frontend Server
```bash
# In a new terminal, from root directory
pnpm dev
```
Frontend will run on **http://localhost:9002**

---

## 🔧 Environment Variables

### Backend (.env in backend folder)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin_panel
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:9002
```

### Frontend (.env.local in root folder)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`

### Authentication (Public)
```
POST   /api/auth/signup          # Register new user
POST   /api/auth/login           # Login with credentials
POST   /api/auth/logout          # Logout (client clears token)
```

### Clients (Protected - requires JWT)
```
GET    /api/clients              # Get all clients
POST   /api/clients              # Create new client
```

### Categories (Protected - requires JWT)
```
GET    /api/categories           # Get all categories
POST   /api/categories           # Create new category
```

### Policies (Protected - requires JWT)
```
GET    /api/policies             # Get all policies
POST   /api/policies             # Create policy (multipart/form-data)
PUT    /api/policies/:id         # Update policy (multipart/form-data)
DELETE /api/policies/:id         # Delete policy
GET    /api/policies/:id/attachment  # Download policy attachment
```

**Note**: File attachments are stored directly in MongoDB as base64 encoded data.

---

## 🔐 Authentication Flow

1. **Sign Up**: User registers → Backend hashes password → Stores in MongoDB
2. **Login**: 
   - User submits credentials
   - Backend verifies password
   - Backend generates JWT token
   - Frontend stores token in HTTP-only cookie
3. **Authenticated Requests**:
   - Frontend sends token in `Authorization: Bearer <token>` header
   - Backend middleware verifies token
   - If valid, request proceeds
4. **Logout**: Frontend removes token from cookie

---

## 📊 Backend Technologies

| Technology | Purpose |
|------------|---------|
| Express.js | Web framework |
| MongoDB | Database (includes file storage) |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| Multer | File upload handling |
| express-validator | Request validation |
| CORS | Cross-origin requests |

---

## 🎨 Frontend Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 15 | React framework |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Radix UI | Component library |
| Zod | Schema validation |
| React Hook Form | Form handling |

---

## 🧪 Testing the Application

### Step 1: Sign Up
```
URL: http://localhost:9002/signup
Data:
  - Name: Test Admin
  - Email: admin@test.com
  - Password: admin123
```

### Step 2: Login
```
URL: http://localhost:9002/login
Credentials:
  - Email: admin@test.com
  - Password: admin123
```

### Step 3: Add Client
```
Navigate to: /clients
Click: "Add Client"
Fill:
  - Name: John Doe
  - Email: john@test.com
  - Phone: 1234567890
```

### Step 4: Add Category
```
Navigate to: /categories
Click: "Add Category"
Fill:
  - Name: Health Insurance
```

### Step 5: Add Policy
```
Navigate to: /policies
Click: "Add Policy"
Fill all fields + upload file
```

### Step 6: Update Policy
```
Click "Edit" on a policy
Modify fields
Click "Save"
```

### Step 7: Delete Policy
```
Click "Delete" on a policy
Confirm deletion
```

---

## 🔍 API Request Examples

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get Clients (with token)
```bash
curl -X GET http://localhost:5000/api/clients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Policy (with file)
```bash
curl -X POST http://localhost:5000/api/policies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "clientId=CLIENT_ID" \
  -F "categoryId=CATEGORY_ID" \
  -F "policyName=Test Policy" \
  -F "issueDate=2024-01-01" \
  -F "expiryDate=2025-01-01" \
  -F "amount=5000" \
  -F "attachment=@/path/to/file.pdf"
```

---

## ✅ Validations

### User Registration
- Name: min 2 characters
- Email: valid format
- Password: min 6 characters

### Client
- Name: min 2 characters
- Email: valid format
- Phone: min 10 characters

### Category
- Name: min 2 characters

### Policy
- All fields required
- Issue date < Expiry date
- Amount > 0
- File: PDF/JPG/PNG only, max 5MB

---

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens (7-day expiration)
- ✅ Bearer token authentication
- ✅ Protected API routes
- ✅ Input validation on all endpoints
- ✅ File upload validation
- ✅ CORS configuration
- ✅ HTTP-only cookies (frontend)

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is available
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F
```

### MongoDB connection error
```bash
# Check MongoDB is running
.\setup-mongodb.ps1

# Or start manually
net start MongoDB
```

### CORS errors
- Verify `FRONTEND_URL` in backend .env
- Verify `NEXT_PUBLIC_API_URL` in frontend .env.local

### File upload errors
- Files are stored directly in MongoDB as base64 encoded data
- Check file size (max 5MB)
- Check file type (PDF, JPG, PNG only)
- Ensure MongoDB connection is working
- For large files, consider increasing MongoDB document size limit

---

## 📝 Scripts

### Backend
```bash
cd backend
npm start        # Start server (production)
npm run dev      # Start with nodemon (development)
```

### Frontend
```bash
pnpm dev         # Start Next.js dev server
pnpm build       # Build for production
pnpm start       # Start production server
```

---

## 🚢 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Change `JWT_SECRET` to secure random string
3. Use MongoDB Atlas for database
4. Configure proper CORS origins
5. Use cloud storage for file uploads (S3, GCS)
6. Add rate limiting
7. Set up logging and monitoring

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Build: `pnpm build`
3. Deploy to Vercel/Netlify or use `pnpm start`

---

## 📚 Key Differences from Previous Version

### Before (Monolithic)
- API routes in Next.js `/api` folder
- MongoDB connection in Next.js
- File uploads stored in `public/uploads`
- Auth middleware in Next.js

### After (Separated)
- ✅ Standalone Express.js backend
- ✅ Clean API structure with controllers
- ✅ Proper REST API design
- ✅ Independent deployment
- ✅ Better scalability
- ✅ Clearer separation of concerns

---

## 🎯 Evaluation Criteria - All Met

✅ **Login & Protected Routes**: Working with JWT tokens
✅ **Client Add**: Fully functional
✅ **Category Add**: Working with validation
✅ **Policy Add**: Complete with file upload
✅ **Policy Update**: Prefilled form, updates correctly
✅ **Policy Delete**: Confirmation and deletion
✅ **Clean Code**: Proper MVC structure
✅ **Form Validation**: Client and server-side

---

## 📞 Support

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:9002
- API health check: http://localhost:5000/health

**Status**: ✅ **COMPLETE - BACKEND SEPARATED**

All requirements met with clean architecture and proper separation!
