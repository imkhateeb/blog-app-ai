"use client";
import { motion } from "framer-motion";
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[91.5vh] bg-black text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold tracking-wide text-center"
      >
        Welcome to the Blog
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-lg text-gray-400 text-center mt-4"
      >
        Read. Write. Explore.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="mt-8"
      >
        <a
          href="/blogs"
          className="px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-300 transition"
        >
          Explore Blogs
        </a>
      </motion.div>

      <motion.div
        className="absolute bottom-10 w-full flex justify-center opacity-50"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        <span className="text-gray-500 text-sm">
          Scroll down to discover more
        </span>
      </motion.div>
    </div>
  );
};

export default HomePage;
