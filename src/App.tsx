// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import Payments from "./Pages/Payments";
import Vendors from "./Pages/Vendors";
import Dashboard from "./Pages/Dashboard";
import CheckIn from "./Pages/CheckIn";
import ExploreEvents from "./Pages/ExploreEvents"; // ✅ New page
import CreateEvent from "./Pages/CreateEvents"; // ✅ New page

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home page: Hero + Features + Footer */}
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
        {/* Other pages */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/explore-events" element={<ExploreEvents />} />{" "}
        {/* ✅ Explore Events */}
        <Route path="/create-event" element={<CreateEvent />} />{" "}
        {/* ✅ Create Event */}
      </Routes>
    </Router>
  );
}

export default App;
