# ✅ Advanced Task Manager (Todo App)

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange)
![Dnd Kit](https://img.shields.io/badge/Dnd_Kit-Drag_&_Drop-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

A high-performance Task Management application featuring Kanban-style Drag & Drop, complex state management, and strict form validation.

## 🚀 Key Features

* **📋 Kanban Board:** Smooth **Drag & Drop** functionality to move tasks between statuses using `@dnd-kit`.
* **🧠 Smart State Management:** Powered by **Zustand** with Persist Middleware to save user preferences and sort configurations locally.
* **🛡️ Robust Form Validation:** Built with **React Hook Form** and **Zod** Schema to ensure data integrity and minimize re-renders.
* **🔃 Advanced Sorting:** Client-side sorting logic (by Date, Status, Priority) configurable per column.
* **🔒 Security:** Protected Routes requiring authentication to access the dashboard.
* **🌗 UI/UX:** Clean interface with Tailwind CSS and Responsive Design.

## 🛠 Tech Stack

### Core
* **Framework:** React 19
* **Language:** TypeScript
* **Build Tool:** Vite

### State & Logic
* **State Management:** Zustand (Lightweight & Persist)
* **Forms:** React Hook Form + Zod
* **Drag & Drop:** @dnd-kit/core

### UI & Styling
* **Styling:** Tailwind CSS
* **Icons:** React Icons

### Code Quality
* **Linting:** ESLint + Prettier
* **Git Hooks:** Husky + Commitlint


## 🛠 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/lat2509/TodoAppExcerscise.git](https://github.com/lat2509/TodoAppExcerscise.git)
    cd TodoAppExcerscise
    ```

2.  **Install dependencies**
    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file for API configuration (if applicable):
    ```env
    VITE_API_URL=[http://your-api-endpoint.com](http://your-api-endpoint.com)
    ```

4.  **Run the development server**
    ```bash
    yarn dev
    ```

## 📂 Project Structure

```bash
src/
├── api/            # API services & Axios Interceptors
├── layout/         # Layout components (AuthLayout, Header...)
├── stores/         # Zustand stores (useTodoStore, useAuthStore)
├── todo/           # Todo feature components
│   ├── components/ # DragTodo, Column, Task, Modals...
├── Routes/         # Public & Protected route guards
├── type/           # Type definitions
└── utils/          # Error helpers