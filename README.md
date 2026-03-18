# Youseef Tareq | Full-Stack Developer Portfolio

## 1. Project Overview and Key Features

This project is a modern, responsive personal portfolio website for **Youseef Tareq**, a Full-Stack Developer specializing in Angular, Node.js, and Django. Built with Next.js 15, the application is designed to showcase projects, professional experience, technical skills, and recommendations with a focus on high-performance and accessible web design.

### Key Features
- **Modern UI/UX**: Features smooth scroll progress, dynamic animations using Framer Motion, and aesthetic components powered by Tailwind CSS and Shadcn UI.
- **Responsive Layout**: Adapts seamlessly to various devices and screen sizes.
- **Dynamic Sections**: Dedicated sections for Hero, About, Projects, Tech Stack, Experience, and Contact logic.
- **Theming**: Integrated Dark/Light mode toggle (`next-themes`) that honors system preferences.
- **SEO Optimized**: Includes comprehensive OpenGraph tags, dynamic meta descriptions, and Structured Data (JSON-LD) for enhanced search engine visibility.

## 2. Project Architecture and Folder Structure

The project follows the standard Next.js App Router structure with customized modular directories for a clean and scalable architecture.

```text
portfolio/
├── .firebase/                 # Local Firebase emulator and configuration files
├── app/                       # Next.js App Router (Pages, Layouts, CSS)
│   ├── globals.css            # Global CSS styles and Tailwind imports
│   ├── layout.tsx             # Root layout wrapping the application
│   └── page.tsx               # Main landing page assembling application components
├── components/                # Reusable React components
│   ├── ui/                    # Base UI components (shadcn/radix primitives)
│   ├── hero.tsx               # Hero introduction section
│   ├── about.tsx              # About me section
│   ├── experience.tsx         # Work and education experience
│   ├── projects.tsx           # Showcased portfolio projects
│   ├── tech-stack.tsx         # Technologies and tools skills presentation
│   ├── contact.tsx            # Contact form and details
│   ├── header.tsx / footer.tsx
│   └── theme-provider.tsx     # Handles Dark/Light mode logic
├── functions/                 # Firebase Cloud Functions (backend logic)
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions and shared logic
├── public/                    # Static assets like images (e.g., og-image.jpg), fonts
├── styles/                    # Additional module-specific CSS files
├── apphosting.yaml            # Firebase App Hosting configuration (Cloud Run backend config)
├── firebase.json              # Primary Firebase deployment routing and rules config
├── firestore.rules            # Firestore security rules
├── next.config.mjs            # Next.js framework configuration
├── package.json               # Project dependencies and workspace scripts
└── tailwind.config.ts         # Tailwind CSS framework configuration
```

## 3. Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & `tailwindcss-animate`
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Hosting**: [Firebase](https://firebase.google.com/) (Hosting, Cloud Functions, Firestore)
- **Package Manager**: [npm](https://www.npmjs.com/) (or `pnpm`/`yarn`)

## 4. Local Setup and Installation

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- Firebase CLI (`npm install -g firebase-tools`)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies:**
   Using npm (the default defined in the project):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **(Optional) Run Firebase Emulators locally:**
   To test Firebase features like Firestore offline:
   ```bash
   firebase emulators:start
   ```

## 5. Step-by-step Deployment Guide (Firebase)

The project leverages Firebase for both static asset hosting and backend functionality via Cloud Run using Firebase App Hosting.

### Option A: Deploying via Firebase App Hosting (Recommended)
This approach automatically manages the Next.js server-side rendering (SSR) lifecycle using an integrated CI/CD pipeline.

1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project and navigate to **App Hosting** from the side menu.
3. Click **Get Started** and connect the application's GitHub repository.
4. Select the deployment branch (e.g., `main`).
5. Configure the root directory if it differs from the default (`/`).
6. Firebase will automatically detect the Next.js framework configuration and the `apphosting.yaml` file to provision the necessary Cloud Run resources and CI/CD pipelines.
7. Any future push to the target branch will automatically trigger a new deployment.

### Option B: Deploying via Firebase CLI (Traditional Hosting)

1. **Login to Firebase CLI:**
   ```bash
   firebase login
   ```

2. **Initialize Firebase in the project directory (if needed):**
   ```bash
   firebase init hosting
   ```
   *Select your existing Firebase project or create a new one.*

3. **Build the Next.js application for production:**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```

## 6. Environment Variables and Available Scripts

### Environment Variables

Typically, sensitive configuration is kept out of source control. Create a `.env.local` file at the root of the project to add your keys. It would look something like this:

```bash
# .env.local

# Define your custom public environment variables below:
# NEXT_PUBLIC_API_URL=https://api.example.com
```

*Note: For Firebase App Hosting, navigate to App Hosting -> Select the App -> Settings -> "Environment Variables" to inject them securely at Build/Runtime without exposing them in codebase files.*

### Available Scripts

These scripts are defined in `package.json` to facilitate the standard development lifecycle:

- `npm run dev`
  Starts the Next.js development server with Fast Refresh.

- `npm run build`
  Compiles the application for production, optimizing assets and statically generating pages where possible.

- `npm run start`
  Starts the production server explicitly (should be run only after `npm run build`).

- `npm run lint`
  Runs the configured ESLint rules to enforce code styling and structural rules dynamically.
