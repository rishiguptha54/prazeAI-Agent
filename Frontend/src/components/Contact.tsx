

import React from 'react';
import { Mail, MessageSquare, Phone, ArrowRight } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="relative mx-auto max-w-7xl p-8 bg-[#030303]">
      {/* Perplexity-style animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0f172a] via-[#1e293b] to-[#020617] bg-[length:300%_300%] animate-[gradientMove_20s_linear_infinite] opacity-60" />
        <div className="absolute h-[200px] w-[200px] rounded-full bg-purple-500/30 blur-3xl top-1/2 left-0 -translate-x-1/2" />
        <div className="absolute h-[200px] w-[200px] rounded-full bg-blue-500/20 blur-3xl bottom-0 right-0" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left section */}
        <div>
          <h2 className="text-5xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400">Let's Connect</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Got ideas, doubts, or just curious about how PrazeAI works? Reach out — we love hearing from curious minds.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <a href="mailto:hello@prazeai.com" className="flex items-center space-x-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/10 transition-colors group">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-pink-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-medium">Email Us</h3>
                <p className="text-gray-400">hello@prazeai.com</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 ml-auto" />
            </a>

            {/* Chat */}
            <a href="/chat" className="flex items-center space-x-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/10 transition-colors group">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-pink-500/20">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-medium">Live Chat</h3>
                <p className="text-gray-400">Ask anything to our AI assistant</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 ml-auto" />
            </a>

            {/* Call */}
            <a href="tel:+1234567890" className="flex items-center space-x-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/10 transition-colors group">
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-medium">Call Us</h3>
                <p className="text-gray-400">+1 (234) 567-890</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 ml-auto" />
            </a>
          </div>
        </div>

        {/* Right side form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl transform -rotate-6" />
          <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form className="space-y-6">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Your Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-pink-500 hover:to-yellow-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300 focus:outline-none relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform rounded-lg" />
                <span className="relative">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
