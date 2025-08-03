import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
        {/* Removed max-w-4xl container here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Container><Login /></Container>} />
          <Route path="/register" element={<Container><Register /></Container>} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Optional: Reusable wrapper for smaller pages like Login/Register
function Container({ children }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      {children}
    </div>
  );
}

export default App;
