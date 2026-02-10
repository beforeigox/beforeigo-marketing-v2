import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Marketing Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Demo from './pages/Demo';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Help from './pages/Help';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Pricing from './pages/Pricing';
import PhysicalJournal from './pages/PhysicalJournal';

// Auth Pages
import AccountSetup from './pages/AccountSetup';
import AccountSuccess from './pages/AccountSuccess';
import SignIn from './pages/SignIn';
import GiftRedemption from './pages/GiftRedemption';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Stories from './pages/dashboard/Stories';
import StoryEditor from './pages/dashboard/StoryEditor';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Marketing Website Routes */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/how-it-works" element={
          <Layout>
            <HowItWorks />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/testimonials" element={
          <Layout>
            <Testimonials />
          </Layout>
        } />
        <Route path="/demo" element={
          <Layout>
            <Demo />
          </Layout>
        } />
        <Route path="/blog" element={
          <Layout>
            <Blog />
          </Layout>
        } />
        <Route path="/blog/:slug" element={
          <Layout>
            <BlogPost />
          </Layout>
        } />
        <Route path="/help" element={
          <Layout>
            <Help />
          </Layout>
        } />
        <Route path="/checkout" element={
          <Layout>
            <Checkout />
          </Layout>
        } />
        <Route path="/pricing" element={
          <Layout>
            <Pricing />
          </Layout>
        } />
        <Route path="/physical-journal" element={
          <Layout>
            <PhysicalJournal />
          </Layout>
        } />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout-success" element={<Success />} />

        {/* Auth Routes */}
        <Route path="/account-setup" element={<AccountSetup />} />
        <Route path="/account-success" element={<AccountSuccess />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/gift-access" element={<GiftRedemption />} />

        {/* Dashboard Routes - Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/stories" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Stories />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/stories/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <StoryEditor />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/settings" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;