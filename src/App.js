import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider  } from './components/AuthContext';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Market from './pages/Market';
import Contact from './pages/Contact';
import RegisterPage from './pages/RegisterPage';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import PasswordReset from "./pages/PasswordReset";
import PasswordForget from "./pages/PasswordForget";


function App() {
  return (
    <Router>
      <>
        
          <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/market" element={<Market />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/stocks" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/editprofile" element={<Profile />} />
            <Route path="/passwordforget" element={<PasswordForget />} />
            <Route path="/passwordreset" element={<PasswordReset />} />

          </Routes>
          </AuthProvider>
        
        <Footer />
      </>
    </Router>
  );
}

export default App;
