import React, { useEffect } from 'react';
import { getUserInfo } from './service/user';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchUser } from './toolkit/userSlice';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './hoc/WithAuth';
import './App.css';
import Modal from 'react-modal';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PostPage from './pages/ViewPost';
import { saveToLocalStorage } from './helpers/localstorage';
import GoogleSuccess from './components/GoogleSuccess';
const Home = React.lazy(() => import('./pages/Home'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));
const Profile = React.lazy(() => import('./pages/Profile'));

Modal.setAppElement('#root');
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    // console.log(token);

    if (token) {
      saveToLocalStorage(token);
      navigate('/');
    }
  }, [navigate]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUser(getUserInfo));
  });

  const routesArr = [
    {
      path: '/',
      element: <Home />,
      isPublic: false,
    },
    {
      path: '/signup',
      element: <SignUp />,
      isPublic: true,
    },
    {
      path: '/login',
      element: <Login />,
      isPublic: true,
    },
    {
      path: '/my-posts',
      element: <Home />,
      isPublic: false,
    },
    {
      path: '/create-post',
      element: <CreatePost />,
      isPublic: false,
    },
    {
      path: '/edit-post/:id',
      element: <CreatePost />,
      isPublic: false,
    },
    {
      path: '/user-profile',
      element: <Profile />,
      isPublic: false,
    },
    {
      path: '/post/:id',
      element: <PostPage />,
      isPublic: false,
    },
    {
      path: '/google-success',
      element: <GoogleSuccess />,
      isPublic: true,
    },
  ];

  return (
    <>
      <Routes>
        {routesArr.map((route) => (
          <Route
            path={route.path}
            element={
              <ProtectedRoute isPublic={route.isPublic}>
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
