

import { motion } from "framer-motion"
import { About } from "../About";
import Contact from "../Contact";
import Footer from "../Footer";

export default function HeroGeometric({
  badge = "PrazeAI",
  title1 = "",
  title2 = "Your Smart Partner in Every Click",
  description = "Experience a smarter way to study—PrazeAI helps you stay organized, learn efficiently, and succeed faster with AI at your side.",
  logo = "/image.png"
}: {
  badge?: string
  title1?: string
  title2?: string
  description?: string
  logo?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="bg-black">
      <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#030303]">
        {/* Water/rain background effect */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_#1e1e2f,_#0e0e1c)] animate-[pulse_12s_infinite] opacity-40" />
          <div className="absolute inset-0 bg-[url('/rain.gif')] bg-cover bg-center opacity-10 mix-blend-screen" />
        </div>

        {/* Logo top left with elegant touch */}
        <div className="absolute top-8 left-8 z-20 flex items-center space-x-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-md backdrop-blur-md hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="PrazeAI Logo" className="w-14 h-14 rounded-full shadow-md" />
          <span className="text-white/80 font-semibold text-xl tracking-wide hover:text-pink-300 transition-colors duration-300">{badge}</span>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 hover:from-pink-200 hover:to-white transition-colors duration-300">
                  {title1}
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-pink-400 hover:from-yellow-300 hover:to-pink-400 transition duration-500">
                  {title2}
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-base sm:text-lg md:text-xl text-white/60 hover:text-white transition-colors duration-300 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                {description}
              </p>
            </motion.div>

            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              <a
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white hover:bg-pink-500/20 hover:text-pink-300 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </div>
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
