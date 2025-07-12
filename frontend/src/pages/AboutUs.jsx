import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>
        <p className="text-white/80">
          YourReview is a lightweight yet powerful platform for small businesses,
          freelancers, and startups to collect customer feedback and display
          reviews beautifully on their websites. We’re focused on simplicity,
          transparency, and giving you control over your brand.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
