import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trophy, Users, Quote, Newspaper, Bookmark } from "lucide-react";

const Landing = () => {
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    features: false,
    testimonials: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "features" && entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, features: true }));
          }
          if (entry.target.id === "testimonials" && entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, testimonials: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-green-950 to-teal-950 text-white overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900/90 backdrop-blur-lg sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy size={24} className="text-green-400 animate-pulse" />
          GoalPulse
        </h1>
        <Link to="/home">
          <button className="bg-green-600 cursor-pointer px-5 py-2 rounded-full font-medium hover:bg-green-500 transition">
            Explore News
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Stay Ahead with Live Football News
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Get the latest football headlines, match analysis, and connect with fans globally.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/home">
              <button className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2">
                <Newspaper size={20} className="animate-pulse" />
                View News
              </button>
            </Link>
            <Link to="/bookmarks">
              <button className="bg-gradient-to-r from-green-700 to-teal-700 px-8 py-3 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2">
                <Bookmark size={20} className="animate-pulse" />
                My Bookmarks
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className={`px-4 py-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 transition duration-700 ${
          isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            icon: (
              <Newspaper
                size={36}
                className="mx-auto mb-4 text-green-400 animate-pulse"
              />
            ),
            title: "Latest Football News",
            desc: "Stay updated with live match reports and transfer news.",
          },
          {
            icon: (
              <Users
                size={36}
                className="mx-auto mb-4 text-green-400 animate-pulse"
              />
            ),
            title: "Fan Community",
            desc: "Discuss, share predictions, and engage with other fans.",
          },
          {
            icon: (
              <Bookmark
                size={36}
                className="mx-auto mb-4 text-green-400 animate-pulse"
              />
            ),
            title: "Save Articles",
            desc: "Bookmark your favorite articles to read anytime.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-lg hover:bg-white/20 transition shadow-md"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm opacity-90">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className={`px-4 py-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 transition duration-700 ${
          isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            quote: "GoalPulse keeps me updated on all my favorite teams effortlessly!",
            name: "Alex, Arsenal Fan",
          },
          {
            quote: "The bookmarking feature is great for reading later on busy days.",
            name: "Emma, Liverpool Supporter",
          },
        ].map((testimonial, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-lg shadow-md"
          >
            <Quote
              size={24}
              className="mx-auto mb-4 text-green-400 animate-pulse"
            />
            <p className="italic mb-2">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900/90 backdrop-blur-lg text-center">
        <p className="text-sm opacity-80 mb-2">
          © 2025 GoalPulse. All rights reserved.
        </p>
        <div className="flex justify-center gap-4">
          {["Twitter", "Instagram", "Privacy Policy"].map((link, i) => (
            <a
              key={i}
              href="/"
              className="text-green-400 hover:text-green-300 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Landing;
