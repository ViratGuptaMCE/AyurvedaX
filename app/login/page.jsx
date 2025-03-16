'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const router = useRouter();
  const storeUserEmail = (email) => {
    try {
      localStorage.setItem("userEmail", email);
      return true;
    } catch (error) {
      console.error("Error storing email in localStorage:", error);
      return false;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.95 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      storeUserEmail(email);
      console.log("Form submitted:", { email, password });
      // Reset form after submission
      if (!isLoginMode) {
        setEmail("");
        setPassword("");
      }
      router.push('/');
    }, 1500);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="absolute w-full h-full overflow-hidden z-0">
        {/* Background animated shapes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="inline-block mb-2"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-4xl">✨</div>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isLoginMode ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isLoginMode
              ? "Enter your credentials to access your account"
              : "Fill in the form below to create your account"}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 pl-10 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                placeholder="john@example.com"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 pl-10 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                placeholder="•••••••••"
                required
              />
            </div>
          </motion.div>

          {isLoginMode && (
            <motion.div variants={itemVariants} className="flex justify-end">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-200"
              >
                Forgot password?
              </button>
            </motion.div>
          )}

          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-md focus:outline-none transition duration-300 relative overflow-hidden"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <span>{isLoginMode ? "Sign In" : "Create Account"}</span>
            )}
          </motion.button>
        </motion.form>

        <motion.div className="mt-8 text-center" variants={itemVariants}>
          <p className="text-gray-600">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
            <motion.button
              type="button"
              className="ml-1 text-indigo-600 font-medium hover:text-indigo-800 focus:outline-none"
              onClick={toggleMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoginMode ? "Sign up" : "Sign in"}
            </motion.button>
          </p>
        </motion.div>

        {isLoginMode && (
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-center text-gray-500 mb-4">
              Or continue with
            </p>
            <div className="flex justify-center space-x-4">
              {["#4267B2", "#1DA1F2", "#DB4437"].map((color, index) => (
                <motion.button
                  key={index}
                  className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none transition duration-200"
                  whileHover={{
                    y: -2,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{
                    y: 0,
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="w-6 h-6"
                    style={{ backgroundColor: color, borderRadius: "50%" }}
                  ></div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;