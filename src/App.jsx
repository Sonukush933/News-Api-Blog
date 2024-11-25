import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import NewsList from "./components/NewsList";
import { motion } from 'framer-motion';

const API_URL = `https://newsapi.org/v2/top-headlines`;

function App() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false); // For showing loader on next pages

  useEffect(() => {
    fetchInitialArticles(); // Fetch initial articles
  }, []);

  // Fetch first 20 articles without delay
  const fetchInitialArticles = async () => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // Get the API key
    console.log(apiKey);

    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: apiKey,
          country: "us",
          page: 1,
          pageSize: 20
        },
      });

      setArticles(response.data.articles);
      setTotal(response.data.totalResults);
      console.log("API Key: ", apiKey); // For debugging
      console.log("Fetched initial articles: ", response.data.articles);
    } catch (error) {
      console.error("Error fetching initial articles", error);
    }
  };

  // Fetch articles with a 2-second delay for subsequent pages
  const fetchMoreArticles = async () => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // Use the same API key

    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }

    setLoading(true); // Show loader while fetching

    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: apiKey,
          country: "us",
          page: page + 1,
          pageSize: 20
        },
      });

      // Add 2-second delay before updating articles
      setTimeout(() => {
        setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
        setPage(page + 1); // Increment page number after successful fetch
        setLoading(false); // Stop loading after fetching
        console.log("Fetched more articles: ", response.data.articles);
      }, 2000); // 2-second delay
    } catch (error) {
      console.error("Error fetching more articles", error);
      setLoading(false); // Stop loading even if error occurs
    }
  };

  const headingAnimation = {
    hidden: { opacity: 0, y: -50 }, // Starts from opacity 0 and 50px above
    visible: {
      opacity: 1,
      y: 0, // Moves to its original position
      transition: { duration: 0.5, ease: 'easeOut' } // Duration and easing function
    }
  };

  return (
    <div className="App">
      <motion.h1
        className="main-head"
        initial="hidden"
        animate="visible"
        variants={headingAnimation}
      >
        News App
      </motion.h1>
      <NewsList
        news={articles}
        fetchFunction={fetchMoreArticles} // For infinite scroll, use delayed fetch
        totalResults={total}
        loading={loading} // Pass loading state
      />
    </div>
  );
}

export default App;
