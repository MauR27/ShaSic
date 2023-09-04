import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import HomePostsPage from "./components/Posts/HomePostsPage/HomePostsPage";
import GetComments from "./components/Posts/Comments/GetComments";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

//Extended Theme Chakra UI

const colors = {
  brand: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659",
  },
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: "'Roboto', sans-serif",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<MainPage />} />
      {/* PRIVATE ROUTES */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<HomePostsPage />} />
        <Route path="/post/:_id/comments" element={<GetComments />} />
      </Route>
    </Route>
  )
);

const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      body: {
        // bg: "gray.50",
        bgGradient: "linear(to-t, purple.100 , gray.50 50%)",
      },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);
