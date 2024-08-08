# Auth JS Project

This project is a full-featured authentication system built with **Next.js** and **TypeScript**. It provides a seamless and secure way to handle user authentication with features such as login, signup, password reset, email verification, and comprehensive error handling. The UI is fully responsive, ensuring a smooth experience across devices.

## ✨ Features

- **Login:** Secure login system with robust validation.
- **Signup:** User registration with automatic email verification.
- **Signin:** Smooth sign-in process with session management.
- **Reset Password:** Easy-to-use password reset functionality via email.
- **Email Verification:** Verifies user email during signup to ensure authenticity.
- **Error Handling:** Detailed error messages and alerts to guide users.
- **Responsive Design:** Fully responsive interface, optimized for both desktop and mobile devices.

## 🚀 Technologies Used

- **[Next.js](https://nextjs.org/):** A React framework for server-rendered applications and static websites.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed programming language that builds on JavaScript, ensuring more robust and maintainable code.
- **[Prisma](https://www.prisma.io/):** Next-generation ORM for Node.js and TypeScript, allowing easy interaction with the PostgreSQL database.
- **[PostgreSQL](https://www.postgresql.org/):** A powerful, open-source relational database system used for data storage.
- **[Resend](https://resend.com/):** API service used to handle email sending for verification and password resets.
- **[shadcn](https://shadcn.dev/):** A modern UI component library, providing pre-built and customizable components.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development with consistent design.

## 📚 Project Structure

```plaintext
├── actions                   # Functions for performing various actions (e.g., fixes)
├── app                       # Main application components and layout
├── components                # Reusable UI components with responsive design
├── data                      # Server, client, and admin data settings
├── hooks                     # Custom React hooks for shared logic
├── lib                       # Library functions and utilities
├── prisma                    # Prisma ORM schema and database migrations
├── public                    # Public assets and static files
├── schemas                   # Validation schemas for forms and data handling
├── .eslint.json              # ESLint configuration for code linting
├── .gitignore                # Git ignore file to exclude unnecessary files
├── README.md                 # Project documentation
├── auth.config.ts            # Configuration for authentication and token management
├── middleware.ts             # Middleware setup for API and authentication
├── next-auth.d.ts            # TypeScript definitions for NextAuth.js
├── package.json              # NPM package configuration file
├── package-lock.json         # Locked version of dependencies for consistent installs
├── next.config.mjs           # Next.js configuration file
├── postcss.config.js         # PostCSS configuration for processing CSS
├── routes.ts                 # Route definitions for the application
├── tailwind.config.ts        # Tailwind CSS configuration for styling
└── tsconfig.json             # TypeScript configuration file


