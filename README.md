# FADDLmatch - Islamic Matrimonial Platform

<div align="center">

![FADDLmatch Logo](./public/faddl-logo.jpeg)

🌟 **"A fresh start"** - A respectful, Islamic matrimonial platform designed for divorced and widowed Muslims seeking meaningful remarriage with family involvement and Islamic values at the center.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Coming_Soon-amber.svg)](https://faddlmatch-matrimonial.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/nicholsmindset/faddlmatch-matrimonial)
[![Built with Next.js](https://img.shields.io/badge/Built_with-Next.js_14-000000?logo=next.js)](https://nextjs.org)

</div>

## 🎯 Vision & Mission

**FADDLmatch** serves the unique needs of **divorced and widowed Muslims** in Singapore and Southeast Asia, providing a dignified platform for those seeking a second chance at love within Islamic guidelines.

### 🌍 Target Audience
- Previously married Muslim men and women (divorced/widowed)
- Seeking halal, intention-based matrimonial connections
- Values family involvement and Islamic principles
- Primary focus: Singapore & Southeast Asia

---

## ✨ Core Islamic Features

### 🕌 **Islamic Values First**
- **Respect & Dignity**: Built with Islamic ethics and cultural sensitivity
- **Family Involvement**: Optional Wali (guardian) integration and supervision
- **Serious Intentions**: Focus exclusively on marriage-minded connections
- **Halal Communication**: Islamic communication guidelines and moderation

### 🔒 **Privacy & Modesty Controls**
- **Blurred Photos**: Profile photos blurred until mutual interest or admin approval
- **Multiple Privacy Levels**: Control who sees your photos, location, and contact info
- **Secure Communication**: Private messaging with Islamic guidelines
- **No Swiping Culture**: Thoughtful connection over superficial browsing

### 👨‍👩‍👧‍👦 **Family & Community Features**
- **Wali Integration**: Optional guardian involvement in the process
- **Community Moderation**: Manual profile review for authenticity
- **Cultural Sensitivity**: Designed with Southeast Asian Muslim culture in mind
- **Values-Based Matching**: Personality and values-based compatibility system

---

## 🔥 Technical Features

### 🚀 **Core Functionality**
- **User Authentication**: Secure NextAuth.js with email/password and OAuth
- **Profile Management**: Comprehensive Islamic-focused profile creation
- **Photo Upload & Management**: Cloudinary integration with approval system
- **Real-time Messaging**: Pusher-powered instant messaging
- **Advanced Search & Filtering**: Age, location, values-based filtering
- **Like System**: Express interest with mutual matching

### 📱 **User Experience**
- **Mobile-Responsive Design**: Perfect experience across all devices
- **Interactive FAQ Section**: Comprehensive help system
- **Professional UI/UX**: NextUI components with golden brand theme
- **Smooth Animations**: Framer Motion for delightful interactions
- **Accessibility**: WCAG compliant design

### 🛡️ **Security & Quality**
- **Error Monitoring**: Sentry integration for production stability
- **Email Notifications**: Resend service for verification and notifications
- **Form Validation**: Zod schema validation throughout
- **Type Safety**: Full TypeScript implementation
- **Data Protection**: Secure handling of sensitive user information

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://typescriptlang.org) for type safety
- **UI Library**: [NextUI](https://nextui.org) + [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://framer.com/motion)
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Icons**: [Heroicons](https://heroicons.com)

### **Backend & Database**
- **Database ORM**: [Prisma](https://prisma.io) with SQLite/PostgreSQL support
- **Authentication**: [NextAuth.js v5](https://authjs.dev)
- **API Routes**: Next.js API routes with TypeScript

### **Integrations & Services**
- **Real-time Messaging**: [Pusher](https://pusher.com)
- **Image Storage**: [Cloudinary](https://cloudinary.com)
- **Email Service**: [Resend](https://resend.com)
- **Error Monitoring**: [Sentry](https://sentry.io)
- **Deployment**: [Vercel](https://vercel.com)

### **Development Tools**
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky for pre-commit checks
- **Environment**: Node.js v18+

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Database**: PostgreSQL (production) or SQLite (development)
- **External Services**: Accounts for Cloudinary, Pusher, Resend, Sentry

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicholsmindset/faddlmatch-matrimonial.git
   cd faddlmatch-matrimonial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Update .env.local with your configuration
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🔑 Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/faddlmatch"

# Authentication
AUTH_SECRET="your-secret-key-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (Image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Pusher (Real-time messaging)
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-cluster"

# Resend (Email service)
RESEND_API_KEY="your-resend-api-key"

# Sentry (Error monitoring)
SENTRY_DSN="your-sentry-dsn"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 📊 Project Structure

```
faddlmatch-matrimonial/
├── 📁 prisma/                 # Database schema & migrations
├── 📁 public/                 # Static assets & images
├── 📁 src/
│   ├── 📁 app/                # Next.js App Router
│   │   ├── 📁 (auth)/         # Authentication pages
│   │   ├── 📁 api/            # API endpoints
│   │   └── 📁 members/        # Member pages
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 animations/     # Motion components
│   │   └── 📁 navbar/         # Navigation components
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utilities & configurations
│   └── 📁 types/              # TypeScript type definitions
├── 📄 .env.example            # Environment variables template
├── 📄 .env.production         # Production environment guide
├── 📄 DEPLOYMENT_GUIDE.md     # Deployment instructions
└── 📄 README.md               # This file
```

---

## 🌟 Key Differentiators

### **Niche Focus**
- **Exclusively** for divorced and widowed Muslims
- **No generic profiles** or unclear intentions
- **Culturally sensitive** design for Southeast Asian Muslims

### **Islamic Principles**
- **Shariah-compliant** approach to matchmaking
- **Wali integration** for family involvement
- **Modesty-first** design with blurred photos
- **Intention-based** connections over superficial matching

### **Technical Excellence**
- **Production-ready** with comprehensive error monitoring
- **Real-time capabilities** for instant communication
- **Professional grade** UI/UX with accessibility compliance
- **Scalable architecture** built for growth

---

## 🚀 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nicholsmindset/faddlmatch-matrimonial)

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### **Manual Deployment**
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions that align with Islamic values and improve the matrimonial experience for our community.

### **Development Guidelines**
- Follow Islamic principles in all features
- Maintain cultural sensitivity
- Ensure accessibility compliance
- Write comprehensive tests
- Document all changes

### **Getting Started**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Built for the Community

**FADDLmatch** is built with love for the Muslim community, especially those seeking a second chance at happiness in marriage. We believe everyone deserves a respectful, dignified path to finding their life partner.

### **Support & Contact**
- 🐛 **Issues**: [GitHub Issues](https://github.com/nicholsmindset/faddlmatch-matrimonial/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/nicholsmindset/faddlmatch-matrimonial/discussions)
- 📧 **Email**: support@faddlmatch.com

---

<div align="center">

**"And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts."**  
*— Quran 30:21*

**Built with ❤️ for the Muslim community**

[![GitHub Stars](https://img.shields.io/github/stars/nicholsmindset/faddlmatch-matrimonial?style=social)](https://github.com/nicholsmindset/faddlmatch-matrimonial)
[![Follow](https://img.shields.io/github/followers/nicholsmindset?style=social)](https://github.com/nicholsmindset)

</div>
