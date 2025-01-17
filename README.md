# RecomBooks - Smart Book Discovery Platform

## Overview

RecomBooks is an elegant book discovery platform that uses AI to provide personalized book recommendations. Built with modern web technologies and a focus on user experience, it helps readers find their next favorite book through natural language queries.

![RecomBooks Demo](public/demo.png)

## Features

- 🤖 **AI-Powered Search**: Natural language processing for intuitive book discovery
- 🎨 **Modern Interface**: Beautiful, responsive design with smooth animations
- ⚡ **Real-time Results**: Instant book recommendations with rich details
- 📱 **Fully Responsive**: Perfect experience across all devices
- 🔍 **Smart Filtering**: Intelligent book matching based on user preferences
- 📚 **Direct Purchase**: Quick access to purchase options

## Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks

### Performance

- **Image Optimization**: Next.js Image
- **Loading States**: Optimistic UI updates
- **Animations**: GPU-accelerated transitions

## Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/0xNayan04/recombooks.git
cd recombooks
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── moving-border.tsx
│   │   ├── aurora-background.tsx
│   │   └── word-fade-in.tsx
│   └── footer.tsx         # Footer component
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">Made with ❤️ for book lovers</p>
