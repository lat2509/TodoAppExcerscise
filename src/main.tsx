import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Todo from './pages/Todo';
import { editTodoLoader } from './services/editTodoLoader';
import EditTodoModal from './todo/components/EditTodoModal';
import Home from './pages/Home';
import Login from './layout/auth/Login';
import Register from './layout/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import AuthLayout from './layout/AuthLayout';
import AddNewTodoModal from './todo/components/AddNewTodoModal';
import NotFoundPage from './layout/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'todo',
            element: <Todo />,
            errorElement: <NotFoundPage />,
            children: [
              {
                path: ':todoId/edit',
                element: <EditTodoModal />,
                loader: editTodoLoader,
                hydrateFallbackElement: <p>Loading app...</p>,
              },
              {
                path: 'addNewTodo',
                element: <AddNewTodoModal />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
