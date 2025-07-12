import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
        <p className="text-white/80">
          We collect data to provide our services including your email, business name,
          and customer feedback. We never sell your data and only store what’s required
          to operate YourReview. For any data-related requests, please contact us at
          bshaw2847@gmail.com.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;