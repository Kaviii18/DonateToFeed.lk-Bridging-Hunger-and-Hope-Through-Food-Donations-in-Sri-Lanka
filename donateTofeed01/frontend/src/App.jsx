
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DonationForm from './components/DonationForm';
import FindFood from './components/FindFood';
import DonationConfirmation from './components/DonationConfirmation';
import FeedRequestConfirmation from './components/FeedRequestConfirmation';
import Feedback from './components/Feedback';
import Chat from './components/Chat';
import AvailableDonations from './components/AvailableDonations'; 
import Logout from './Logout';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import AdminLogin from './components/Admin';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ListingManagement from './components/ListingManagement';
import FeedbackManagement from './components/FeedbackManagement';
import ContactUs from './components/ContactUs';

function AppContent() {
  const location = useLocation();

  // List of routes where Header should be hidden
  const hideHeaderRoutes = [
    "/dashboard",
    "/UserManagement",
    "/ListingManagement",
    "/FeedbackManagement"
  ];

  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <AboutUs />
            <Features />
            <HowItWorks />
            <Newsletter />
            <AvailableDonations />
            <Testimonials />
            <Footer />
          </>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/feed" element={<FindFood />} />
        <Route path="/confirmation" element={<DonationConfirmation />} />
        <Route path="/request-confirmation" element={<FeedRequestConfirmation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chat" element={<Chat />} />     
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/ListingManagement" element={<ListingManagement />} />
        <Route path="/FeedbackManagement" element={<FeedbackManagement />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/available-donations" element={<AvailableDonations />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
