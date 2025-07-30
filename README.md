# E-Learning Backend

A comprehensive Node.js backend API for an e-learning platform that handles user authentication, course management, progress tracking, and payment processing.

## 🚀 Features

### User Management
- User registration with email verification
- Secure login/logout with token-based authentication
- Password hashing with SHA-256
- User profile updates (email, username, password)
- Account deletion

### Course Management
- Course enrollment and unenrollment
- Course content delivery with modules and sub-modules
- Progress tracking for individual modules and courses
- Course completion status

### Email Services
- Welcome emails for new users
- Email verification system
- Contact form handling
- Account update notifications

### Payment Integration
- Stripe payment processing
- Checkout session creation
- Payment status tracking

### Security Features
- Rate limiting 
- CORS protection
- Helmet security headers
- Input sanitization to prevent XSS attacks
- Password salting and hashing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: Token-based (custom implementation)
- **Email**: Nodemailer
- **Payment**: Stripe
- **Security**: Helmet, CORS, express-rate-limit, sanitize-html
- **Password Hashing**: SHA-256

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Stripe account (for payment processing)
- Email service provider (SMTP)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd e-learning-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_LOCALHOST=localhost
   DB_LOCALUSER=your_db_user
   DB_LOCALPASSWORD=your_db_password
   DB_LOCALDATABASE=my-elearning

   # Email Configuration
   EMAIL_HOST=your_smtp_host
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password

   # Stripe Configuration
   STRIPE_PRIVATE_KEY=your_stripe_private_key

   # Server Configuration
   PORT=6001
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```



