# LinkTree Clone

A feature-rich **LinkTree Clone** built using **Next.js** and **Tailwind CSS**, with support for user authentication, dynamic content management, and live updates. The project leverages powerful technologies like **MongoDB** for storage, **bcrypt** for secure authentication, and **NextAuth** for session management.

## Features

- **Authentication**
  - User Signup and Login
  - Password hashing with `bcrypt`
  - Persistent sessions using `next-auth`

- **Dynamic Link Management**
  - Add, Edit, and Delete links dynamically
  - Control link visibility with `show` and `archive` options

- **User Profile**
  - Upload profile pictures
  - Edit user bio and display name

- **Live Reload**
  - Real-time updates using `react-hook-form` and optimized rendering

- **Responsive Design**
  - Fully responsive UI designed with Tailwind CSS
  - Optimized for desktop and mobile devices

## Technologies Used

### Frontend
- **React**
- **Next.js**
- **Tailwind CSS**
- **React-Hook-Form**
- **Swiper.js** (for any carousels/sliders)

### Backend
- **Next.js API Routes**
- **MongoDB** (Database)
- **bcrypt** (Password Hashing)
- **NextAuth** (Authentication)

### Dev Tools
- **ESLint** (for code linting)
- **PostCSS** (for Tailwind processing)

## Styling

This project uses **Tailwind CSS** for styling. To modify styles, edit the `tailwind.config.js` file or directly apply classes in components.

## Future Improvements

- Implement analytics to track link clicks.
- Add dark mode.
- Enhance accessibility (ARIA roles, keyboard navigation).
- Introduce drag-and-drop for reordering links.

## Dependencies

### Main Dependencies

```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "mongodb": "^6.11.0",
  "next": "^15.0.4",
  "next-auth": "^4.24.10",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.54.0",
  "swiper": "^11.1.15"
}
```

### Dev Dependencies

```json
"devDependencies": {
  "eslint": "^8",
  "eslint-config-next": "15.0.3",
  "postcss": "^8",
  "tailwindcss": "^3.4.1"
}
```
