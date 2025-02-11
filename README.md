# Shalom

Shalom is a modern church management system designed to help churches manage their congregation with grace and efficiency. The name "Shalom" reflects our mission to bring peace and harmony to church administration.

## Tech Stack

### Frontend
- **Web**: Next.js (React) hosted on Vercel
- **Mobile**: React Native with Expo
- **UI Framework**: Tailwind CSS (Web)
- **State Management**: React Query & Zustand

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose
- **Hosting**: Render

### Firebase Services
- Authentication (Email/Password, Google, Apple)
- Cloud Messaging for Push Notifications
- Cloud Storage for Files

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB
- Firebase account and project
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shalom.git
cd shalom
```

2. Install dependencies for each project:
```bash
# Backend
cd backend
yarn install

# Web Frontend
cd ../frontend-web
yarn install

# Mobile Frontend
cd ../frontend-mobile
yarn install
```

### Environment Setup

1. **Backend Configuration**
   
   Copy `.env.example` to `.env` in the backend directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Configure the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Backend server port (default: 3000)
   - `NODE_ENV`: development/production

   Firebase Admin SDK Configuration:
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_PRIVATE_KEY`: The private key from your Firebase service account
   - `FIREBASE_CLIENT_EMAIL`: The client email from your Firebase service account

   To get Firebase Admin credentials:
   1. Go to Firebase Console > Project Settings > Service Accounts
   2. Click "Generate New Private Key"
   3. Copy the values from the downloaded JSON to your .env file

2. **Frontend Web Configuration**

   Copy `.env.example` to `.env.local` in the frontend-web directory:
   ```bash
   cd frontend-web
   cp .env.example .env.local
   ```

   Configure the following variables:
   - `NEXT_PUBLIC_API_URL`: Backend API URL
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase Web API Key
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase Project ID
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID
   - `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase App ID

   To get these values:
   1. Go to Firebase Console > Project Settings > General
   2. Scroll down to "Your apps" section
   3. Click the web app configuration

### Running the Application

1. Start the backend server:
```bash
cd backend
yarn start:dev
```

2. Start the frontend web application:
```bash
cd frontend-web
yarn dev
```

3. Start the mobile application:
```bash
cd frontend-mobile
yarn start
```

## Security Notes

- Never commit `.env` files or Firebase service account keys to version control
- Keep your Firebase Admin SDK private key secure
- Regularly rotate credentials in production
- Use environment variables for all sensitive configuration
- Follow the principle of least privilege when setting up service accounts

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
