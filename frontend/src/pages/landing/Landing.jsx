
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const sectionsRef = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-black text-white scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex items-center justify-center flex-col px-6 text-center"
      >
        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight mb-2">
          Collect reviews from your customers &
        </h1>
        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
          display on your website easily.
        </h1>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="mt-10 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 shadow transition text-xl cursor-pointer"
        >
          Learn More ↓
        </button>
      </section>

      {/* What is YourReview */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-semibold mb-6 text-center">
          What is YourReview?
        </h2>
        <p className="text-lg text-gray-300 text-center">
          YourReview helps small businesses, freelancers, and startups collect authentic reviews from their customers with shareable links. These reviews can be embedded on your site beautifully.
        </p>
      </section>

      {/* Features */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-semibold mb-6 text-center">Key Features</h2>
        <ul className="grid sm:grid-cols-2 gap-6 text-lg text-gray-300">
          <li className="bg-white/10 p-6 rounded-lg">⚡ Create Campaigns Easily</li>
          <li className="bg-white/10 p-6 rounded-lg">🔗 Share Review Links</li>
          <li className="bg-white/10 p-6 rounded-lg">💬 Collect Customer Feedback</li>
          <li className="bg-white/10 p-6 rounded-lg">📌 Embed Dynamic Scripts</li>
          <li className="bg-white/10 p-6 rounded-lg">📊 Dashboard for Management</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <h2 className="text-4xl font-semibold mb-4">Get Started Free</h2>
        <p className="text-gray-300 mb-6 max-w-xl">
          Register and start collecting reviews instantly. No credit card required. Perfect for testing and building trust.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 shadow transition text-lg cursor-pointer"
        >
          Sign Up Now →
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;