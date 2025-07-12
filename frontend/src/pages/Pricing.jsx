import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PLANS } from '../constants/constants';

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-32 px-5 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Pricing Plans</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className="bg-white/10 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="list-disc ml-5 space-y-1 text-white/80">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;