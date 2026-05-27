import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Home from './components/Home';
import Journal from './components/Journal';
import Insights from './components/Insights';
import SelfCare from './components/SelfCare';
import Reflections from './components/Reflections';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import NotificationSettings from './components/NotificationSettings';
import NotificationManager from './components/NotificationManager';
import Community from './components/Community';
import AnonymousChat from './components/AnonymousChat';
import PsychologistSignup from './components/PsychologistSignup';
import FindPsychologist from './components/FindPsychologist';
import PsychologistProfile from './components/PsychologistProfile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  return (
    <Router>
      <div className="size-full bg-background">
        <Toaster position="top-center" richColors />
        {isAuthenticated && <NotificationManager />}
        <Routes>
          <Route
            path="/"
            element={
              !hasSeenOnboarding ? (
                <Navigate to="/onboarding" replace />
              ) : !isAuthenticated ? (
                <Navigate to="/auth" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route
            path="/onboarding"
            element={
              <Onboarding
                onComplete={() => {
                  setHasSeenOnboarding(true);
                }}
              />
            }
          />

          <Route
            path="/auth"
            element={
              <Auth
                onLogin={() => setIsAuthenticated(true)}
              />
            }
          />

          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <Home />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/journal"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <Journal />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/insights"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <Insights />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/selfcare"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto">
                    <SelfCare />
                  </div>
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/reflections"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto">
                    <Reflections />
                  </div>
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <Profile />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/notifications"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto">
                    <NotificationSettings />
                  </div>
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/community"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <Community />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/chat"
            element={
              isAuthenticated ? (
                <AnonymousChat />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/psychologist-signup"
            element={
              isAuthenticated ? (
                <PsychologistSignup />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/find-psychologist"
            element={
              isAuthenticated ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto pb-20">
                    <FindPsychologist />
                  </div>
                  <Navigation />
                </div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/psychologist/:id"
            element={
              isAuthenticated ? (
                <PsychologistProfile />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
