# 🚀 PolicyPilot - Policy Management System

A comprehensive, production-ready policy management system built with modern web technologies. Manage clients, categories, and policies with real-time analytics, multi-user support, and secure authentication.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based auth system
- **Multi-user Data Isolation** - Each user sees only their own data
- **Password Hashing** - Bcrypt encryption for password security
- **Protected Routes** - Middleware-based route protection
- **Authorization Checks** - Ownership verification on all CRUD operations

### 📊 Dashboard Analytics
- **Real-time Statistics** - Live policy and client metrics
- **Interactive Charts** - Visual data representation
- **Policy Status Tracking** - Active, expiring, and expired policies
- **Category Insights** - Breakdown by policy categories
- **Client Engagement Metrics** - Track client-policy relationships

### 👥 Client Management
- **CRUD Operations** - Create, read, update, delete clients
- **Contact Information** - Store client details (name, email, phone)
- **Policy Association** - View all policies linked to each client
- **Search & Filter** - Quick client lookup
- **Responsive Tables** - Mobile-friendly data tables

### 📁 Category Management
- **Custom Categories** - Create policy categories
- **Visual Cards** - Grid layout with category cards
- **Edit & Delete** - Manage categories easily
- **Policy Count** - See policies per category
- **Color-coded UI** - Beautiful category display

### 📋 Policy Management
- **Comprehensive Details** - Policy name, number, amount, dates
- **Client & Category Links** - Associated data relationships
- **Date Tracking** - Issue and expiry date management
- **Status Indicators** - Visual status badges
- **Advanced Filtering** - Filter by client or category
- **Expiry Alerts** - Automatic expiration warnings

### 🎨 UI/UX Excellence
- **Modern Design** - Clean, professional interface
- **Gradient Themes** - Beautiful color schemes
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Skeleton loaders for better UX
- **Responsive Design** - Works on all devices
- **Toast Notifications** - User feedback for actions
- **Error Boundaries** - Graceful error handling

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript 5.7.3](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[date-fns](https://date-fns.org/)** - Date manipulation
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js 4.18.2](https://expressjs.com/)** - Web framework
- **[MongoDB 7.0](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM
- **[JWT](https://jwt.io/)** - Authentication tokens
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[Express Validator](https://express-validator.github.io/)** - Input validation
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin support

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **MongoDB** 7.0 or higher (local or Atlas)
- **pnpm** (or npm/yarn)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/psgpraveen/policypilot.git
cd policypilot
```

2. **Install frontend dependencies**
```bash
pnpm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Setup environment variables**

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/policypilot
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
```

Create `.env.local` (root):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Start the backend server**
```bash
cd backend
node server.js
```

7. **Start the frontend (in new terminal)**
```bash
pnpm run dev
```

8. **Open your browser**
```
http://localhost:3000
```

---

## 📖 Usage

1. **Sign Up** - Create account at `/signup`
2. **Login** - Access dashboard at `/login`
3. **Dashboard** - View analytics and statistics
4. **Manage Clients** - Add/edit/delete clients
5. **Manage Categories** - Organize policy types
6. **Manage Policies** - Track all policies with details

---

## 👨‍💻 Developer

**Praveen Kumar Gupta**  
Full Stack Developer | Technophile | Mechatronician | Innovator | Automator

- 🌐 Portfolio: [psgpraveen.me](https://psgpraveen.me)
- 📧 Email: [psgpraveen0804@gmail.com](mailto:psgpraveen0804@gmail.com)
- 📱 Phone: [+91 7985942726](tel:+917985942726)
- 💼 GitHub: [@psgpraveen](https://github.com/psgpraveen)
- 🔗 LinkedIn: [psgpraveen](https://www.linkedin.com/in/psgpraveen)

### Featured Projects
- 🔗 **[Linktree Clone](https://linktree-psgpraveen.vercel.app/)** - Responsive link aggregator with animations
- 📧 **[Bulk Email Sender](https://bulkemails.vercel.app/)** - Email automation with analytics
- 📝 **[Form Builder](https://forms-creater.vercel.app/)** - Drag-and-drop form creator
- 🤖 **[Robotic Arm](https://psgpraveen.me/ROBO)** - IoT robotic control system
- 💡 **[Smart Street Light](https://psgpraveen.me/Ldr)** - Automated energy-efficient lighting

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [MongoDB](https://www.mongodb.com/) - NoSQL database

---

**Made with ❤️ by [Praveen Kumar Gupta](https://psgpraveen.me)**

*Last Updated: November 30, 2025*
