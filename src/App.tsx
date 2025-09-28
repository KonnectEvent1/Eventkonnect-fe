import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import Login from "./Pages/Login"; // Import the Login page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Footer />
            </>
          }
        />
        <Route path="/payments" element={<Payments />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} /> {/* Added Login route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              <p>
                Go back to{" "}
                <Link to="/" className="text-green-600 underline">
                  Home
                </Link>
              </p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
