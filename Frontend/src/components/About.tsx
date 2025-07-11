

import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="mt-20 relative mx-auto max-w-6xl p-8 animate-fade-in">
      {/* Background motion gradient effect */}
      <div className="absolute inset-0 animate-[gradientMove_15s_linear_infinite] bg-[length:400%_400%] bg-[radial-gradient(circle_at_30%_30%,#0f172a,#1e293b,#020617)] blur-3xl z-0" />

      {/* Main content container with glass effect */}
      <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,123,255,0.15)] overflow-hidden z-10">
        {/* Animated neon lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[glow_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[glow_4s_ease-in-out_infinite_1s]" />
        </div>

        {/* Title section with glow */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 [text-shadow:_0_0_30px_rgba(173,216,230,0.4)] mb-4">
            Why Choose PrazeAI?
          </h2>
          <p className="text-lg text-gray-300/80 max-w-3xl mx-auto leading-relaxed">
            PrazeAI is your intelligent chat companion, combining praise-worthy insights with blazing-fast responses.
            Built for smart conversations, it’s always ready to assist, explain, and elevate your thinking.
          </p>
        </div>

        {/* Features with hover glow and pinkish-golden effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[ 
            {
              title: 'Conversational Intelligence',
              description: 'PrazeAI understands context and intent to deliver helpful, natural conversations across topics.'
            },
            {
              title: 'Praze Thinking',
              description: 'With a unique "think" mode, it reveals how responses are crafted — a transparent step-by-step thought process.'
            },
            {
              title: 'Always On',
              description: 'Need help late at night? No problem. PrazeAI is available 24/7 to answer, explain, or brainstorm with you.'
            },
            {
              title: 'Built to Blaze',
              description: 'Designed for speed and brilliance, PrazeAI delivers responses in a flash without sacrificing depth or detail.'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className={`group relative animate-slide-up delay-[${i * 100}ms]`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-400/20 rounded-xl blur transition-all duration-500 group-hover:from-pink-500/30 group-hover:to-yellow-300/30 group-hover:blur-xl opacity-0 group-hover:opacity-100 motion-safe:animate-none" />
              <div className="relative p-6 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:bg-pink-900/10 rounded-xl">
                <h3 className="text-2xl font-semibold text-blue-400 group-hover:text-yellow-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300/70 group-hover:text-pink-100">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            to="/chat"
            className="inline-block bg-gradient-to-r from-blue-500 to-sky-400 hover:from-pink-500 hover:to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            Start Chatting with PrazeAI
          </Link>
        </div>
      </div>
    </div>
  );
};