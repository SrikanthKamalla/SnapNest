import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Modal from "react-modal";
import ProtectedRoute from "./hoc/WithAuth";
import { useEffect } from "react";
import { getuserInfo } from "./service/user";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { fetchUser } from "../toolkit/userSlice";

Modal.setAppElement("#root");
function App() {
  const dispatch = useDispatch();
  // const fetchLoggedInUserInfo = () => {
  // };
  useEffect(() => {
    dispatch(fetchUser(getuserInfo));
  }, []);

  const routesArr = [
    {
      path: "/",
      element: <Home />,
      isPublic: false,
    },
    {
      path: "/signup",
      element: <SignUp />,
      isPublic: true,
    },
    {
      path: "/login",
      element: <Login />,
      isPublic: true,
    },
    {
      path: "/my-posts",
      element: <Home />,
      isPublic: false,
    },
    {
      path: "/create-post",
      element: <CreatePost />,
      isPublic: false,
    },
    {
      path: "/edit-post/:id",
      element: <CreatePost />,
      isPublic: false,
    },
    {
      path: "/user-profile",
      element: <Profile />,
      isPublic: false,
    },
    {
      path: "/view-post",
      element: <Home />,
      isPublic: false,
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
