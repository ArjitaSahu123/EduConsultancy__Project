import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Signin from './components/Signin';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Verify from './components/Verify';
import About from './components/About';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import AdminDashboard from './components/adminDashboard';
import Adminblogs from './components/Admin Pages/Blogs'
import Admincontacts from './components/Admin Pages/Contacts'
import Adminfeedbacks from './components/Admin Pages/Feedbacks'
import Adminproducts from './components/Admin Pages/Products'
import Adminusers from './components/Admin Pages/Users'
import Adminsubscriptions from './components/Admin Pages/Subscriptions'
import Admincontactdetails from "./components/Admin Pages/Contactdetails"
import Adminfeedbackdetails from "./components/Admin Pages/Feedbackdetails"
import Adminblogdetails from "./components/Admin Pages/Blogdetails"
import Adminproductdetails from "./components/Admin Pages/Productdetails"
import Success from './components/Utilities/success';
import Blogdetails from './components/Blogdetails';
import Productdetails from './components/Productdetails';
import Feedbackdetails from './components/User components/Feedbackdetails';
import Contactdetails from './components/User components/Contactdetails';

import { BlogProvider } from './components/Context/BlogContext'; // Import BlogProvider
import { ProductProvider } from './components/Context/ProductContext';

function App() {
  return (
    <AuthProvider>
     <BlogProvider>
     <ProductProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify" element={<Verify />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
           <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <Productdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:blogId"
            element={
              <ProtectedRoute>
                <Blogdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <ProtectedRoute>
                <Contactdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedbacks/:id"
            element={
              <ProtectedRoute>
                <Feedbackdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <Adminblogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute>
                <Admincontacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              <ProtectedRoute>
                <Adminfeedbacks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <Adminproducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscriptions"
            element={
              <ProtectedRoute>
                <Adminsubscriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts/:id"
            element={
              <ProtectedRoute>
                <Admincontactdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedbacks/:id"
            element={
              <ProtectedRoute>
                <Adminfeedbackdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/:blogId"
            element={
              <ProtectedRoute>
                <Adminblogdetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:productId"
            element={
              <ProtectedRoute>
                <Adminproductdetails />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Adminusers />
              </ProtectedRoute>
            }
          />
           <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      </ProductProvider>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;