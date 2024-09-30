import React from "react";
import "../App.css";
import { motion } from 'framer-motion';




const NewsItem = ({ news }) => {


  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.4
      }
    }
  };
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  


  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = news;

  const publishedDate = new Date(publishedAt).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (

    
    <a  href={url} target="_blank" rel="noopener noreferrer">
  
      <motion.div
        className="news-item-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        <motion.div className="image-container" variants={item}>
          <img className="thumbnail" src={urlToImage} alt={"thumbnail"}></img>
          <h2>{title}</h2>
          {author && <p>Author :- {author}</p>}
          <span className="published">{publishedDate}</span>
        </motion.div>

        {/* Description and source */}
        <motion.div className="detail-container" variants={item}>
          <p className="desc">{description}</p>
          <p className="source">Source of - {source.name}</p>
        </motion.div>
      </motion.div>
    </a>
  );
};

export default NewsItem;
