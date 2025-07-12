import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-white/80 mb-2">Have questions or feedback? Reach out to us anytime:</p>
        <p className="text-white/90 font-medium">Email: <a href="mailto:bshaw2847@gmail.com" className="underline">bshaw2847@gmail.com</a></p>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;