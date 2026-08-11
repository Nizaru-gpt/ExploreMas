# ExploreMas Frontend

Frontend application for **ExploreMas**, a tourism and local-discovery platform for exploring destinations, culinary places, local transportation information, news, and trip planning.

The application also includes authentication, an administrative interface, and chatbot integration with the Rust backend.

## Key Features

### Public Experience
- Tourism destination discovery
- Educational-tourism information
- Culinary and hangout-place discovery
- Destination detail pages
- Trans Banyumas information
- News content
- Trip planner
- Chatbot interface

### User Experience
- Registration and login
- Protected routes
- Password-recovery flow

### Administration
- Admin authentication
- Dashboard
- Destination/content management
- News management
- Chatbot/FAQ administration
- Usage-related views

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Recharts
- SweetAlert2
- Lucide React
- Tailwind CSS

## Main Pages

```text
src/pages/
├── Home.tsx
├── WisataPage.tsx
├── WisataDetail.tsx
├── CafePage.tsx
├── CafeDetail.tsx
├── TransBanyumas.tsx
├── TripPlanner.tsx
├── LoginPage.tsx
├── RegisterPage.tsx
├── ForgotPasswordPage.tsx
├── AdminLoginPage.tsx
└── AdminDashboard.tsx
```

## Backend

ExploreMas uses a Rust/Axum REST API backed by PostgreSQL.

Backend repository:

https://github.com/Nizaru-gpt/exploremas_be

## Getting Started

```bash
git clone https://github.com/Nizaru-gpt/ExploreMas.git
cd ExploreMas
npm install
npm run dev
```

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── admin/
│   ├── auth/
│   ├── chat/
│   ├── chatbot/
│   ├── home/
│   ├── layout/
│   ├── trans/
│   └── trip/
├── pages/
├── services/
└── main.tsx
```

## Project Focus

ExploreMas demonstrates a split full-stack architecture where the React frontend consumes a Rust REST API, with shared request/response structures managed through TypeScript-side API abstractions.

## Author

Nizar Qulubi  
GitHub: https://github.com/Nizaru-gpt  
LinkedIn: https://www.linkedin.com/in/nizar-qulubi
