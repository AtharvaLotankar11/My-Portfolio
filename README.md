# 🚀 My Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Atharva_Lotankar-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, responsive portfolio website showcasing my projects, skills, and experience**

[Live Demo](#) • [Report Bug](https://github.com/AtharvaLotankar11/My-Portfolio/issues) • [Request Feature](https://github.com/AtharvaLotankar11/My-Portfolio/issues)

</div>

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and attractive design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🔥 **Firebase Integration** - Real-time data management and authentication
- 📧 **Contact Form** - Integrated email functionality with Nodemailer
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🌐 **RESTful API** - Backend API for handling requests

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5.2** - Web framework
- **Firebase Admin SDK** - Backend Firebase integration
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📂 Project Structure

```
My-Portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── About.jsx
│   │   │   ├── Auth/
│   │   │   ├── Certifications.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MessageMe.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Skills.jsx
│   │   ├── assets/          # Images and static files
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── firebase.js      # Firebase config
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   ├── firebase.js      # Firebase Admin config
│   │   └── nodemailer.js    # Email config
│   ├── routes/              # API routes
│   ├── server.js            # Express server
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Gmail account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AtharvaLotankar11/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure Environment Variables**

   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000

   # Firebase Admin SDK Configuration
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_CERT_URL=your_cert_url

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM="Your Name <noreply@yourdomain.com>"
   ```

   Create `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/auth

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   App will run on `http://localhost:5173`

### Building for Production

```bash
cd frontend
npm run build
```

The optimized build will be in the `frontend/dist` directory.

---

## 📧 Email Configuration

To enable the contact form:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the generated password in `EMAIL_PASS` environment variable

---

## 🔥 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (if needed)
3. Create a Firestore database (if needed)
4. Download the service account key for Admin SDK
5. Copy the configuration values to your `.env` files

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Atharva Lotankar**

- GitHub: [@AtharvaLotankar11](https://github.com/AtharvaLotankar11)
- Email: atharvalotankar11@gmail.com

---

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

<div align="center">
  <p>Made with ❤️ by Atharva Lotankar</p>
</div>
