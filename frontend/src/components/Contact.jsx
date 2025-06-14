import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardContent } from './ui/card';
import { Mail, User, MessageCircle, Github, Linkedin, CheckCircle } from 'lucide-react';

const SUBJECTS = [
  { value: '', label: 'Select subject' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-2 py-8 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl bg-white/90">
        <CardHeader className="flex flex-col items-center gap-2 pt-8">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Mail className="w-7 h-7 text-blue-500 animate-bounce" /> Contact Us
          </h2>
          <p className="text-gray-600 text-center">We'd love to hear from you! Fill out the form below or reach us via the links.</p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <User className="w-5 h-5 text-blue-400" />
                <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="bg-transparent border-none focus:ring-0" />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="bg-transparent border-none focus:ring-0" />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <select name="subject" value={form.subject} onChange={handleChange} className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-700">
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value} disabled={s.value === ''}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <MessageCircle className="w-5 h-5 text-blue-400 mt-1" />
              <textarea name="message" placeholder="Your message..." value={form.message} onChange={handleChange} rows={4} className="flex-1 bg-transparent border-none focus:ring-0 outline-none resize-none text-gray-700" />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded-full transition-all shadow-md">Send Message</Button>
          </form>
          {submitted && (
            <div className="flex flex-col items-center gap-2 mt-6 animate-fade-in">
              <CheckCircle className="w-8 h-8 text-green-500 animate-pulse" />
              <span className="text-green-700 font-semibold">Thank you! Your message has been sent.</span>
            </div>
          )}
          <div className="mt-8 border-t pt-6 flex flex-col items-center gap-2">
            <span className="text-gray-500 font-medium">Or reach us at:</span>
            <div className="flex gap-6 mt-2">
              <a href="mailto:contact@autoeda.com" className="flex items-center gap-1 text-blue-600 hover:underline"><Mail className="w-5 h-5" /> contact@autoeda.com</a>
              <a href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-800 hover:text-blue-700"><Github className="w-5 h-5" /> GitHub</a>
              <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline"><Linkedin className="w-5 h-5" /> LinkedIn</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
