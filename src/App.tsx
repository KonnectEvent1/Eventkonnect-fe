import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import Payments from "./Pages/Payments";
import Vendors from "./Pages/Vendors";
import Dashboard from "./Pages/Dashboard";
import CheckIn from "./Pages/CheckIn";
import ExploreEvents from "./Pages/ExploreEvents";
import CreateEvent from "./Pages/CreateEvents";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/explore-events" 
          element={
            <>
              <Navbar />
              <ExploreEvents />
            </>
          } 
        />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <Vendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkin"
          element={
            <ProtectedRoute>
              <CheckIn />
            </ProtectedRoute>
          }
        />
        
        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
              <h1 className="text-4xl font-bold text-white mb-4">
                404 - Page Not Found
              </h1>
              <p className="text-gray-400 mb-8">
                The page you're looking for doesn't exist.
              </p>
              <Link
                to="/"
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Go back to Home
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
