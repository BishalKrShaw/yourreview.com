import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Our Services</h1>
        <ul className="list-disc ml-5 space-y-2 text-white/90">
          <li>Customizable shareable review links</li>
          <li>Embeddable review scripts for your website</li>
          <li>Simple dashboard for managing campaigns</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
