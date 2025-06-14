import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const illustration = 'https://img.freepik.com/free-vector/business-landing-page-template_23-2148320286.jpg'; // Placeholder illustration

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-4 bg-white rounded-t-2xl shadow-md">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-blue-600 rounded-sm mr-2" />
      <span className="font-bold text-xl text-gray-800 tracking-wide">LOGO</span>
    </div>
    <ul className="flex gap-8 text-gray-700 font-medium text-base">
      <li className="hover:text-blue-600 cursor-pointer">Home</li>
      <li className="hover:text-blue-600 cursor-pointer">About us</li>
      <li className="hover:text-blue-600 cursor-pointer">Course</li>
      <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
      <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      <li><Link to="/contact" className="hover:text-blue-600 cursor-pointer">Contact</Link></li>
    </ul>
    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-800 transition-all font-semibold">Get Started</Button>
  </nav>
);

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-purple-200">
      <div className="w-full max-w-6xl mx-auto mt-10 mb-10 rounded-2xl shadow-2xl bg-white/90">
        <Navbar />
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-8 min-h-[500px] md:min-h-[600px]">
          {/* Left: Hero Text */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">BUSINESS<br />LANDING PAGE</h1>
            <p className="text-gray-700 text-lg mb-8 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow">More Info</Button>
          </div>
          {/* Right: Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <img src={illustration} alt="Landing Illustration" className="w-full max-w-md rounded-xl shadow-lg object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
