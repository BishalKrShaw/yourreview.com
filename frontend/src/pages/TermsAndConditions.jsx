import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Terms & Conditions</h1>
        <p className="text-white/80">
          By using YourReview, you agree to our policies and to use the service
          respectfully and legally. We reserve the right to update these terms and
          suspend misuse. YourReview is provided "as is" with no guarantees. For full
          terms or legal issues, please contact us.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
