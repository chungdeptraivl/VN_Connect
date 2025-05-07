import React from "react";
import { Navigate, Route, Routes } from "react-router";

import Loading from "./components/Loading.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import VideoCallPage from "./pages/VideoCallPage.jsx";

import { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axiosConfig.js";

const App = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },

    retry: false,
  });

  const authUser = authData?.user;

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        {/* Auth routing */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Main page */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/video-call"
          element={authUser ? <VideoCallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
