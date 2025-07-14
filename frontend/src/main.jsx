import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.jsx";
import Landing from "./pages/landing/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import EmailVerification from "./pages/auth/EmailVerification.jsx";
import CampaignList from "./pages/campaign/CampaignList.jsx";
import CreateCampaign from "./pages/campaign/CreateCampaign.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Services from "./pages/Services.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import PrivacyPolicy from "./pages/PrivayPolicy.jsx";
import Pricing from "./pages/Pricing.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ReviewForm from "./pages/review/ReviewForm.jsx";
import CampaignReviews from "./pages/review/CampaignReviews.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/review/:id" element={<ReviewForm />} />
      
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<EmailVerification />} />
        <Route path="services" element={<Services />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="terms-conditions" element={<TermsAndConditions />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="campaigns" element={<CampaignList />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="profile" element={<Profile />} />
        <Route path="campaign/:id/reviews" element={<CampaignReviews />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
