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

3. Set up environment variables:
- Copy `.env.example` to `.env` in each project directory
- Fill in the required environment variables

### Development

#### Backend
```bash
cd backend
yarn start:dev
```

#### Web Frontend
```bash
cd frontend-web
yarn dev
```

#### Mobile Frontend
```bash
cd frontend-mobile
yarn start
```

## Infrastructure

### Deployment
- **Web**: Vercel (Auto-deploy from GitHub)
- **Mobile**: Expo (OTA updates)
- **API**: Render (Auto-scaling)
- **Database**: MongoDB Atlas

### CI/CD
GitHub Actions workflows are set up for:
- Automated testing
- Code quality checks
- Deployment to staging/production

## Project Structure
See the repository structure in the infrastructure documentation for detailed information about the codebase organization.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the Elastic License 2.0 - see the [LICENSE](LICENSE) file for details.
