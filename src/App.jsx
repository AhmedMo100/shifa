import { BrowserRouter, Routes, Route } from "react-router-dom";

// Clients Pages
import Home from "./pages/client/Home";
import AboutUs from "./pages/client/About";
import Services from "./pages/client/Services";
import Booking from "./pages/client/Booking";

// Management Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Protection Component
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPage from "./pages/client/Blogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Clients Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Management Page */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
