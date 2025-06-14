import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import About from './About';
import FileUpload from './FileUpload';

const automationGif = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2jEy964hpru6n3w7n2bhnfhgu563qrks/giphy.gif'; // Replace with a more relevant GIF if available

const navItems = [
  { label: 'About Us', section: 'about' },
  { label: 'How it works', section: 'how' },
  { label: 'Try Our Model', section: 'try' },
  { label: 'Leave a Review', section: 'review' },
];

const Navbar = ({ onScrollTo }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-lg font-sans transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-400 rounded-lg mr-2 shadow" />
          <span className="font-extrabold text-2xl md:text-3xl text-gray-800 tracking-wide font-display">AutoEDA</span>
        </div>
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-lg">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => onScrollTo(item.section)}
                className="relative px-1 py-1 hover:text-blue-600 transition-colors duration-200 font-semibold group"
              >
                {item.label}
                <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          <Button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 text-white px-7 py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all font-bold text-base tracking-wide"
          >
            Login / Signup
          </Button>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-7 h-7 text-blue-700" /> : <Menu className="w-7 h-7 text-blue-700" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg px-6 py-4 flex flex-col gap-4 animate-fade-in-down">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => { setOpen(false); onScrollTo(item.section); }}
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-left"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => { setOpen(false); navigate('/auth'); }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 text-white px-7 py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all font-bold text-base tracking-wide mt-2"
          >
            Login / Signup
          </Button>
        </div>
      )}
    </nav>
  );
};

const scrollToSection = (ref) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Home = () => {
  const aboutRef = useRef(null);
  const howRef = useRef(null);
  const tryRef = useRef(null);
  const reviewRef = useRef(null);

  const handleScrollTo = (section) => {
    if (section === 'about') scrollToSection(aboutRef);
    if (section === 'how') scrollToSection(howRef);
    if (section === 'try') scrollToSection(tryRef);
    if (section === 'review') scrollToSection(reviewRef);
  };

  // Scroll to Try Our Model when Get Started is clicked
  const handleGetStarted = () => handleScrollTo('try');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-purple-100 font-sans">
      <Navbar onScrollTo={handleScrollTo} />
      {/* Hero Section */}
      <div className="relative w-full max-w-6xl mx-auto mt-36 mb-10 rounded-3xl shadow-2xl bg-white/90 overflow-hidden animate-fade-in-up">
        {/* Decorative Gradient Shape */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400 via-purple-300 to-blue-200 opacity-30 rounded-full blur-3xl z-0" />
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-8 min-h-[500px] md:min-h-[600px] relative z-10">
          {/* Left: Hero Text */}
          <div className="flex-1 flex flex-col items-start justify-center animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 leading-tight font-display">Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AutoEDA</span></h1>
            <p className="text-gray-700 text-xl mb-8 max-w-md animate-fade-in">
              Automated Exploratory Data Analysis. Instant insights, zero hassle. <br />
              <span className="text-blue-500 font-semibold">Empower your data journey.</span>
            </p>
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all animate-fade-in-up">Get Started</Button>
          </div>
          {/* Right: Automation GIF */}
          <div className="flex-1 flex items-center justify-center animate-slide-in-right">
            <img src={automationGif} alt="Data Automation GIF" className="w-full max-w-md rounded-xl shadow-lg object-cover" />
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <section ref={aboutRef} id="about" className="w-full max-w-6xl mx-auto my-16 bg-white/90 rounded-2xl shadow-lg px-8 py-16 animate-fade-in-up">
        <About />
      </section>
      {/* How it works Section */}
      <section ref={howRef} id="how" className="w-full max-w-6xl mx-auto my-16 bg-white/90 rounded-2xl shadow-lg px-8 py-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-display">How it works</h2>
        <p className="text-gray-700 text-lg">[How it works content goes here]</p>
      </section>
      {/* Try Our Model Section */}
      <section ref={tryRef} id="try" className="w-full max-w-6xl mx-auto my-16 bg-white/90 rounded-2xl shadow-lg px-8 py-16 animate-fade-in-up">
        <FileUpload />
      </section>
      {/* Leave a Review Section */}
      <section ref={reviewRef} id="review" className="w-full max-w-6xl mx-auto my-16 bg-white/90 rounded-2xl shadow-lg px-8 py-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-display">Leave a Review</h2>
        <p className="text-gray-700 text-lg">[Leave a Review content goes here]</p>
      </section>
    </div>
  );
};

export default Home;

// TailwindCSS custom animations (add to your tailwind.config.js):
// fade-in, fade-in-up, fade-in-down, slide-in-left, slide-in-right
// .font-display { font-family: 'Poppins', 'Inter', 'Segoe UI', sans-serif; }
